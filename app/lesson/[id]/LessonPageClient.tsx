'use client'

import { useEffect, useState } from 'react'
import LessonClient from './LessonClient'
import { getLessonById, getTopicById } from '@/lib/db'
import type { Lesson, Topic } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LessonPageClient({ lessonId }: { lessonId: string }) {
  const { t } = useLanguage()
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)

  useEffect(() => {
    async function loadData() {
      const less = await getLessonById(lessonId)
      if (less) {
        setLesson(less)
        const top = await getTopicById(less.topicId)
        setTopic(top || null)
      }
    }
    loadData()
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-apple-gray-600">{t.lesson.notFound}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <LessonClient lesson={lesson} topic={topic} />
      </div>
    </div>
  )
}

