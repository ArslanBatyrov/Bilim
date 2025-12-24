'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { completeOnboarding } from '@/lib/onboarding'

export default function OnboardingClient() {
  const { t } = useLanguage()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: t.onboarding.step1.title,
      description: t.onboarding.step1.description,
      icon: '📚',
    },
    {
      title: t.onboarding.step2.title,
      description: t.onboarding.step2.description,
      icon: '📖',
    },
    {
      title: t.onboarding.step3.title,
      description: t.onboarding.step3.description,
      icon: '📱',
    },
    {
      title: t.onboarding.step4.title,
      description: t.onboarding.step4.description,
      icon: '📊',
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    completeOnboarding()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep
                  ? 'bg-apple-blue w-8'
                  : index < currentStep
                  ? 'bg-apple-blue/50 w-8'
                  : 'bg-apple-gray-200 w-1.5'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-8">{steps[currentStep].icon}</div>
          <h1 className="text-5xl font-semibold text-apple-gray-900 mb-6 tracking-tight">
            {steps[currentStep].title}
          </h1>
          <p className="text-lg text-apple-gray-600 leading-relaxed max-w-md mx-auto">
            {steps[currentStep].description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-sm text-apple-gray-600 hover:text-apple-gray-900 font-medium px-4 py-2 transition-colors"
          >
            {t.onboarding.skip}
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
          >
            {currentStep === steps.length - 1
              ? t.onboarding.getStarted
              : t.onboarding.next}
          </button>
        </div>
      </div>
    </div>
  )
}

