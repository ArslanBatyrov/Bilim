'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTopicById, getSubjectById, getLessonsByTopic } from '@/lib/db'
import type { Subject, Topic, Lesson } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TopicClient({ topicId }: { topicId: string }) {
  const { t } = useLanguage()
  const [topic, setTopic] = useState<Topic | null>(null)
  const [subject, setSubject] = useState<Subject | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])

  useEffect(() => {
    async function loadData() {
      const top = await getTopicById(topicId)
      if (top) {
        setTopic(top)
        const subj = await getSubjectById(top.subjectId)
        setSubject(subj || null)
        const less = await getLessonsByTopic(topicId)
        setLessons(less)
      }
    }
    loadData()
  }, [topicId])

  if (!topic) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-apple-gray-600">{t.topic.notFound}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          href={subject ? `/subject/${subject.id}` : '/subjects'}
          className="text-sm text-apple-blue hover:opacity-80 mb-6 inline-block font-medium"
        >
          {t.topic.back}
        </Link>
        <h1 className="text-5xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
          {topic.title}
        </h1>
        {topic.description && (
          <p className="text-lg text-apple-gray-600 mb-8">
            {topic.description}
          </p>
        )}

        <div className="space-y-3">
          {lessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lesson/${lesson.id}`}
              className="block p-5 bg-apple-gray-50 rounded-xl border border-apple-gray-100 hover:bg-apple-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-apple-gray-900 text-base">
                {lesson.title}
              </h3>
            </Link>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="bg-apple-gray-50 rounded-2xl p-12 text-center border border-apple-gray-100">
            <p className="text-apple-gray-600">{t.topic.noTopics}</p>
          </div>
        )}
      </div>
    </div>
  )
}
