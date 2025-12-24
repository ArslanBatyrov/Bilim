import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bilim Core - Обучение офлайн',
  description: 'Платформа для обучения с поддержкой офлайн-режима',
  manifest: '/manifest.json',
  themeColor: '#355E3B',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

