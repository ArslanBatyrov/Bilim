import { db } from './db'
import type { ProgressState } from './types'

export async function getStreak(userId: string): Promise<number> {
  const states = await db.progressState
    .where('userId')
    .equals(userId)
    .filter(s => s.completed)
    .toArray()

  if (states.length === 0) return 0

  // Simple streak: count consecutive days with completions
  const dates = states
    .map(s => new Date(s.updatedAt).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort()
    .reverse()

  let streak = 0
  const today = new Date().toDateString()
  let checkDate = new Date()

  for (const dateStr of dates) {
    const date = new Date(dateStr)
    const diffDays = Math.floor((checkDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === streak) {
      streak++
      checkDate = new Date(date)
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export async function getDailyGoal(userId: string): Promise<{ completed: number; target: number }> {
  const target = 3 // Default daily goal
  const today = new Date().toDateString()

  const states = await db.progressState
    .where('userId')
    .equals(userId)
    .filter(s => {
      const stateDate = new Date(s.updatedAt).toDateString()
      return s.completed && stateDate === today
    })
    .toArray()

  return {
    completed: states.length,
    target,
  }
}

