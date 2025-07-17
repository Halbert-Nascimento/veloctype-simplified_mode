'use client'

import { motion } from 'framer-motion'
import { 
  RocketLaunchIcon, 
  ChartBarIcon, 
  ClockIcon, 
  TrophyIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline'
import PageContainer from '../components/PageContainer'
import Link from 'next/link'

export default function Sobre() {
  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Interface Moderna",
      description: "Design limpo e intuitivo que facilita o foco na prática de digitação."
    },
    {
      icon: ChartBarIcon,
      title: "Estatísticas Detalhadas",
      description: "Acompanhe seu progresso com métricas precisas de velocidade e precisão."
    },
    {
      icon: ClockIcon,
      title: "Prática Flexível",
      description: "Exercícios de diferentes durações adaptados ao seu tempo disponível."
    },
    {
      icon: TrophyIcon,
      title: "Textos Variados",
      description: "Categorias diversificadas incluindo programação, literatura e textos gerais."
    }
  ]

  const stats = [
    { label: "Categorias de Texto", value: "8+", color: "text-cyan-400" },
    { label: "Exercícios Disponíveis", value: "24+", color: "text-green-400" },
    { label: "Linguagens Suportadas", value: "6+", color: "text-yellow-400" },
    { label: "Níveis de Dificuldade", value: "4", color: "text-purple-400" }
  ]

  return (
    <PageContainer 
      title="Sobre o VelocType" 
      subtitle="Conheça nossa plataforma de treino de digitação moderna e eficiente"
    >
      <div className="space-y-12">
        {/* Missão */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <LightBulbIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">Nossa Missão</h2>
          </div>
          <p className="text-lg text-cyan-700 dark:text-cyan-100 leading-relaxed">
            O VelocType foi criado com o objetivo de tornar o aprendizado de digitação mais eficiente, 
            divertido e acessível. Acreditamos que uma boa velocidade de digitação é uma habilidade 
            fundamental no mundo digital atual, seja para estudantes, profissionais ou entusiastas da tecnologia.
          </p>
        </motion.section>

        {/* Estatísticas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-sm text-cyan-700 dark:text-cyan-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recursos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">Principais Recursos</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex gap-4 p-4 bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl border border-[#cbd5e1] dark:border-cyan-900"
              >
                <feature.icon className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-cyan-700 dark:text-cyan-100 text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Como Funciona */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <UserGroupIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">Como Funciona</h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                  Escolha sua Categoria
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100 text-sm">
                  Selecione entre texto geral, programação, literatura, números e muito mais.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                  Configure seu Teste
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100 text-sm">
                  Defina a duração, ajuste o tamanho da fonte e personalize suas preferências.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                  Pratique e Melhore
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100 text-sm">
                  Digite o texto exibido e receba feedback em tempo real sobre sua performance.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
                  Acompanhe seu Progresso
                </h3>
                <p className="text-cyan-700 dark:text-cyan-100 text-sm">
                  Veja suas estatísticas detalhadas e acompanhe sua evolução ao longo do tempo.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tecnologias */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <RocketLaunchIcon className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">Tecnologias Utilizadas</h2>
          </div>
          <div className="bg-[#e0e7ef] dark:bg-[#0d1724] rounded-xl p-6 border border-[#cbd5e1] dark:border-cyan-900">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">Frontend</h3>
                <ul className="space-y-2 text-cyan-700 dark:text-cyan-100 text-sm">
                  <li>• Next.js 13+ com App Router</li>
                  <li>• React com TypeScript</li>
                  <li>• Tailwind CSS para estilização</li>
                  <li>• Framer Motion para animações</li>
                  <li>• Heroicons para ícones</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-3">Recursos</h3>
                <ul className="space-y-2 text-cyan-700 dark:text-cyan-100 text-sm">
                  <li>• Tema claro/escuro automático</li>
                  <li>• Responsive design</li>
                  <li>• Armazenamento local</li>
                  <li>• Performance otimizada</li>
                  <li>• PWA ready</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HeartIcon className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
              Pronto para Começar?
            </h2>
          </div>
          <p className="text-cyan-700 dark:text-cyan-100 mb-6">
            Comece sua jornada para se tornar um digitador mais rápido e preciso hoje mesmo!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/treino"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow transition"
            >
              <RocketLaunchIcon className="w-5 h-5" />
              Começar a Praticar
            </Link>
            <Link 
              href="/estatisticas"
              className="bg-[#e0e7ef] hover:bg-cyan-100 text-cyan-700 font-semibold px-6 py-3 rounded-lg flex items-center justify-center gap-2 border border-cyan-700 transition dark:bg-[#0d1724] dark:hover:bg-[#1e293b] dark:text-cyan-100 dark:border-cyan-700"
            >
              <ChartBarIcon className="w-5 h-5" />
              Ver Estatísticas
            </Link>
          </div>
        </motion.section>
      </div>
    </PageContainer>
  )
}
