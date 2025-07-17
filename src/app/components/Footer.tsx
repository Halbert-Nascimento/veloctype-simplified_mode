'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#e0e7ef] text-cyan-700 text-sm py-8 mt-auto border-t border-[#cbd5e1] dark:bg-[#162032] dark:text-cyan-100 dark:border-[#1e293b]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <span>© 2025 VelocType. Todos os direitos reservados.</span>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link href="/termos" className="hover:underline transition-colors hover:text-cyan-500">
            Termos
          </Link>
          <Link href="/privacidade" className="hover:underline transition-colors hover:text-cyan-500">
            Privacidade
          </Link>
          <Link href="/contato" className="hover:underline transition-colors hover:text-cyan-500">
            Contato
          </Link>
        </div>
      </div>
    </footer>
  )
}
