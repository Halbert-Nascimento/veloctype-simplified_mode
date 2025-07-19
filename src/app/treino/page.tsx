'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, XCircleIcon, AdjustmentsHorizontalIcon, LockClosedIcon, ChatBubbleLeftRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import { useTypingTexts, TypingText } from '../../hooks/useTypingTexts'
import AdSense from '../components/AdSense'

interface TestResult {
  wpm: number
  accuracy: number
  time: number
  date: string
  textId?: string
  category?: string
}

export default function Treino() {
  const { getRandomText, getCategoryById, getAvailableCategories } = useTypingTexts()
  
  const [currentText, setCurrentText] = useState<TypingText | null>(null)
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showErrors] = useState(true)
  const [colorFeedback, setColorFeedback] = useState(true)
  const [soundFeedback] = useState(false)
  const [fontSize, setFontSize] = useState(1)
  const [results, setResults] = useState<TestResult[]>([])
  const [isTestComplete, setIsTestComplete] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('geral')
  const [testDuration, setTestDuration] = useState(60) // segundos
  const [progress, setProgress] = useState(0)
  const [isPremium] = useState(false) // Simula status premium
  const inputRef = useRef<HTMLInputElement>(null)

  // Carrega texto inicial
  useEffect(() => {
    const initialText = getRandomText(selectedCategory)
    setCurrentText(initialText)
  }, [])

  useEffect(() => {
    if (selectedCategory) {
      const newText = getRandomText(selectedCategory)
      setCurrentText(newText)
    }
    setUserInput('')
    setCurrentIndex(0)
    setStartTime(null)
    setElapsedTime(0)
    setIsTestComplete(false)
    setProgress(0)
  }, [selectedCategory])

  const getNewRandomText = () => {
    const newText = getRandomText(selectedCategory)
    setCurrentText(newText)
    resetTest()
  }

  const text = currentText?.content || 'Carregando texto...'

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (startTime && !isTestComplete) {
      interval = setInterval(() => {
        const now = Date.now()
        setElapsedTime(now - startTime)
        setProgress(Math.min(100, ((now - startTime) / (testDuration * 1000)) * 100))
        if ((now - startTime) >= testDuration * 1000) {
          setIsTestComplete(true)
          saveResult()
        }
      }, 100)
    }
    return () => clearInterval(interval)
  }, [startTime, isTestComplete, testDuration])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!startTime) {
      setStartTime(Date.now())
    }
    setUserInput(value)
    setCurrentIndex(value.length)
    if (value.length === text.length) {
      setIsTestComplete(true)
      saveResult()
    }
    if (showErrors && soundFeedback && value[value.length - 1] && value[value.length - 1] !== text[value.length - 1]) {
      // Simula som de erro
      const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae0b2.mp3')
      audio.play()
    }
  }

  const calculateWPM = () => {
    if (!startTime) return 0
    const words = userInput.trim().split(/\s+/).length
    const minutes = elapsedTime / 60000
    return Math.round(words / minutes)
  }

  const calculateCPM = () => {
    if (!startTime) return 0
    const chars = userInput.length
    const minutes = elapsedTime / 60000
    return Math.round(chars / minutes)
  }

  const calculateAccuracy = () => {
    let correct = 0
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++
    }
    return userInput.length === 0 ? 100 : Math.round((correct / userInput.length) * 100)
  }

  const saveResult = () => {
    const newResult: TestResult = {
      wpm: calculateWPM(),
      accuracy: calculateAccuracy(),
      time: elapsedTime / 1000,
      date: new Date().toISOString(),
      textId: currentText?.id,
      category: currentText?.categoryId
    }
    setResults(prev => [newResult, ...prev].slice(0, 4))
    const savedResults = localStorage.getItem('typingResults')
    const allResults = savedResults ? JSON.parse(savedResults) : []
    localStorage.setItem('typingResults', JSON.stringify([newResult, ...allResults].slice(0, 50)))
  }

  const resetTest = () => {
    setUserInput('')
    setCurrentIndex(0)
    setStartTime(null)
    setElapsedTime(0)
    setIsTestComplete(false)
    setProgress(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] dark:bg-[#0d1724] dark:text-white flex flex-col pt-10 pb-8 px-2">
      
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 flex-1">
        {/* Área principal */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-8 dark:bg-[#162032] dark:border-[#1e293b]">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-cyan-700 dark:text-cyan-300">Teste de Digitação</h1>
              <span className="bg-cyan-700 text-xs px-2 py-1 rounded text-white font-semibold">Versão 1.0</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
              <p className="text-cyan-700 dark:text-cyan-100">
                {currentText ? `${currentText.title} - ${getCategoryById(currentText.categoryId)?.name}` : 'Carregando...'}
              </p>
              {currentText && (
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded text-white font-semibold ${
                    currentText.difficulty === 'easy' ? 'bg-green-500' :
                    currentText.difficulty === 'medium' ? 'bg-yellow-500' :
                    currentText.difficulty === 'hard' ? 'bg-orange-500' : 'bg-red-500'
                  }`}>
                    {currentText.difficulty}
                  </span>
                  <button 
                    onClick={getNewRandomText}
                    className="text-cyan-700 dark:text-cyan-300 hover:text-cyan-500 p-1"
                    title="Novo texto aleatório"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <span className="text-cyan-700 dark:text-cyan-400">Tempo restante: {Math.max(0, testDuration - Math.floor(elapsedTime / 1000)).toString().padStart(2, '0')}s</span>
            </div>
            <div className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 mb-4 dark:bg-[#0d1724] dark:border-cyan-900">
              <div className="mb-2 text-lg font-mono leading-relaxed min-h-[40px]" style={{ fontSize: `${fontSize}rem` }}>
                {text.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`
                      ${index === currentIndex ? 'bg-yellow-200 text-black' : ''}
                      ${index < currentIndex && showErrors && colorFeedback
                        ? userInput[index] === char
                          ? 'text-green-400'
                          : 'text-red-400'
                        : ''}
                    `}
                  >
                    {char}
                  </span>
                ))}
              </div>
              <div className="w-full h-2 bg-[#cbd5e1] rounded mt-2 mb-2 dark:bg-[#1e293b]">
                <div className="h-2 bg-cyan-400 rounded transition-all" style={{ width: `${progress}%` }}></div>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                className="w-full p-3 border border-[#cbd5e1] rounded-lg font-mono text-lg bg-white text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-cyan-500 transition dark:bg-[#0d1724] dark:text-white dark:border-cyan-700"
                placeholder="Comece a digitar..."
                autoFocus
                disabled={isTestComplete}
              />
            </div>
            <div className="flex flex-wrap gap-3 mb-4 items-center">
              <button onClick={resetTest} className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition"><XCircleIcon className="w-5 h-5" />Reiniciar</button>
              <button onClick={() => setIsTestComplete(true)} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition"><CheckCircleIcon className="w-5 h-5" />Encerrar Teste</button>
              {/* <label className="flex items-center gap-2 text-cyan-700 dark:text-cyan-100 cursor-pointer">
                <input type="checkbox" checked={soundFeedback} onChange={() => setSoundFeedback(v => !v)} className="accent-cyan-500" />
                <SpeakerWaveIcon className="w-5 h-5" />Som de Erro
              </label> */}
              <label className="flex items-center gap-2 text-cyan-700 dark:text-cyan-100 cursor-pointer">
                <input type="checkbox" checked={colorFeedback} onChange={() => setColorFeedback(v => !v)} className="accent-cyan-500" />
                <AdjustmentsHorizontalIcon className="w-5 h-5" />Feedback de Cores
              </label>
              <span className="ml-4 text-cyan-700 dark:text-cyan-100">Fonte:</span>
              <button onClick={() => setFontSize(f => Math.max(f - 0.1, 0.8))} className="bg-[#cbd5e1] text-cyan-700 px-2 py-1 rounded dark:bg-[#1e293b] dark:text-cyan-100">-</button>
              <button onClick={() => setFontSize(f => Math.min(f + 0.1, 2))} className="bg-[#cbd5e1] text-cyan-700 px-2 py-1 rounded dark:bg-[#1e293b] dark:text-cyan-100">+</button>
            </div>
            {/* Estatísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex flex-col items-center dark:bg-[#0d1724] dark:border-cyan-900">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">Tempo</span>
                <span className="text-2xl font-mono text-cyan-700 dark:text-cyan-300">{`${String(Math.floor(elapsedTime / 60000)).padStart(2, '0')}:${String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0')}`}</span>
              </div>
              <div className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex flex-col items-center dark:bg-[#0d1724] dark:border-cyan-900">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">PPM</span>
                <span className="text-2xl font-mono text-cyan-700 dark:text-cyan-300">{calculateWPM()}</span>
              </div>
              <div className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex flex-col items-center dark:bg-[#0d1724] dark:border-cyan-900">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">CPM</span>
                <span className="text-2xl font-mono text-cyan-700 dark:text-cyan-300">{calculateCPM()}</span>
              </div>
              <div className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex flex-col items-center dark:bg-[#0d1724] dark:border-cyan-900">
                <span className="text-cyan-700 dark:text-cyan-400 font-bold">Precisão</span>
                <span className="text-2xl font-mono text-yellow-500 dark:text-yellow-300">{calculateAccuracy()}%</span>
              </div>
            </div>
          </div>
          {/* Resultados recentes */}
          {results.length > 0 && (
            <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-6 dark:bg-[#162032] dark:border-[#1e293b]">
              <h2 className="text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-300">Últimos Resultados</h2>
              <div className="grid gap-4">
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#e0e7ef] border border-[#cbd5e1] rounded-xl p-4 flex justify-between items-center shadow dark:bg-[#0d1724] dark:border-cyan-900"
                  >
                    <div>
                      <p className="font-bold text-cyan-700 dark:text-cyan-400">WPM: {result.wpm}</p>
                      <p className="text-cyan-700 dark:text-cyan-100">Precisão: {result.accuracy}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-700 dark:text-cyan-100">Tempo: {result.time.toFixed(1)}s</p>
                      <p className="text-xs text-cyan-700 dark:text-cyan-400">{new Date(result.date).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-8">
          {/* Tipos de texto */}
          <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-6 dark:bg-[#162032] dark:border-[#1e293b]">
            <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Categorias de Texto
            </h3>
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              {getAvailableCategories(isPremium).map(category => (
                <div key={category.id} className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id={category.id} 
                    name="textCategory" 
                    checked={selectedCategory === category.id} 
                    onChange={() => setSelectedCategory(category.id)} 
                    disabled={category.premium && !isPremium} 
                    className="accent-cyan-500" 
                  />
                  <label 
                    htmlFor={category.id} 
                    className={`flex-1 text-cyan-700 dark:text-cyan-100 ${category.premium && !isPremium ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 block">
                      {category.description}
                    </span>
                  </label>
                  {category.premium && !isPremium && <LockClosedIcon className="w-4 h-4 text-cyan-400" />}
                </div>
              ))}
            </div>
          </div>

          {/* AdSense - Anúncio Lateral */}
          <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-6 dark:bg-[#162032] dark:border-[#1e293b]">
            <AdSense
              adSlot="9876543210"
              adFormat="rectangle"
              style={{ display: 'block', textAlign: 'center', minHeight: '250px' }}
            />
          </div>


          {/* Configurações */}
          <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-6 dark:bg-[#162032] dark:border-[#1e293b]">
            <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300 mb-4 flex items-center gap-2"><AdjustmentsHorizontalIcon className="w-5 h-5" />Configurações</h3>
            <div className="flex flex-col gap-2 text-cyan-700 dark:text-cyan-100">
              <div className="flex justify-between items-center">
                <span>Duração do Teste</span>
                <select value={testDuration} onChange={e => setTestDuration(Number(e.target.value))} className="bg-[#e0e7ef] border border-[#cbd5e1] rounded px-2 py-1 text-cyan-700 dark:bg-[#0d1724] dark:text-cyan-100 dark:border-cyan-700">
                  <option value={30}>30 segundos</option>
                  <option value={60}>1 minuto</option>
                  <option value={120}>2 minutos</option>
                </select>
              </div>
            </div>
          </div>
          {/* Modo Treino Premium */}
          {/* <div className="bg-white border border-[#cbd5e1] rounded-2xl shadow-lg p-6 flex flex-col items-center dark:bg-[#162032] dark:border-[#1e293b]">
            <TrophyIcon className="w-8 h-8 text-cyan-400 mb-2" />
            <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-300 mb-2">Modo Treino</h3>
            <p className="text-cyan-700 dark:text-cyan-100 text-center mb-4">Desbloqueie o modo treino para praticar teclas específicas e melhorar sua velocidade.</p>
            <button className="bg-cyan-700 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg transition">Assinar Premium</button>
          </div> */}
        </div>
      </div>
    </div>
  )
} 