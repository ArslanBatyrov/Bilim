'use client'

import { useState } from 'react'
import type { Quiz, QuizQuestion } from '@/lib/types'

interface QuizComponentProps {
  quiz: Quiz
  onComplete: (score: number) => void
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const question = quiz.questions[currentQuestion]

  const handleAnswer = (value: string | number) => {
    setAnswers({
      ...answers,
      [question.id]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore()
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach(q => {
      const answer = answers[q.id]
      if (answer !== undefined) {
        if (q.type === 'numeric') {
          if (Number(answer) === Number(q.correctAnswer)) {
            correct++
          }
        } else {
          if (String(answer) === String(q.correctAnswer)) {
            correct++
          }
        }
      }
    })
    const calculatedScore = Math.round((correct / quiz.questions.length) * 100)
    setScore(calculatedScore)
    onComplete(calculatedScore)
  }

  if (showResults) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
          Quiz Results
        </h2>
        <div className="mb-8">
          <p className="text-4xl font-semibold text-apple-gray-900 mb-2">
            {score}%
          </p>
          <p className="text-sm text-apple-gray-600">
            You got {score >= 70 ? 'great' : score >= 50 ? 'good' : 'needs improvement'} results!
          </p>
        </div>
        <div className="space-y-3">
          {quiz.questions.map((q, idx) => {
            const answer = answers[q.id]
            const isCorrect = q.type === 'numeric'
              ? Number(answer) === Number(q.correctAnswer)
              : String(answer) === String(q.correctAnswer)

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border ${
                  isCorrect 
                    ? 'bg-green-50/50 border-green-200' 
                    : 'bg-red-50/50 border-red-200'
                }`}
              >
                <p className="font-semibold text-apple-gray-900 mb-2 text-sm">
                  Question {idx + 1}: {q.question}
                </p>
                <p className="text-xs text-apple-gray-600 mb-1">
                  Your answer: {answer !== undefined ? String(answer) : 'Not answered'}
                </p>
                <p className="text-xs text-apple-gray-600 mb-1">
                  Correct answer: {String(q.correctAnswer)}
                </p>
                {q.explanation && (
                  <p className="text-xs text-apple-gray-700 mt-2 italic">
                    {q.explanation}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-apple-gray-900 mb-2 tracking-tight">
        {quiz.title}
      </h2>
      <div className="mb-6">
        <p className="text-xs text-apple-gray-600 mb-6">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
        <p className="text-base font-medium text-apple-gray-900 mb-6 leading-relaxed">
          {question.question}
        </p>

        {question.type === 'mcq' && question.options ? (
          <div className="space-y-2">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${
                  answers[question.id] === option
                    ? 'border-apple-blue bg-apple-blue/10'
                    : 'border-apple-gray-200 hover:border-apple-gray-300 bg-white'
                }`}
              >
                <span className="text-sm text-apple-gray-900">{option}</span>
              </button>
            ))}
          </div>
        ) : (
          <input
            type="number"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-apple-blue outline-none text-sm"
            placeholder="Enter your answer"
          />
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={answers[question.id] === undefined}
        className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {currentQuestion < quiz.questions.length - 1 ? 'Next' : 'Submit Quiz'}
      </button>
    </div>
  )
}

