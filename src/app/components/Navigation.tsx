'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [rotating, setRotating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleToggle() {
    setRotating(true)
    toggleTheme()
    setTimeout(() => setRotating(false), 400)
  }

  return (
    <header className="fixed w-full bg-[#f8fafc] text-[#1e293b] dark:bg-[#162032] dark:text-white border-b border-[#cbd5e1] dark:border-[#1e293b] z-50">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
            <ComputerDesktopIcon className="w-7 h-7" />
            DigiteMais
          </Link>
        </div>
        {/* Menu central */}
        <div className="hidden md:flex gap-6 mx-auto">
          <Link href="/" className={`text-base font-medium transition-colors ${pathname === '/' ? 'text-cyan-700 dark:text-cyan-300' : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'}`}>Início</Link>
          <Link href="/treino" className={`text-base font-medium transition-colors ${pathname === '/treino' ? 'text-cyan-700 dark:text-cyan-300' : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'}`}>Praticar</Link>
          <Link href="/estatisticas" className={`text-base font-medium transition-colors ${pathname === '/estatisticas' ? 'text-cyan-700 dark:text-cyan-300' : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'}`}>Estatísticas</Link>
          <Link href="/sobre" className={`text-base font-medium transition-colors ${pathname === '/sobre' ? 'text-cyan-700 dark:text-cyan-300' : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'}`}>Sobre</Link>
          {/* <Link href="#ranking" className="text-base font-medium text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">Ranking</Link> */}
          {/* <Link href="#planos" className="text-base font-medium text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">Planos</Link> */}
          
        </div>
        {/* Ações à direita */}
        <div className="flex items-center gap-4">
          {/* Toggle de tema */}
          <button
            onClick={handleToggle}
            aria-label="Alternar tema"
            className={`p-2 rounded-lg border border-[#cbd5e1] dark:border-[#1e293b] bg-transparent hover:bg-[#e0e7ef] dark:hover:bg-[#1e293b] transition-colors focus:outline-none ${rotating ? 'animate-spin-slow' : ''}`}
            style={{ minWidth: 36, minHeight: 36 }}
          >
            {/* Fallback: sempre mostra a lua até o React montar */}
            {!mounted ? (
              <MoonIcon className="w-5 h-5 text-[#1e293b] dark:text-white transition-colors" />
            ) : theme === 'dark' ? (
              <SunIcon className="w-5 h-5 text-white transition-colors" />
            ) : (
              <MoonIcon className="w-5 h-5 text-[#1e293b] transition-colors" />
            )}
          </button>
          {/* <Link href="/login" className="text-[#1e293b] dark:text-white font-medium hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">Entrar</Link>
          <Link href="/cadastrar" className="text-[#1e293b] dark:text-white font-medium hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">Cadastrar</Link> */}
          
        </div>
      </nav>
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 0.4s linear;
        }
      `}</style>
    </header>
  )
} 