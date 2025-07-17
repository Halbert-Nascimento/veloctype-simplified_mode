'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Footer from './Footer'

interface PageContainerProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function PageContainer({ title, subtitle, children, className = '' }: PageContainerProps) {
  return (
    <div className={`min-h-screen bg-[#f8fafc] text-[#1e293b] dark:bg-[#0d1724] dark:text-white flex flex-col ${className}`}>
      <div className="flex-1 pt-24 pb-8 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cyan-700 dark:text-cyan-300">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-cyan-700 dark:text-cyan-100 mb-8">
                {subtitle}
              </p>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-8 dark:bg-[#162032] dark:border-[#1e293b]"
          >
            {children}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
