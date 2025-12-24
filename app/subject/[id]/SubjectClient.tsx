'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTopicsBySubject, getSubjectById } from '@/lib/db'
import type { Subject, Topic } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SubjectClient({ subjectId }: { subjectId: string }) {
  const { t } = useLanguage()
  const [subject, setSubject] = useState<Subject | null>(null)
  const [topics, setTopics] = useState<Topic[]>([])

  useEffect(() => {
    async function loadData() {
      const subj = await getSubjectById(subjectId)
      setSubject(subj || null)
      const tops = await getTopicsBySubject(subjectId)
      setTopics(tops)
    }
    loadData()
  }, [subjectId])

  if (!subject) {
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
          href="/subjects"
          className="text-sm text-apple-blue hover:opacity-80 mb-6 inline-block font-medium"
        >
          {t.topic.back}
        </Link>
        <h1 className="text-5xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
          {subject.title}
        </h1>
        {subject.description && (
          <p className="text-lg text-apple-gray-600 mb-12">
            {subject.description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100 hover:bg-apple-gray-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-apple-gray-900 mb-2 tracking-tight">
                {topic.title}
              </h2>
              {topic.description && (
                <p className="text-sm text-apple-gray-600 leading-relaxed">
                  {topic.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="bg-apple-gray-50 rounded-2xl p-12 text-center border border-apple-gray-100">
            <p className="text-apple-gray-600">{t.topic.noTopics}</p>
          </div>
        )}
      </div>
    </div>
  )
}

