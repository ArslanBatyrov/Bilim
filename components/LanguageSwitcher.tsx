'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { Language } from '@/lib/translations'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'Eng' },
    { code: 'ru', label: 'Русс' },
    { code: 'tk', label: 'Turkmen' },
  ]

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
    // No reload needed - React will update immediately
  }

  const currentLabel = languages.find(l => l.code === language)?.label || 'Turkmen'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium px-3 py-1.5 rounded-lg hover:bg-apple-gray-50"
      >
        {currentLabel}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 bg-white rounded-xl border border-apple-gray-200 shadow-lg z-20 min-w-[120px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  language === lang.code
                    ? 'bg-apple-blue/10 text-apple-blue font-medium'
                    : 'text-apple-gray-900 hover:bg-apple-gray-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

