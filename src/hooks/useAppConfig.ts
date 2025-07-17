/**
 * Hook para gerenciar configurações da aplicação VelocType
 * 
 * Este hook é o "centro de controle" de todas as configurações da aplicação.
 * Ele carrega as configurações do arquivo app-config.json e fornece funções
 * para acessar e modificar essas configurações de forma segura.
 * 
 * COMO FUNCIONA:
 * - Carrega configurações na inicialização
 * - Permite acessar qualquer configuração por path (ex: "defaults.fontSize")
 * - Fornece funções para atualizar configurações
 * - Valida tipos e limites antes de aplicar mudanças
 * 
 * QUANDO USAR:
 * - Para acessar configurações em qualquer componente
 * - Para alterar configurações baseado em preferências do usuário
 * - Para verificar se features estão habilitadas
 * - Para obter limites e valores padrão
 */

import { useState, useEffect, useCallback } from 'react'
import appConfigData from '../config/app-config.json'

/**
 * INTERFACE: AppConfig
 * 
 * Define a estrutura completa do arquivo de configuração.
 * Cada seção tem um propósito específico e controla diferentes aspectos da aplicação.
 */
export interface AppConfig {
  app: {
    name: string                    // Nome da aplicação: "VelocType"
    version: string                 // Versão atual: "1.0.0"
    description: string             // Descrição para SEO
  }
  features: {
    premium: {
      enabled: boolean              // Se sistema premium está ativo
      categories: string[]          // Categorias que exigem premium
      features: string[]            // Recursos exclusivos premium
    }
    sound: {
      enabled: boolean              // Se sons estão habilitados globalmente
      errorSoundUrl: string         // URL do som de erro de digitação
    }
    themes: {
      default: string               // Tema padrão: "light", "dark", etc.
      available: string[]           // Lista de temas disponíveis
    }
  }
  defaults: {
    testDuration: number            // Duração padrão dos testes (segundos)
    fontSize: number                // Tamanho da fonte padrão (1.0 = 100%)
    showErrors: boolean             // Mostrar erros durante digitação
    colorFeedback: boolean          // Feedback visual colorido
    soundFeedback: boolean          // Feedback sonoro ativo
    autoFocus: boolean              // Focar automaticamente no campo
  }
  limits: {
    maxLocalResults: number         // Máximo de resultados no localStorage
    maxDisplayResults: number       // Quantos resultados mostrar na UI
    minFontSize: number             // Menor tamanho de fonte permitido
    maxFontSize: number             // Maior tamanho de fonte permitido
    maxTextLength: number           // Máximo de caracteres por texto
  }
  api: {
    baseUrl: string                 // URL base da API externa
    endpoints: {
      texts: string                 // Endpoint para textos
      categories: string            // Endpoint para categorias
      results: string               // Endpoint para resultados
      user: string                  // Endpoint para dados do usuário
    }
  }
  database: {
    migration: {
      enabled: boolean              // Se migrações automáticas estão ativas
      backupLocal: boolean          // Se deve fazer backup antes de migrar
      syncOnLoad: boolean           // Se deve sincronizar ao carregar
    }
  }
}

/**
 * INTERFACE: UseAppConfigReturn
 * 
 * Define tudo que o hook retorna para os componentes.
 * É como um "manual de instruções" de tudo que você pode fazer.
 */
interface UseAppConfigReturn {
  config: AppConfig                              // Objeto com todas as configurações
  loading: boolean                               // Se ainda está carregando
  
  // FUNÇÕES DE ACESSO:
  get: <T>(path: string, defaultValue?: T) => T  // Busca configuração por path
  
  // FUNÇÕES DE ATUALIZAÇÃO:
  set: (path: string, value: any) => void        // Atualiza configuração
  reset: () => void                              // Reseta para padrão
  
  // FUNÇÕES DE VALIDAÇÃO:
  isFeatureEnabled: (feature: string) => boolean // Verifica se feature está ativa
  isPremiumCategory: (categoryId: string) => boolean // Verifica se categoria é premium
  isValidTheme: (theme: string) => boolean       // Verifica se tema é válido
  
  // FUNÇÕES UTILITÁRIAS:
  getApiUrl: (endpoint: string) => string        // Monta URL completa da API
  isWithinLimits: (key: string, value: number) => boolean // Verifica limites
}

/**
 * HOOK PRINCIPAL: useAppConfig
 * 
 * Este é o hook que você vai usar nos componentes para acessar configurações.
 * Ele fornece acesso seguro a todas as configurações da aplicação.
 * 
 * EXEMPLO DE USO:
 * const { config, get, set, isFeatureEnabled } = useAppConfig()
 * 
 * // Acessar configuração
 * const duration = get('defaults.testDuration') // 60
 * 
 * // Verificar feature
 * const isPremiumActive = isFeatureEnabled('premium') // true/false
 * 
 * // Atualizar configuração
 * set('defaults.fontSize', 1.2)
 */
export const useAppConfig = (): UseAppConfigReturn => {
  // ESTADO: Configurações carregadas na memória
  const [config, setConfig] = useState<AppConfig>(appConfigData as AppConfig)
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * FUNÇÃO: get
   * 
   * Busca uma configuração específica usando um "caminho" (path).
   * O path é como um endereço dentro do objeto de configuração.
   * 
   * EXEMPLOS DE USO:
   * const appName = get('app.name')                    // "VelocType"
   * const duration = get('defaults.testDuration')      // 60
   * const isPremium = get('features.premium.enabled')  // true
   * const apiUrl = get('api.baseUrl')                  // "https://api.veloctype.com"
   * 
   * PARÂMETROS:
   * - path: Caminho para a configuração (ex: "defaults.fontSize")
   * - defaultValue: Valor retornado se a configuração não existir
   * 
   * RETORNA:
   * - O valor da configuração ou defaultValue
   */
  const get = useCallback(<T>(path: string, defaultValue?: T): T => {
    try {
      // Divide o path em partes: "defaults.fontSize" -> ["defaults", "fontSize"]
      const keys = path.split('.')
      let result: any = config
      
      // Navega pelo objeto seguindo o path
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key]
        } else {
          // Se não encontrou, retorna o valor padrão
          return defaultValue as T
        }
      }
      
      return result as T
    } catch (error) {
      console.warn(`Erro ao acessar configuração: ${path}`, error)
      return defaultValue as T
    }
  }, [config])

  /**
   * FUNÇÃO: set
   * 
   * Atualiza uma configuração específica usando um path.
   * Valida o valor antes de aplicar para evitar configurações inválidas.
   * 
   * EXEMPLOS DE USO:
   * set('defaults.testDuration', 120)              // Muda duração para 2 minutos
   * set('defaults.fontSize', 1.5)                  // Aumenta fonte em 50%
   * set('features.premium.enabled', false)         // Desabilita premium
   * set('themes.default', 'dark')                  // Muda tema padrão
   * 
   * VALIDAÇÕES AUTOMÁTICAS:
   * - Tamanho de fonte entre minFontSize e maxFontSize
   * - Duração de teste deve ser número positivo
   * - Temas devem estar na lista de disponíveis
   * 
   * PARÂMETROS:
   * - path: Caminho para a configuração
   * - value: Novo valor a ser definido
   */
  const set = useCallback((path: string, value: any): void => {
    try {
      // VALIDAÇÕES ESPECÍFICAS baseadas no path
      if (path === 'defaults.fontSize') {
        const min = get('limits.minFontSize', 0.8)
        const max = get('limits.maxFontSize', 2.0)
        if (value < min || value > max) {
          console.warn(`Tamanho de fonte deve estar entre ${min} e ${max}`)
          return
        }
      }
      
      if (path === 'defaults.testDuration') {
        if (value <= 0 || !Number.isInteger(value)) {
          console.warn('Duração do teste deve ser um número inteiro positivo')
          return
        }
      }
      
      if (path === 'themes.default') {
        const availableThemes = get('themes.available', [] as string[])
        if (!availableThemes.includes(value)) {
          console.warn(`Tema "${value}" não está disponível. Temas: ${availableThemes.join(', ')}`)
          return
        }
      }
      
      // Atualiza a configuração
      setConfig(prevConfig => {
        const newConfig = { ...prevConfig }
        const keys = path.split('.')
        let current: any = newConfig
        
        // Navega até o penúltimo nível
        for (let i = 0; i < keys.length - 1; i++) {
          if (!(keys[i] in current)) {
            current[keys[i]] = {}
          }
          current = current[keys[i]]
        }
        
        // Define o valor no último nível
        current[keys[keys.length - 1]] = value
        
        return newConfig
      })
      
      console.log(`Configuração atualizada: ${path} = ${value}`)
    } catch (error) {
      console.error(`Erro ao atualizar configuração: ${path}`, error)
    }
  }, [config, get])

  /**
   * FUNÇÃO: reset
   * 
   * Reseta todas as configurações para os valores padrão originais.
   * Útil para botão "Restaurar Padrões" na interface.
   * 
   * EXEMPLO DE USO:
   * reset() // Volta tudo para como estava originalmente
   */
  const reset = useCallback((): void => {
    setConfig(appConfigData as AppConfig)
    console.log('Configurações resetadas para padrão')
  }, [])

  /**
   * FUNÇÃO: isFeatureEnabled
   * 
   * Verifica se uma feature específica está habilitada.
   * Usado para mostrar/esconder funcionalidades na interface.
   * 
   * EXEMPLOS DE USO:
   * const canPlaySounds = isFeatureEnabled('sound')        // true/false
   * const hasPremium = isFeatureEnabled('premium')         // true/false
   * 
   * USO EM COMPONENTES:
   * {isFeatureEnabled('sound') && (
   *   <button onClick={playErrorSound}>🔊</button>
   * )}
   */
  const isFeatureEnabled = useCallback((feature: string): boolean => {
    switch (feature) {
      case 'premium':
        return get('features.premium.enabled', false)
      case 'sound':
        return get('features.sound.enabled', false)
      default:
        return get(`features.${feature}.enabled`, false)
    }
  }, [get])

  /**
   * FUNÇÃO: isPremiumCategory
   * 
   * Verifica se uma categoria específica exige assinatura premium.
   * Usado para bloquear acesso a categorias pagas.
   * 
   * EXEMPLOS DE USO:
   * const needsPremium = isPremiumCategory('programacao')   // true/false
   * const needsPremium = isPremiumCategory('literatura')    // false (gratuita)
   * 
   * USO EM COMPONENTES:
   * {isPremiumCategory(category.id) && !userIsPremium && (
   *   <div className="premium-lock">🔒 Premium</div>
   * )}
   */
  const isPremiumCategory = useCallback((categoryId: string): boolean => {
    if (!isFeatureEnabled('premium')) return false
    
    const premiumCategories = get('features.premium.categories', [] as string[])
    return premiumCategories.includes(categoryId)
  }, [get, isFeatureEnabled])

  /**
   * FUNÇÃO: isValidTheme
   * 
   * Verifica se um tema está na lista de temas disponíveis.
   * Usado para validar antes de aplicar um tema.
   * 
   * EXEMPLOS DE USO:
   * const canUseTheme = isValidTheme('dark')       // true
   * const canUseTheme = isValidTheme('rainbow')    // false (não existe)
   */
  const isValidTheme = useCallback((theme: string): boolean => {
    const availableThemes = get('themes.available', [] as string[])
    return availableThemes.includes(theme)
  }, [get])

  /**
   * FUNÇÃO: getApiUrl
   * 
   * Monta a URL completa para chamadas de API.
   * Combina a baseUrl com o endpoint específico.
   * 
   * EXEMPLOS DE USO:
   * const textsUrl = getApiUrl('texts')        // "https://api.veloctype.com/texts"
   * const userUrl = getApiUrl('user')          // "https://api.veloctype.com/user"
   * 
   * USO EM FETCH:
   * const response = await fetch(getApiUrl('texts'))
   */
  const getApiUrl = useCallback((endpoint: string): string => {
    const baseUrl = get('api.baseUrl', 'https://api.veloctype.com')
    const endpointPath = get(`api.endpoints.${endpoint}`, `/${endpoint}`)
    
    // Remove barra dupla se baseUrl já termina com /
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    const cleanEndpoint = endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}`
    
    return `${cleanBaseUrl}${cleanEndpoint}`
  }, [get])

  /**
   * FUNÇÃO: isWithinLimits
   * 
   * Verifica se um valor numérico está dentro dos limites permitidos.
   * Usado para validar antes de aplicar configurações.
   * 
   * EXEMPLOS DE USO:
   * const validSize = isWithinLimits('fontSize', 1.5)     // true (entre 0.8 e 2.0)
   * const validSize = isWithinLimits('fontSize', 3.0)     // false (maior que 2.0)
   */
  const isWithinLimits = useCallback((key: string, value: number): boolean => {
    switch (key) {
      case 'fontSize':
        const minFont = get('limits.minFontSize', 0.8)
        const maxFont = get('limits.maxFontSize', 2.0)
        return value >= minFont && value <= maxFont
      
      case 'textLength':
        const maxLength = get('limits.maxTextLength', 500)
        return value <= maxLength
      
      case 'displayResults':
        const maxDisplay = get('limits.maxDisplayResults', 4)
        return value <= maxDisplay
      
      default:
        return true // Se não há limite específico, aceita qualquer valor
    }
  }, [get])

  // EFEITO: Carregamento inicial
  useEffect(() => {
    // Aqui poderia carregar configurações de servidor ou localStorage
    // Por enquanto, apenas marca como carregado
    setLoading(false)
  }, [])

  // RETORNO DO HOOK
  // Tudo que fica disponível para os componentes
  return {
    config,                    // Objeto completo de configurações
    loading,                   // Estado de carregamento
    get,                       // Função para acessar configurações
    set,                       // Função para atualizar configurações
    reset,                     // Função para resetar para padrão
    isFeatureEnabled,          // Verificar se feature está ativa
    isPremiumCategory,         // Verificar se categoria é premium
    isValidTheme,              // Verificar se tema é válido
    getApiUrl,                 // Montar URLs da API
    isWithinLimits            // Verificar limites numéricos
  }
}

/**
 * FUNÇÕES UTILITÁRIAS EXPORTADAS
 * 
 * Funções que podem ser usadas fora de componentes React,
 * como em arquivos de configuração ou utilitários.
 */

/**
 * Obtém configuração estática (sem hook)
 * Útil para usar fora de componentes React
 */
export const getStaticConfig = <T>(path: string, defaultValue?: T): T => {
  try {
    const keys = path.split('.')
    let result: any = appConfigData
    
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key]
      } else {
        return defaultValue as T
      }
    }
    
    return result as T
  } catch (error) {
    console.warn(`Erro ao acessar configuração estática: ${path}`, error)
    return defaultValue as T
  }
}

/**
 * Verifica se ambiente é de desenvolvimento
 * Baseado na URL da API configurada
 */
export const isDevelopment = (): boolean => {
  const apiUrl = getStaticConfig('api.baseUrl', '')
  return apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1')
}

/**
 * Verifica se ambiente é de produção
 */
export const isProduction = (): boolean => {
  return !isDevelopment()
}
