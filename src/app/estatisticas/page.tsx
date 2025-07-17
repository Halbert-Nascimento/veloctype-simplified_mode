'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TestResult {
  wpm: number // Palavras por minuto
  cpm?: number // Caracteres por minuto
  accuracy: number
  time: number
  date: string
}

export default function Estatisticas() {
  const [results, setResults] = useState<TestResult[]>([])

  useEffect(() => {
    // Simular carregamento de dados do localStorage
    const savedResults = localStorage.getItem('typingResults')
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    }
  }, [])

  const calculateAverage = (key: keyof TestResult) => {
    if (results.length === 0) return 0
    const sum = results.reduce((acc, curr) => acc + Number(curr[key] ?? 0), 0)
    return (sum / results.length).toFixed(1)
  }

  const getBestResult = (key: keyof TestResult) => {
    if (results.length === 0) return 0
    return Math.max(...results.map(result => Number(result[key] ?? 0)))
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] dark:bg-[#0d1724] dark:text-white flex flex-col pt-24 pb-8 px-2">
      <div className="w-full max-w-3xl mx-auto flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-700 dark:text-cyan-300">Estatísticas</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow flex flex-col items-center dark:bg-[#162032] dark:border-[#1e293b]"
          >
            <h3 className="text-lg font-semibold mb-2 text-cyan-700 dark:text-cyan-100">Média de PPM</h3>
            <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">
              {calculateAverage('wpm')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow flex flex-col items-center dark:bg-[#162032] dark:border-[#1e293b]"
          >
            <h3 className="text-lg font-semibold mb-2 text-cyan-700 dark:text-cyan-100">Melhor PPM</h3>
            <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">
              {getBestResult('wpm')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#cbd5e1] rounded-xl p-6 shadow flex flex-col items-center dark:bg-[#162032] dark:border-[#1e293b]"
          >
            <h3 className="text-lg font-semibold mb-2 text-cyan-700 dark:text-cyan-100">Média de Precisão</h3>
            <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-300">
              {calculateAverage('accuracy')}%
            </p>
          </motion.div>
        </div>

        <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-8 dark:bg-[#162032] dark:border-[#1e293b]">
          <h2 className="text-2xl font-bold mb-6 text-cyan-700 dark:text-cyan-300">Histórico de Testes</h2>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex justify-between items-center shadow dark:bg-[#0d1724] dark:border-cyan-900"
                >
                  <div>
                    <p className="font-bold text-cyan-700 dark:text-cyan-400">PPM: {result.wpm}</p>
                    <p className="text-cyan-700 dark:text-cyan-100">Precisão: {result.accuracy}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-700 dark:text-cyan-100">Tempo: {result.time.toFixed(1)}s</p>
                    <p className="text-xs text-cyan-700 dark:text-cyan-400">
                      {new Date(result.date).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-cyan-700 dark:text-cyan-100">
              Nenhum resultado encontrado. Comece a treinar para ver suas estatísticas!
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 