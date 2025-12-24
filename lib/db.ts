import Dexie, { Table } from 'dexie'
import { v4 as uuidv4 } from 'uuid'
import type {
  Subject,
  Topic,
  Lesson,
  Quiz,
  ProgressEvent,
  ProgressState,
} from './types'

class BilimDatabase extends Dexie {
  subjects!: Table<Subject, string>
  topics!: Table<Topic, string>
  lessons!: Table<Lesson, string>
  quizzes!: Table<Quiz, string>
  pendingEvents!: Table<ProgressEvent, string>
  progressState!: Table<ProgressState, string>

  constructor() {
    super('BilimDB')
    this.version(1).stores({
      subjects: 'id, title, createdAt',
      topics: 'id, subjectId, order, createdAt',
      lessons: 'id, topicId, order, createdAt',
      quizzes: 'id, createdAt',
      pendingEvents: 'id, userId, timestamp, synced',
      progressState: '[userId+lessonId], userId, lessonId, updatedAt',
    })
  }
}

export const db = new BilimDatabase()

// Local user ID management
const USER_ID_KEY = 'bilim_user_id'

export async function getLocalUserId(): Promise<string> {
  if (typeof window === 'undefined') {
    return 'anonymous'
  }
  let userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    userId = uuidv4()
    localStorage.setItem(USER_ID_KEY, userId)
  }
  return userId
}

// Subjects
export async function getAllSubjects(): Promise<Subject[]> {
  return db.subjects.orderBy('createdAt').toArray()
}

export async function getSubjectById(id: string): Promise<Subject | undefined> {
  return db.subjects.get(id)
}

export async function addSubject(subject: Omit<Subject, 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date().toISOString()
  await db.subjects.add({
    ...subject,
    createdAt: now,
    updatedAt: now,
  })
  return subject.id
}

// Topics
export async function getTopicsBySubject(subjectId: string): Promise<Topic[]> {
  return db.topics.where('subjectId').equals(subjectId).sortBy('order')
}

export async function getTopicById(id: string): Promise<Topic | undefined> {
  return db.topics.get(id)
}

export async function addTopic(topic: Omit<Topic, 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date().toISOString()
  await db.topics.add({
    ...topic,
    createdAt: now,
    updatedAt: now,
  })
  return topic.id
}

// Lessons
export async function getLessonById(id: string): Promise<Lesson | undefined> {
  return db.lessons.get(id)
}

export async function getLessonsByTopic(topicId: string): Promise<Lesson[]> {
  return db.lessons.where('topicId').equals(topicId).sortBy('order')
}

export async function addLesson(lesson: Omit<Lesson, 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date().toISOString()
  await db.lessons.add({
    ...lesson,
    createdAt: now,
    updatedAt: now,
  })
  return lesson.id
}

// Quizzes
export async function getQuizById(id: string): Promise<Quiz | undefined> {
  return db.quizzes.get(id)
}

export async function addQuiz(quiz: Omit<Quiz, 'createdAt' | 'updatedAt'>): Promise<string> {
  const now = new Date().toISOString()
  await db.quizzes.add({
    ...quiz,
    createdAt: now,
    updatedAt: now,
  })
  return quiz.id
}

// Progress Events
export async function recordEvent(event: Omit<ProgressEvent, 'id' | 'synced'>): Promise<string> {
  const id = uuidv4()
  await db.pendingEvents.add({
    ...event,
    id,
    synced: false,
  })

  // Update progress state for lesson events
  if (event.lessonId) {
    await updateProgressState(event.userId, event.lessonId, event.type)
  }

  // Trigger sync in background
  if (typeof window !== 'undefined') {
    syncEvents().catch(console.error)
  }

  return id
}

async function updateProgressState(
  userId: string,
  lessonId: string,
  eventType: ProgressEvent['type']
): Promise<void> {
  const existing = await db.progressState.get([userId, lessonId])
  const now = new Date().toISOString()

  if (eventType === 'lesson_completed') {
    await db.progressState.put({
      userId,
      lessonId,
      progress: 100,
      completed: true,
      lastAccessed: now,
      updatedAt: now,
    })
  } else if (eventType === 'lesson_started') {
    if (!existing) {
      await db.progressState.add({
        userId,
        lessonId,
        progress: 0,
        completed: false,
        lastAccessed: now,
        updatedAt: now,
      })
    } else {
      await db.progressState.update([userId, lessonId], {
        lastAccessed: now,
        updatedAt: now,
      })
    }
  }
}

export async function getLessonProgress(userId: string, lessonId: string): Promise<number> {
  const state = await db.progressState.get([userId, lessonId])
  return state?.progress || 0
}

export async function getProgressStats(userId: string) {
  const states = await db.progressState.where('userId').equals(userId).toArray()
  const completed = states.filter(s => s.completed)
  const lastLesson = completed.length > 0
    ? await db.lessons.get(completed[completed.length - 1].lessonId)
    : null

  const lastTopic = lastLesson
    ? await db.topics.get(lastLesson.topicId)
    : null

  return {
    lessonsCompleted: completed.length,
    lastLesson: lastLesson ? {
      id: lastLesson.id,
      title: lastLesson.title,
      topicName: lastTopic?.title || 'Unknown',
    } : null,
  }
}

export async function getPendingEvents(): Promise<ProgressEvent[]> {
  return db.pendingEvents.where('synced').equals(false).toArray()
}

export async function markEventsAsSynced(ids: string[]): Promise<void> {
  await db.pendingEvents.bulkUpdate(
    ids.map(id => ({ key: id, changes: { synced: true } }))
  )
}

// Sync with Supabase
export async function syncEvents(): Promise<void> {
  if (typeof window === 'undefined') return

  const { syncToSupabase } = await import('./supabase')
  const pending = await getPendingEvents()
  
  if (pending.length === 0) return

  try {
    await syncToSupabase(pending)
    await markEventsAsSynced(pending.map(e => e.id!))
  } catch (error) {
    console.error('Sync failed:', error)
    // Events remain unsynced and will be retried later
  }
}

