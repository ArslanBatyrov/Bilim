export interface Subject {
  id: string
  title: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Topic {
  id: string
  subjectId: string
  title: string
  description?: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface Lesson {
  id: string
  topicId: string
  title: string
  content: string // markdown
  order: number
  quizId?: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
  createdAt: string
  updatedAt: string
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'numeric'
  question: string
  options?: string[] // for MCQ
  correctAnswer: string | number
  explanation?: string
}

export interface ProgressEvent {
  id?: string
  userId: string
  type: 'lesson_started' | 'lesson_completed' | 'quiz_completed' | 'quiz_attempted'
  lessonId?: string
  quizId?: string
  score?: number
  timestamp: string
  synced?: boolean
}

export interface ProgressState {
  userId: string
  lessonId: string
  progress: number // 0-100
  completed: boolean
  lastAccessed: string
  updatedAt: string
}

