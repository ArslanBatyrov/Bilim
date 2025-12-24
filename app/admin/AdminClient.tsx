'use client'

import { useState } from 'react'
import Link from 'next/link'
import { seedDemoContent } from '@/lib/seed'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AdminClient() {
  const { t } = useLanguage()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await response.json()
      if (data.authenticated) {
        setAuthenticated(true)
        setMessage('')
      } else {
        setMessage(t.admin.incorrectPassword)
      }
    } catch (error) {
      setMessage(t.admin.authError)
    }
  }

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    try {
      await seedDemoContent()
      setMessage(t.admin.success)
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto">
        <Link
          href="/"
          className="text-sm text-apple-blue hover:opacity-80 mb-6 inline-block font-medium"
        >
          {t.admin.back}
        </Link>
        <div className="bg-apple-gray-50 rounded-2xl p-8 border border-apple-gray-100">
          <h1 className="text-3xl font-semibold text-apple-gray-900 mb-8 tracking-tight">{t.admin.title}</h1>
          <div className="mb-6">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              {t.admin.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-apple-blue outline-none text-sm"
              placeholder={t.admin.enterPassword}
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
          >
            {t.admin.login}
          </button>
          {message && (
            <p className="mt-4 text-red-500 text-sm">{message}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/"
        className="text-sm text-apple-blue hover:opacity-80 mb-6 inline-block font-medium"
      >
        {t.admin.back}
      </Link>
      <div className="bg-apple-gray-50 rounded-2xl p-8 border border-apple-gray-100">
        <h1 className="text-3xl font-semibold text-apple-gray-900 mb-8 tracking-tight">{t.admin.panel}</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
              {t.admin.contentManagement}
            </h2>
            <button
              onClick={handleSeed}
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm disabled:opacity-50"
            >
              {loading ? t.admin.seeding : t.admin.seedContent}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${message.includes(t.admin.incorrectPassword) || message.includes(t.admin.authError) || message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <div className="pt-6 border-t border-apple-gray-200">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-apple-gray-200 text-apple-gray-900 rounded-xl hover:bg-apple-gray-50 transition-colors font-medium text-sm"
            >
              {t.admin.goHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

