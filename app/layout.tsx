import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { HtmlLang } from '@/components/HtmlLang'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bilim Core - Onlaýn öwreniş',
  description: 'Offline režimi bilen öwreniş platformasy',
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
    <html lang="tk">
      <head>
        <link rel="icon" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body>
        <LanguageProvider>
          <HtmlLang />
          <Navigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

