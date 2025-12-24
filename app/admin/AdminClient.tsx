'use client'

import { useState } from 'react'
import Link from 'next/link'
import { seedDemoContent } from '@/lib/seed'

export default function AdminClient() {
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
        setMessage('Неверный пароль')
      }
    } catch (error) {
      setMessage('Ошибка аутентификации')
    }
  }

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    try {
      await seedDemoContent()
      setMessage('Демо-контент успешно добавлен!')
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
          ← Назад на главную
        </Link>
        <div className="bg-apple-gray-50 rounded-2xl p-8 border border-apple-gray-100">
          <h1 className="text-3xl font-semibold text-apple-gray-900 mb-8 tracking-tight">Админ</h1>
          <div className="mb-6">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 bg-white border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-apple-blue focus:border-apple-blue outline-none text-sm"
              placeholder="Введите пароль администратора"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm"
          >
            Войти
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
        ← Назад на главную
      </Link>
      <div className="bg-apple-gray-50 rounded-2xl p-8 border border-apple-gray-100">
        <h1 className="text-3xl font-semibold text-apple-gray-900 mb-8 tracking-tight">Панель администратора</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-apple-gray-900 mb-4 tracking-tight">
              Управление контентом
            </h2>
            <button
              onClick={handleSeed}
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3 bg-apple-blue text-white rounded-xl hover:opacity-90 transition-opacity font-medium text-sm disabled:opacity-50"
            >
              {loading ? 'Добавление...' : 'Добавить демо-контент'}
            </button>
          </div>
          {message && (
            <p className={`text-sm ${message.includes('Ошибка') || message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <div className="pt-6 border-t border-apple-gray-200">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border border-apple-gray-200 text-apple-gray-900 rounded-xl hover:bg-apple-gray-50 transition-colors font-medium text-sm"
            >
              Перейти на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

