'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getLocalUserId, getProgressStats } from '@/lib/db'
import { getStreak, getDailyGoal } from '@/lib/progress'
import { useLanguage } from '@/contexts/LanguageContext'
import { hasCompletedOnboarding } from '@/lib/onboarding'

export default function HomeClient() {
  const { t } = useLanguage()
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [stats, setStats] = useState({ lessonsCompleted: 0, lastLesson: null as any })
  const [streak, setStreak] = useState(0)
  const [dailyGoal, setDailyGoal] = useState({ completed: 0, target: 3 })
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check onboarding on mount
    if (typeof window !== 'undefined' && !hasCompletedOnboarding()) {
      router.push('/onboarding')
      return
    }
    setIsChecking(false)
  }, [router])

  useEffect(() => {
    if (isChecking) return
    
    async function loadData() {
      const id = await getLocalUserId()
      setUserId(id)
      const s = await getProgressStats(id)
      setStats(s)
      const st = await getStreak(id)
      setStreak(st)
      const dg = await getDailyGoal(id)
      setDailyGoal(dg)
    }
    loadData()
  }, [isChecking])

  if (isChecking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-apple-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-semibold text-apple-gray-900 mb-12 tracking-tight">
          {t.home.welcome}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
            <p className="text-3xl font-semibold text-apple-gray-900 mb-1">
              {streak}
            </p>
            <p className="text-sm text-apple-gray-600 font-medium">{t.home.dayStreak}</p>
          </div>
          <div className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
            <p className="text-3xl font-semibold text-apple-gray-900 mb-1">
              {dailyGoal.completed}/{dailyGoal.target}
            </p>
            <p className="text-sm text-apple-gray-600 font-medium">{t.home.dailyGoal}</p>
          </div>
          <div className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
            <p className="text-3xl font-semibold text-apple-gray-900 mb-1">
              {stats.lessonsCompleted}
            </p>
            <p className="text-sm text-apple-gray-600 font-medium">{t.home.lessonsCompleted}</p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
            {t.home.continueLearning}
          </h2>
          {stats.lastLesson ? (
            <Link
              href={`/lesson/${stats.lastLesson.id}`}
              className="block bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100 hover:bg-apple-gray-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-1">
                {stats.lastLesson.title}
              </h3>
              <p className="text-sm text-apple-gray-600">
                {stats.lastLesson.topicName}
              </p>
            </Link>
          ) : (
            <div className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
              <p className="text-apple-gray-600">{t.home.noLessonsStarted}</p>
            </div>
          )}
        </div>

        <Link
          href="/subjects"
          className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
        >
          {t.home.browseSubjects}
        </Link>
      </div>
    </div>
  )
}
