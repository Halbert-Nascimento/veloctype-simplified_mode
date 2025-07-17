import { useState, useEffect } from 'react'
import typingTextsData from '../data/typing-texts.json'

export interface TypingText {
  id: string
  categoryId: string
  subcategory?: string
  title: string
  content: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  estimatedWPM: number
  wordCount: number
  characterCount: number
  hasNumbers: boolean
  hasSymbols: boolean
  language: string
  tags: string[]
}

export interface TextCategory {
  id: string
  name: string
  description: string
  icon: string
  premium: boolean
  difficulty: string
  color: string
  subcategories?: string[]
}

export interface TextsMetadata {
  version: string
  lastUpdated: string
  totalTexts: number
  totalCategories: number
}

interface UseTypingTextsReturn {
  categories: TextCategory[]
  texts: TypingText[]
  metadata: TextsMetadata
  getTextsByCategory: (categoryId: string) => TypingText[]
  getTextsByDifficulty: (difficulty: string) => TypingText[]
  getTextsBySubcategory: (subcategory: string) => TypingText[]
  getRandomText: (categoryId?: string) => TypingText | null
  searchTexts: (query: string) => TypingText[]
  getTextById: (id: string) => TypingText | null
  getCategoryById: (id: string) => TextCategory | null
  getAvailableCategories: (isPremium: boolean) => TextCategory[]
}

export const useTypingTexts = (): UseTypingTextsReturn => {
  const [categories] = useState<TextCategory[]>(typingTextsData.categories as TextCategory[])
  const [texts] = useState<TypingText[]>(typingTextsData.texts as TypingText[])
  const [metadata] = useState<TextsMetadata>(typingTextsData.metadata as TextsMetadata)

  const getTextsByCategory = (categoryId: string): TypingText[] => {
    return texts.filter(text => text.categoryId === categoryId)
  }

  const getTextsByDifficulty = (difficulty: string): TypingText[] => {
    return texts.filter(text => text.difficulty === difficulty)
  }

  const getTextsBySubcategory = (subcategory: string): TypingText[] => {
    return texts.filter(text => text.subcategory === subcategory)
  }

  const getRandomText = (categoryId?: string): TypingText | null => {
    let filteredTexts = texts
    
    if (categoryId) {
      filteredTexts = getTextsByCategory(categoryId)
    }
    
    if (filteredTexts.length === 0) return null
    
    const randomIndex = Math.floor(Math.random() * filteredTexts.length)
    return filteredTexts[randomIndex]
  }

  const searchTexts = (query: string): TypingText[] => {
    const lowercaseQuery = query.toLowerCase()
    
    return texts.filter(text => 
      text.title.toLowerCase().includes(lowercaseQuery) ||
      text.content.toLowerCase().includes(lowercaseQuery) ||
      text.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      text.language.toLowerCase().includes(lowercaseQuery)
    )
  }

  const getTextById = (id: string): TypingText | null => {
    return texts.find(text => text.id === id) || null
  }

  const getCategoryById = (id: string): TextCategory | null => {
    return categories.find(category => category.id === id) || null
  }

  const getAvailableCategories = (isPremium: boolean): TextCategory[] => {
    return categories.filter(category => !category.premium || isPremium)
  }

  return {
    categories,
    texts,
    metadata,
    getTextsByCategory,
    getTextsByDifficulty,
    getTextsBySubcategory,
    getRandomText,
    searchTexts,
    getTextById,
    getCategoryById,
    getAvailableCategories
  }
}

// Utility functions para análise de texto
export const analyzeText = (text: string) => {
  const wordCount = text.trim().split(/\s+/).length
  const characterCount = text.length
  const hasNumbers = /\d/.test(text)
  const hasSymbols = /[^\w\s]/.test(text)
  
  return {
    wordCount,
    characterCount,
    hasNumbers,
    hasSymbols
  }
}

// Função para estimar WPM baseado na dificuldade do texto
export const estimateWPM = (text: string, difficulty: string): number => {
  const baseWPM = {
    easy: 45,
    medium: 35,
    hard: 25,
    expert: 20
  }
  
  const analysis = analyzeText(text)
  let wpmModifier = 1
  
  // Reduz WPM se tiver muitos números ou símbolos
  if (analysis.hasNumbers) wpmModifier -= 0.15
  if (analysis.hasSymbols) wpmModifier -= 0.20
  
  // Reduz WPM para textos muito longos
  if (analysis.characterCount > 200) wpmModifier -= 0.10
  
  return Math.round((baseWPM[difficulty as keyof typeof baseWPM] || 30) * wpmModifier)
}
