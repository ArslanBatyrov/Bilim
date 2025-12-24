'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllSubjects } from '@/lib/db'
import type { Subject } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SubjectsClient() {
  const { t } = useLanguage()
  const [subjects, setSubjects] = useState<Subject[]>([])

  useEffect(() => {
    async function loadSubjects() {
      const data = await getAllSubjects()
      setSubjects(data)
    }
    loadSubjects()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-semibold text-apple-gray-900 mb-12 tracking-tight">
          {t.subjects.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subject/${subject.id}`}
              className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100 hover:bg-apple-gray-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-apple-gray-900 mb-2 tracking-tight">
                {subject.title}
              </h2>
              {subject.description && (
                <p className="text-sm text-apple-gray-600 leading-relaxed">
                  {subject.description}
                </p>
              )}
            </Link>
          ))}
        </div>

        {subjects.length === 0 && (
          <div className="bg-apple-gray-50 rounded-2xl p-12 text-center border border-apple-gray-100">
            <p className="text-apple-gray-600">{t.subjects.noSubjects}</p>
          </div>
        )}
      </div>
    </div>
  )
}

