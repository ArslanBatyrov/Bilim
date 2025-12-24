'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navigation() {
  const { t } = useLanguage()
  const pathname = usePathname()

  // Hide navigation on onboarding page
  if (pathname === '/onboarding') {
    return null
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-apple-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-apple-gray-900 tracking-tight"
          >
            Bilim
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              {t.nav.home}
            </Link>
            <Link
              href="/subjects"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              {t.nav.subjects}
            </Link>
            <Link
              href="/admin"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              {t.nav.admin}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}

