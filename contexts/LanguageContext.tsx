'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLanguage, setLanguage, type Language, getTranslations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: ReturnType<typeof getTranslations>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage immediately to prevent flash
  const [language, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return getLanguage()
    }
    return 'tk'
  })

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    setLangState(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: getTranslations(language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

