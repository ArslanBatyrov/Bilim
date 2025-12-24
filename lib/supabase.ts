import { createClient } from '@supabase/supabase-js'
import type { ProgressEvent } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function syncToSupabase(events: ProgressEvent[]): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }

  // Insert events
  const { error: eventsError } = await supabase
    .from('progress_events')
    .insert(events.map(e => ({
      user_id: e.userId,
      event_type: e.type,
      lesson_id: e.lessonId,
      quiz_id: e.quizId,
      score: e.score,
      timestamp: e.timestamp,
    })))

  if (eventsError) {
    throw new Error(`Failed to sync events: ${eventsError.message}`)
  }

  // Update progress state
  const lessonEvents = events.filter(e => e.lessonId)
  const progressUpdates = new Map<string, { progress: number; completed: boolean }>()

  for (const event of lessonEvents) {
    const key = `${event.userId}-${event.lessonId}`
    const existing = progressUpdates.get(key) || { progress: 0, completed: false }

    if (event.type === 'lesson_completed') {
      existing.progress = 100
      existing.completed = true
    } else if (event.type === 'lesson_started' && existing.progress === 0) {
      existing.progress = 0
    }

    progressUpdates.set(key, existing)
  }

  // Upsert progress states
  for (const [key, state] of progressUpdates.entries()) {
    const [userId, lessonId] = key.split('-')
    const { error } = await supabase
      .from('progress_state')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        progress: state.progress,
        completed: state.completed,
        last_accessed: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,lesson_id',
      })

    if (error) {
      console.error(`Failed to update progress state for ${key}:`, error)
    }
  }
}

