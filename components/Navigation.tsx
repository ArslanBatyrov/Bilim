'use client'

import Link from 'next/link'

export function Navigation() {
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
          <div className="flex gap-8">
            <Link
              href="/"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              Главная
            </Link>
            <Link
              href="/subjects"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              Предметы
            </Link>
            <Link
              href="/admin"
              className="text-sm text-apple-gray-600 hover:text-apple-gray-900 transition-colors font-medium"
            >
              Админ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

