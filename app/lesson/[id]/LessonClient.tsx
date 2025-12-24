'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { recordEvent, getLessonProgress, getLocalUserId } from '@/lib/db'
import { QuizComponent } from '@/components/Quiz'
import type { Lesson, Topic, Quiz } from '@/lib/types'
import { useLanguage } from '@/contexts/LanguageContext'

interface LessonClientProps {
  lesson: Lesson
  topic: Topic | null
}

export default function LessonClient({ lesson, topic }: LessonClientProps) {
  const { t } = useLanguage()
  const [progress, setProgress] = useState<number>(0)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    loadProgress()
    if (lesson.quizId) {
      loadQuiz(lesson.quizId)
    }
  }, [lesson.id, lesson.quizId])

  const loadProgress = async () => {
    const userId = await getLocalUserId()
    const prog = await getLessonProgress(userId, lesson.id)
    setProgress(prog)
  }

  const loadQuiz = async (quizId: string) => {
    const { getQuizById } = await import('@/lib/db')
    const quizData = await getQuizById(quizId)
    setQuiz(quizData)
  }

  const handleComplete = async () => {
    const userId = await getLocalUserId()
    await recordEvent({
      userId,
      type: 'lesson_completed',
      lessonId: lesson.id,
      timestamp: new Date().toISOString(),
    })
    setProgress(100)
    if (quiz) {
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = async (score: number) => {
    const userId = await getLocalUserId()
    await recordEvent({
      userId,
      type: 'quiz_completed',
      lessonId: lesson.id,
      quizId: quiz?.id,
      score,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <>
      <Link
        href={topic ? `/topic/${topic.subjectId}` : '/subjects'}
        className="text-sm text-apple-blue hover:opacity-80 mb-6 inline-block font-medium"
      >
        {t.lesson.back}
      </Link>
      <h1 className="text-5xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
        {lesson.title}
      </h1>
      {topic && (
        <p className="text-sm text-apple-gray-600 mb-8">{t.lesson.topic}: {topic.title}</p>
      )}

      <div className="bg-apple-gray-50 rounded-2xl p-8 mb-6 border border-apple-gray-100">
        <div className="prose prose-sm max-w-none text-apple-gray-900">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lesson.content}
          </ReactMarkdown>
        </div>
      </div>

      {progress < 100 && (
        <button
          onClick={handleComplete}
          className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm mb-6"
        >
          {t.lesson.markComplete}
        </button>
      )}

      {progress === 100 && !showQuiz && quiz && (
        <div className="bg-apple-gray-50 rounded-2xl p-6 mb-6 border border-apple-gray-100">
          <h2 className="text-2xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
            {t.lesson.quiz}
          </h2>
          <button
            onClick={() => setShowQuiz(true)}
            className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
          >
            {t.lesson.startQuiz}
          </button>
        </div>
      )}

      {showQuiz && quiz && (
        <div className="bg-apple-gray-50 rounded-2xl p-6 border border-apple-gray-100">
          <QuizComponent
            quiz={quiz}
            onComplete={handleQuizComplete}
          />
        </div>
      )}
    </>
  )
}

