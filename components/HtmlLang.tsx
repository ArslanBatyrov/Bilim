'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export function HtmlLang() {
  const { language } = useLanguage()

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  return null
}

