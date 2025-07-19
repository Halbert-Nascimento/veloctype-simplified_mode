import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'
import ThemeProvider from './components/ThemeProvider'
// import { UserProvider } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DigiteMais - Aprenda a digitar mais rápido',
  description: 'Melhore sua velocidade e precisão na digitação com exercícios práticos e feedback em tempo real.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8858471184069465" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8858471184069465"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {/* <UserProvider> */}
            <Navigation />
            <main className="min-h-screen bg-slate-50 pt-16">
              {children}
            </main>
          {/* </UserProvider> */}
        </ThemeProvider>
      </body>
    </html>
  )
} 