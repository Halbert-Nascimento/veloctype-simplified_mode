'use client'

import Link from 'next/link'
import { ClockIcon, ChartBarIcon, TrophyIcon, InformationCircleIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] dark:bg-[#0d1724] dark:text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 w-full pt-10 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#e0e7ef] text-xs px-4 py-1 rounded-full mb-4 text-cyan-700 font-semibold shadow-md dark:bg-[#162032] dark:text-cyan-300">Versão 1.0 Lançada</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Melhore sua velocidade de digitação</h1>
          <p className="text-lg md:text-xl text-cyan-700 dark:text-cyan-100 mb-8">Pratique diariamente e acompanhe seu progresso para se tornar um digitador mais rápido e preciso.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link href="/treino" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow transition">
              <RocketLaunchIcon className="w-5 h-5" />
              Começar a Praticar
            </Link>
            <Link href="#sobre" className="bg-[#e0e7ef] hover:bg-cyan-100 text-cyan-700 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 border border-cyan-700 transition dark:bg-[#162032] dark:hover:bg-[#1e293b] dark:text-cyan-100 dark:border-cyan-700">
              <InformationCircleIcon className="w-5 h-5" />
              Saiba Mais
            </Link>
          </div>
        </div>
        {/* Benefícios */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#e0e7ef] rounded-xl p-6 flex flex-col items-center shadow border border-[#cbd5e1] dark:bg-[#162032] dark:border-[#1e293b]">
            <ClockIcon className="w-10 h-10 text-cyan-400 mb-2" />
            <h3 className="text-lg font-bold mb-1">Prática Diária</h3>
            <p className="text-cyan-700 dark:text-cyan-100 text-center text-sm">Exercícios rápidos que se adaptam ao seu nível de habilidade.</p>
          </div>
          <div className="bg-[#e0e7ef] rounded-xl p-6 flex flex-col items-center shadow border border-[#cbd5e1] dark:bg-[#162032] dark:border-[#1e293b]">
            <ChartBarIcon className="w-10 h-10 text-cyan-400 mb-2" />
            <h3 className="text-lg font-bold mb-1">Estatísticas Detalhadas</h3>
            <p className="text-cyan-700 dark:text-cyan-100 text-center text-sm">Acompanhe seu progresso com métricas de velocidade e precisão.</p>
          </div>
            <div className="bg-[#e0e7ef] rounded-xl p-6 flex flex-col items-center shadow border border-[#cbd5e1] dark:bg-[#162032] dark:border-[#1e293b]">
              <TrophyIcon className="w-10 h-10 text-cyan-400 mb-2" />
              <h3 className="text-lg font-bold mb-1">Exercícios Variados</h3>
              <p className="text-cyan-700 dark:text-cyan-100 text-center text-sm">Textos diversificados para melhorar diferentes aspectos da digitação.</p>
            </div>
        </div>
      </section>

      {/* Sobre Section */}
      <section id="sobre" className="w-full max-w-5xl mx-auto bg-[#e0e7ef] rounded-2xl p-8 mt-8 mb-8 border border-[#cbd5e1] shadow-lg dark:bg-[#162032] dark:border-[#1e293b]">
        <h2 className="text-3xl font-bold text-center mb-2">Sobre o DigiteMais</h2>
        <p className="text-cyan-700 dark:text-cyan-100 text-center mb-8">Uma plataforma moderna e eficiente para melhorar sua velocidade e precisão de digitação</p>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Por que escolher o DigiteMais?</h3>
            <ul className="space-y-2 text-cyan-700 dark:text-cyan-100">
              <li><span className="text-cyan-400 font-bold mr-2">✔</span>Interface intuitiva e moderna</li>
              <li><span className="text-cyan-400 font-bold mr-2">✔</span>Algoritmos avançados de análise de desempenho</li>
              <li><span className="text-cyan-400 font-bold mr-2">✔</span>Exercícios personalizados</li>
              <li><span className="text-cyan-400 font-bold mr-2">✔</span>Feedback em tempo real</li>
              
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white border-2 border-cyan-500 rounded-xl p-6 shadow-lg w-80 relative dark:bg-[#0d1724] dark:border-cyan-500">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-[#1e293b] dark:text-white">DigiteMais</span>
                <span className="bg-cyan-700 text-xs px-2 py-1 rounded text-white font-semibold">Versão 1.0</span>
              </div>
              <div className="mb-2">
                <span className="text-cyan-700 dark:text-cyan-200 text-sm">Velocidade: </span>
                <span className="font-bold text-cyan-400">75 PPM</span>
                <span className="ml-2 text-green-400 text-xs">+15%</span>
                <div className="w-full h-2 bg-[#cbd5e1] rounded mt-1 dark:bg-[#1e293b]">
                  <div className="h-2 bg-cyan-400 rounded" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-cyan-700 dark:text-cyan-200 text-sm">Precisão: </span>
                <span className="font-bold text-cyan-400">92%</span>
                <span className="ml-2 text-green-400 text-xs">+8%</span>
                <div className="w-full h-2 bg-[#cbd5e1] rounded mt-1 dark:bg-[#1e293b]">
                  <div className="h-2 bg-green-400 rounded" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="text-xs text-cyan-700 dark:text-cyan-100 mt-4">Seu progresso</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#e0e7ef] text-cyan-700 text-sm py-8 mt-auto border-t border-[#cbd5e1] dark:bg-[#162032] dark:text-cyan-100 dark:border-[#1e293b]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <span>© 2025 DigiteMais. Todos os direitos reservados.</span>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/termos" className="hover:underline">Termos</Link>
            <Link href="/privacidade" className="hover:underline">Privacidade</Link>
            <Link href="/contato" className="hover:underline">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  )
} 