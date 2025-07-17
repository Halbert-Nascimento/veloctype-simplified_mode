/**
 * Hook personalizado para gerenciar textos de digitação e categorias
 * 
 * Este arquivo é o "cérebro" que gerencia todos os textos usados nos exercícios
 * de digitação. Ele carrega os dados de um arquivo JSON e fornece funções
 * úteis para buscar, filtrar e manipular esses textos.
 * 
 * COMO FUNCIONA:
 * - Carrega dados do arquivo typing-texts.json na inicialização
 * - Fornece funções para buscar textos por categoria, dificuldade, etc.
 * - Analisa características dos textos (número de palavras, símbolos, etc.)
 * 
 * QUANDO USAR:
 * - Em qualquer componente que precise mostrar textos para digitação
 * - Para buscar textos específicos baseados em filtros
 * - Para obter estatísticas sobre os textos disponíveis
 */

import { useState, useEffect } from 'react'
import typingTextsData from '../data/typing-texts.json'

/**
 * INTERFACE: TypingText
 * 
 * Define como cada texto de digitação é estruturado no sistema.
 * Cada texto tem informações como título, conteúdo, dificuldade, etc.
 * 
 * CAMPOS IMPORTANTES:
 * - id: identificador único do texto (exemplo: "texto_001")
 * - content: o texto que o usuário vai digitar
 * - difficulty: nível de dificuldade (easy, medium, hard, expert)
 * - estimatedWPM: quantas palavras por minuto esperamos que o usuário digite
 */
export interface TypingText {
  id: string                    // ID único: "texto_001", "texto_002", etc.
  categoryId: string           // Categoria que o texto pertence: "programacao", "literatura", etc.
  subcategory?: string         // Subcategoria opcional: "javascript", "python", etc.
  title: string               // Título do texto: "Função em JavaScript"
  content: string             // O texto que será digitado pelo usuário
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'  // Nível de dificuldade
  estimatedWPM: number        // Palavras por minuto esperadas (exemplo: 35)
  wordCount: number           // Quantas palavras tem o texto
  characterCount: number      // Quantos caracteres tem o texto
  hasNumbers: boolean         // Se o texto contém números (0-9)
  hasSymbols: boolean         // Se o texto contém símbolos especiais (@, #, etc.)
  language: string            // Idioma do texto: "pt-BR", "en-US", etc.
  tags: string[]              // Tags para busca: ["javascript", "frontend", "web"]
}

/**
 * INTERFACE: TextCategory
 * 
 * Define as categorias de textos (programação, literatura, negócios, etc.)
 * Cada categoria agrupa textos similares e tem suas próprias características.
 * 
 * EXEMPLO DE CATEGORIA:
 * {
 *   id: "programacao",
 *   name: "Programação",
 *   description: "Textos sobre código e desenvolvimento",
 *   icon: "💻",
 *   premium: false
 * }
 */
export interface TextCategory {
  id: string                  // ID da categoria: "programacao", "literatura"
  name: string               // Nome para exibir: "Programação", "Literatura"
  description: string        // Descrição da categoria
  icon: string              // Emoji ou ícone: "💻", "📚"
  premium: boolean          // Se precisa de assinatura premium
  difficulty: string        // Dificuldade geral da categoria
  color: string            // Cor para exibir a categoria
  subcategories?: string[] // Subcategorias opcionais
}

/**
 * INTERFACE: TextsMetadata
 * 
 * Informações gerais sobre o banco de dados de textos.
 * Usado para exibir estatísticas e versioning.
 */
export interface TextsMetadata {
  version: string           // Versão dos dados: "1.0.0"
  lastUpdated: string      // Última atualização: "2025-01-17"
  totalTexts: number       // Total de textos disponíveis
  totalCategories: number  // Total de categorias disponíveis
}

/**
 * INTERFACE: UseTypingTextsReturn
 * 
 * Define todas as funções e dados que o hook retorna.
 * É como um "menu" de tudo que você pode fazer com os textos.
 */
interface UseTypingTextsReturn {
  categories: TextCategory[]  // Lista de todas as categorias
  texts: TypingText[]        // Lista de todos os textos
  metadata: TextsMetadata    // Informações gerais
  
  // FUNÇÕES DE BUSCA E FILTRO:
  getTextsByCategory: (categoryId: string) => TypingText[]           // Busca textos de uma categoria
  getTextsByDifficulty: (difficulty: string) => TypingText[]         // Busca textos por dificuldade
  getTextsBySubcategory: (subcategory: string) => TypingText[]       // Busca textos de subcategoria
  getRandomText: (categoryId?: string) => TypingText | null          // Pega texto aleatório
  searchTexts: (query: string) => TypingText[]                       // Busca textos por palavra-chave
  getTextById: (id: string) => TypingText | null                     // Busca texto específico por ID
  getCategoryById: (id: string) => TextCategory | null               // Busca categoria por ID
  getAvailableCategories: (isPremium: boolean) => TextCategory[]     // Lista categorias disponíveis
}

/**
 * HOOK PRINCIPAL: useTypingTexts
 * 
 * Este é o hook principal que você vai usar nos componentes.
 * Ele carrega todos os dados na memória e fornece funções para trabalhar com eles.
 * 
 * COMO USAR NO COMPONENTE:
 * const { texts, getTextsByCategory, getRandomText } = useTypingTexts()
 * const textosDeProgramacao = getTextsByCategory('programacao')
 * const textoAleatorio = getRandomText()
 */
export const useTypingTexts = (): UseTypingTextsReturn => {
  // ESTADO: Carrega os dados do arquivo JSON na memória
  // Estes dados ficam fixos durante toda a sessão do usuário
  const [categories] = useState<TextCategory[]>(typingTextsData.categories as TextCategory[])
  const [texts] = useState<TypingText[]>(typingTextsData.texts as TypingText[])
  const [metadata] = useState<TextsMetadata>(typingTextsData.metadata as TextsMetadata)

  /**
   * FUNÇÃO: getTextsByCategory
   * 
   * Busca todos os textos que pertencem a uma categoria específica.
   * 
   * EXEMPLO DE USO:
   * const textosDeProgramacao = getTextsByCategory('programacao')
   * // Retorna todos os textos da categoria "programacao"
   * 
   * PARÂMETROS:
   * - categoryId: ID da categoria (exemplo: "programacao", "literatura")
   * 
   * RETORNA:
   * - Array com todos os textos da categoria
   * - Array vazio se a categoria não existir
   */
  const getTextsByCategory = (categoryId: string): TypingText[] => {
    return texts.filter(text => text.categoryId === categoryId)
  }

  /**
   * FUNÇÃO: getTextsByDifficulty
   * 
   * Busca todos os textos de uma dificuldade específica.
   * 
   * EXEMPLO DE USO:
   * const textosFaceis = getTextsByDifficulty('easy')
   * // Retorna todos os textos fáceis, independente da categoria
   * 
   * PARÂMETROS:
   * - difficulty: "easy", "medium", "hard" ou "expert"
   * 
   * RETORNA:
   * - Array com textos da dificuldade especificada
   */
  const getTextsByDifficulty = (difficulty: string): TypingText[] => {
    return texts.filter(text => text.difficulty === difficulty)
  }

  /**
   * FUNÇÃO: getTextsBySubcategory
   * 
   * Busca textos de uma subcategoria específica.
   * Útil quando você quer textos muito específicos.
   * 
   * EXEMPLO DE USO:
   * const textosJavaScript = getTextsBySubcategory('javascript')
   * // Retorna apenas textos sobre JavaScript
   */
  const getTextsBySubcategory = (subcategory: string): TypingText[] => {
    return texts.filter(text => text.subcategory === subcategory)
  }

  /**
   * FUNÇÃO: getRandomText
   * 
   * Pega um texto aleatório para o usuário praticar.
   * Muito útil para o botão "Texto Aleatório" na interface.
   * 
   * EXEMPLO DE USO:
   * const textoAleatorio = getRandomText()              // Qualquer texto
   * const textoAleatorioProg = getRandomText('programacao')  // Só de programação
   * 
   * PARÂMETROS:
   * - categoryId (opcional): Se especificado, pega texto só dessa categoria
   * 
   * RETORNA:
   * - Um texto aleatório ou null se não houver textos disponíveis
   */
  const getRandomText = (categoryId?: string): TypingText | null => {
    let filteredTexts = texts
    
    // Se foi especificada uma categoria, filtra só por ela
    if (categoryId) {
      filteredTexts = getTextsByCategory(categoryId)
    }
    
    // Se não há textos disponíveis, retorna null
    if (filteredTexts.length === 0) return null
    
    // Pega um índice aleatório e retorna o texto
    const randomIndex = Math.floor(Math.random() * filteredTexts.length)
    return filteredTexts[randomIndex]
  }

  /**
   * FUNÇÃO: searchTexts
   * 
   * Busca textos que contenham uma palavra ou frase específica.
   * Procura no título, conteúdo, tags e idioma.
   * 
   * EXEMPLO DE USO:
   * const resultados = searchTexts('javascript')
   * // Retorna textos que tenham "javascript" em qualquer lugar
   * 
   * PARÂMETROS:
   * - query: Palavra ou frase para buscar
   * 
   * RETORNA:
   * - Array com textos que contêm a busca
   * 
   * NOTA: A busca é case-insensitive (não diferencia maiúsculas/minúsculas)
   */
  const searchTexts = (query: string): TypingText[] => {
    const lowercaseQuery = query.toLowerCase()
    
    return texts.filter(text => 
      text.title.toLowerCase().includes(lowercaseQuery) ||
      text.content.toLowerCase().includes(lowercaseQuery) ||
      text.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      text.language.toLowerCase().includes(lowercaseQuery)
    )
  }

  /**
   * FUNÇÃO: getTextById
   * 
   * Busca um texto específico pelo seu ID único.
   * Útil quando você tem o ID salvo e quer carregar aquele texto específico.
   * 
   * EXEMPLO DE USO:
   * const texto = getTextById('texto_001')
   * if (texto) {
   *   console.log('Texto encontrado:', texto.title)
   * }
   */
  const getTextById = (id: string): TypingText | null => {
    return texts.find(text => text.id === id) || null
  }

  /**
   * FUNÇÃO: getCategoryById
   * 
   * Busca uma categoria específica pelo seu ID.
   * Útil para mostrar informações da categoria na interface.
   */
  const getCategoryById = (id: string): TextCategory | null => {
    return categories.find(category => category.id === id) || null
  }

  /**
   * FUNÇÃO: getAvailableCategories
   * 
   * Lista categorias disponíveis baseado no status premium do usuário.
   * Usuários gratuitos só veem categorias gratuitas.
   * 
   * EXEMPLO DE USO:
   * const categoriasDisponiveis = getAvailableCategories(true)  // Usuário premium
   * const categoriasGratuitas = getAvailableCategories(false)   // Usuário gratuito
   */
  const getAvailableCategories = (isPremium: boolean): TextCategory[] => {
    return categories.filter(category => !category.premium || isPremium)
  }

  // RETORNO DO HOOK
  // Tudo que o hook disponibiliza para os componentes que o usam
  return {
    categories,                    // Lista completa de categorias
    texts,                        // Lista completa de textos
    metadata,                     // Informações gerais
    getTextsByCategory,           // Buscar por categoria
    getTextsByDifficulty,         // Buscar por dificuldade
    getTextsBySubcategory,        // Buscar por subcategoria
    getRandomText,                // Texto aleatório
    searchTexts,                  // Busca por palavra-chave
    getTextById,                  // Buscar por ID
    getCategoryById,              // Buscar categoria por ID
    getAvailableCategories        // Categorias disponíveis
  }
}

/**
 * FUNÇÃO UTILITÁRIA: analyzeText
 * 
 * Analisa um texto e retorna informações úteis sobre ele.
 * Esta função é usada para processar novos textos antes de salvá-los.
 * 
 * COMO FUNCIONA:
 * 1. Conta o número de palavras (separadas por espaço)
 * 2. Conta o número total de caracteres
 * 3. Verifica se tem números (0-9)
 * 4. Verifica se tem símbolos especiais (@, #, %, etc.)
 * 
 * EXEMPLO DE USO:
 * const analise = analyzeText('Olá mundo! Isto é um teste.')
 * console.log(analise)
 * // Output:
 * // {
 * //   wordCount: 6,
 * //   characterCount: 29,
 * //   hasNumbers: false,
 * //   hasSymbols: true  (por causa do ! e .)
 * // }
 * 
 * QUANDO USAR:
 * - Ao adicionar novos textos ao sistema
 * - Para gerar estatísticas de textos existentes
 * - Para validar a qualidade de um texto
 */
export const analyzeText = (text: string) => {
  // Conta palavras: divide o texto por espaços e conta os pedaços
  const wordCount = text.trim().split(/\s+/).length
  
  // Conta caracteres: tamanho total da string
  const characterCount = text.length
  
  // Verifica números: procura por qualquer dígito (0-9)
  const hasNumbers = /\d/.test(text)
  
  // Verifica símbolos: procura por caracteres que não sejam letras, números ou espaços
  // Exemplos de símbolos: @, #, %, &, *, (, ), etc.
  const hasSymbols = /[^\w\s]/.test(text)
  
  return {
    wordCount,
    characterCount,
    hasNumbers,
    hasSymbols
  }
}

/**
 * FUNÇÃO UTILITÁRIA: estimateWPM
 * 
 * Estima quantas palavras por minuto (WPM) um usuário conseguirá digitar
 * baseado na dificuldade e características do texto.
 * 
 * COMO FUNCIONA:
 * 1. Define WPM base para cada dificuldade
 * 2. Analisa o texto para ver se tem números ou símbolos
 * 3. Reduz o WPM se o texto for mais difícil de digitar
 * 4. Retorna a estimativa final
 * 
 * VALORES BASE DE WPM:
 * - easy (fácil): 45 WPM
 * - medium (médio): 35 WPM
 * - hard (difícil): 25 WPM
 * - expert (expert): 20 WPM
 * 
 * MODIFICADORES (reduzem o WPM):
 * - Tem números: -15%
 * - Tem símbolos: -20%
 * - Texto muito longo (mais de 200 chars): -10%
 * 
 * EXEMPLO DE USO:
 * const wpm = estimateWPM('function soma(a, b) { return a + b; }', 'medium')
 * console.log(wpm) // Aproximadamente 23 WPM
 * // (35 base - 15% por números - 20% por símbolos = ~23)
 * 
 * QUANDO USAR:
 * - Ao adicionar novos textos ao sistema
 * - Para mostrar expectativas ao usuário
 * - Para calcular tempo estimado de exercício
 */
export const estimateWPM = (text: string, difficulty: string): number => {
  // WPM base para cada nível de dificuldade
  const baseWPM = {
    easy: 45,      // Textos simples: "O gato subiu no telhado"
    medium: 35,    // Textos normais: "A programação é uma arte"
    hard: 25,      // Textos técnicos: "function calculateAverage()"
    expert: 20     // Textos muito técnicos: "RegEx: /^[a-zA-Z0-9._%+-]+@/"
  }
  
  // Analisa o texto para ver suas características
  const analysis = analyzeText(text)
  let wpmModifier = 1  // Começa com 100% (sem modificação)
  
  // MODIFICADOR: Números tornam a digitação mais lenta
  // Porque números exigem mais atenção e são menos naturais
  if (analysis.hasNumbers) wpmModifier -= 0.15  // -15%
  
  // MODIFICADOR: Símbolos tornam a digitação muito mais lenta
  // Porque exigem teclas especiais e quebram o ritmo
  if (analysis.hasSymbols) wpmModifier -= 0.20   // -20%
  
  // MODIFICADOR: Textos longos cansam o usuário
  // Depois de muito tempo digitando, a velocidade diminui
  if (analysis.characterCount > 200) wpmModifier -= 0.10  // -10%
  
  // Calcula o WPM final e arredonda para número inteiro
  const finalWPM = (baseWPM[difficulty as keyof typeof baseWPM] || 30) * wpmModifier
  return Math.round(finalWPM)
}
