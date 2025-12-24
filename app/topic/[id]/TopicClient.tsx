'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTopicsBySubject, getSubjectById, getLessonsByTopic } from '@/lib/db'
import type { Subject, Topic, Lesson } from '@/lib/types'

export default function TopicClient({ subjectId }: { subjectId: string }) {
  const [subject, setSubject] = useState<Subject | null>(null)
  const [topics, setTopics] = useState<(Topic & { lessons: Lesson[] })[]>([])

  useEffect(() => {
    async function loadData() {
      const subj = await getSubjectById(subjectId)
      setSubject(subj || null)
      const tops = await getTopicsBySubject(subjectId)
      const topicsWithLessons = await Promise.all(
        tops.map(async (topic) => {
          const lessons = await getLessonsByTopic(topic.id)
          return { ...topic, lessons }
        })
      )
      setTopics(topicsWithLessons)
    }
    loadData()
  }, [subjectId])

  if (!subject) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-apple-gray-600">Subject not found</p>
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
          ← Back to Subjects
        </Link>
        <h1 className="text-5xl font-semibold text-apple-gray-900 mb-12 tracking-tight">
          {subject.title}
        </h1>

        <div className="space-y-6">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
              <h2 className="text-2xl font-semibold text-apple-gray-900 mb-2 tracking-tight">
                {topic.title}
              </h2>
              {topic.description && (
                <p className="text-sm text-apple-gray-600 mb-6 leading-relaxed">
                  {topic.description}
                </p>
              )}
              <div className="space-y-2">
                {topic.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/lesson/${lesson.id}`}
                    className="block p-4 bg-white rounded-xl border border-apple-gray-100 hover:bg-apple-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-apple-gray-900 text-sm">
                      {lesson.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="bg-apple-gray-50 rounded-2xl p-12 text-center border border-apple-gray-100">
            <p className="text-apple-gray-600">No topics available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

