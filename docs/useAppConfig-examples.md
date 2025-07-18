# 🎯 Guia Prático do useAppConfig

## 📖 Como Usar o Hook de Configuração

O `useAppConfig` é o seu "controle remoto" para todas as configurações da aplicação. Este guia mostra exemplos práticos de como usar em situações reais.

---

## 🚀 Exemplos Básicos de Uso

### 📱 Importando o Hook
```typescript
import { useAppConfig } from '@/hooks/useAppConfig'

function MeuComponente() {
  const { config, get, set, isFeatureEnabled } = useAppConfig()
  
  // Seu código aqui...
}
```

### 🔍 Acessando Configurações
```typescript
function ConfigDisplay() {
  const { get } = useAppConfig()
  
  // Buscar configurações específicas
  const appName = get('app.name')                    // "DigiteMais"
  const testDuration = get('defaults.testDuration')  // 60
  const fontSize = get('defaults.fontSize')          // 1.0
  const apiUrl = get('api.baseUrl')                  // "https://api.digitemais.click"
  
  return (
    <div>
      <h1>{appName}</h1>
      <p>Duração padrão: {testDuration}s</p>
      <p>Tamanho da fonte: {fontSize}</p>
    </div>
  )
}
```

### ✏️ Atualizando Configurações
```typescript
function ConfigEditor() {
  const { get, set } = useAppConfig()
  
  const handleFontSizeChange = (newSize: number) => {
    set('defaults.fontSize', newSize)
  }
  
  const handleDurationChange = (newDuration: number) => {
    set('defaults.testDuration', newDuration)
  }
  
  return (
    <div>
      <input 
        type="range" 
        min="0.8" 
        max="2.0" 
        step="0.1"
        value={get('defaults.fontSize')}
        onChange={(e) => handleFontSizeChange(Number(e.target.value))}
      />
      
      <select 
        value={get('defaults.testDuration')}
        onChange={(e) => handleDurationChange(Number(e.target.value))}
      >
        <option value={30}>30 segundos</option>
        <option value={60}>1 minuto</option>
        <option value={120}>2 minutos</option>
      </select>
    </div>
  )
}
```

---

## 🎮 Casos de Uso Reais

### 🔊 Sistema de Som Condicional
```typescript
function AudioControls() {
  const { isFeatureEnabled, get } = useAppConfig()
  
  // Só mostra controles se som estiver habilitado
  if (!isFeatureEnabled('sound')) {
    return null
  }
  
  const errorSoundUrl = get('features.sound.errorSoundUrl')
  
  const playErrorSound = () => {
    const audio = new Audio(errorSoundUrl)
    audio.play().catch(console.error)
  }
  
  return (
    <div>
      <button onClick={playErrorSound}>
        🔊 Testar Som de Erro
      </button>
    </div>
  )
}
```

### 💎 Bloqueio de Conteúdo Premium
```typescript
function CategoryCard({ category }: { category: Category }) {
  const { isPremiumCategory } = useAppConfig()
  const [userIsPremium, setUserIsPremium] = useState(false) // Vem do contexto do usuário
  
  const isLocked = isPremiumCategory(category.id) && !userIsPremium
  
  return (
    <div className={`category-card ${isLocked ? 'locked' : ''}`}>
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      
      {isLocked && (
        <div className="premium-overlay">
          <span>🔒</span>
          <p>Conteúdo Premium</p>
          <button>Fazer Upgrade</button>
        </div>
      )}
      
      {!isLocked && (
        <button onClick={() => navigateToCategory(category.id)}>
          Acessar Categoria
        </button>
      )}
    </div>
  )
}
```

### 🎨 Seletor de Tema Dinâmico
```typescript
function ThemeSelector() {
  const { get, set, isValidTheme } = useAppConfig()
  
  const currentTheme = get('themes.default', 'light')
  const availableThemes = get('themes.available', ['light', 'dark'])
  
  const handleThemeChange = (newTheme: string) => {
    if (isValidTheme(newTheme)) {
      set('themes.default', newTheme)
      // Aplicar tema na interface
      document.documentElement.className = newTheme
    } else {
      alert(`Tema "${newTheme}" não está disponível`)
    }
  }
  
  return (
    <div className="theme-selector">
      <h3>Escolher Tema</h3>
      {availableThemes.map(theme => (
        <button
          key={theme}
          className={currentTheme === theme ? 'active' : ''}
          onClick={() => handleThemeChange(theme)}
        >
          {theme.charAt(0).toUpperCase() + theme.slice(1)}
        </button>
      ))}
    </div>
  )
}
```

### 📊 Painel de Configurações Avançado
```typescript
function AdvancedSettings() {
  const { get, set, reset, isWithinLimits } = useAppConfig()
  
  const [tempFontSize, setTempFontSize] = useState(get('defaults.fontSize'))
  const [tempDuration, setTempDuration] = useState(get('defaults.testDuration'))
  
  const handleSave = () => {
    // Validar antes de salvar
    if (isWithinLimits('fontSize', tempFontSize)) {
      set('defaults.fontSize', tempFontSize)
    } else {
      alert('Tamanho de fonte fora dos limites permitidos')
      return
    }
    
    if (tempDuration > 0) {
      set('defaults.testDuration', tempDuration)
    } else {
      alert('Duração deve ser maior que zero')
      return
    }
    
    alert('Configurações salvas com sucesso!')
  }
  
  const handleReset = () => {
    if (confirm('Tem certeza que deseja restaurar todas as configurações?')) {
      reset()
      setTempFontSize(get('defaults.fontSize'))
      setTempDuration(get('defaults.testDuration'))
    }
  }
  
  return (
    <div className="advanced-settings">
      <h2>Configurações Avançadas</h2>
      
      <div className="setting-group">
        <label>Tamanho da Fonte</label>
        <input
          type="range"
          min={get('limits.minFontSize')}
          max={get('limits.maxFontSize')}
          step="0.1"
          value={tempFontSize}
          onChange={(e) => setTempFontSize(Number(e.target.value))}
        />
        <span>{Math.round(tempFontSize * 100)}%</span>
      </div>
      
      <div className="setting-group">
        <label>Duração do Teste (segundos)</label>
        <input
          type="number"
          min="10"
          max="300"
          value={tempDuration}
          onChange={(e) => setTempDuration(Number(e.target.value))}
        />
      </div>
      
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={get('defaults.showErrors')}
            onChange={(e) => set('defaults.showErrors', e.target.checked)}
          />
          Mostrar erros durante digitação
        </label>
      </div>
      
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={get('defaults.colorFeedback')}
            onChange={(e) => set('defaults.colorFeedback', e.target.checked)}
          />
          Feedback visual colorido
        </label>
      </div>
      
      <div className="actions">
        <button onClick={handleSave} className="btn-primary">
          Salvar Configurações
        </button>
        <button onClick={handleReset} className="btn-secondary">
          Restaurar Padrões
        </button>
      </div>
    </div>
  )
}
```

### 🌐 Cliente de API Inteligente
```typescript
function ApiClient() {
  const { getApiUrl } = useAppConfig()
  
  const fetchTexts = async () => {
    try {
      const url = getApiUrl('texts')  // https://api.digitemais.click/texts
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar textos:', error)
    }
  }
  
  const saveResult = async (result: TypingResult) => {
    try {
      const url = getApiUrl('results')  // https://api.digitemais.click/results
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      })
      return await response.json()
    } catch (error) {
      console.error('Erro ao salvar resultado:', error)
    }
  }
  
  const getUserData = async (userId: string) => {
    try {
      const url = `${getApiUrl('user')}/${userId}`  // https://api.digitemais.click/user/123
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error)
    }
  }
  
  return {
    fetchTexts,
    saveResult,
    getUserData
  }
}
```

### 📱 Componente Responsivo Baseado em Configuração
```typescript
function ResponsiveTextDisplay() {
  const { get } = useAppConfig()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Ajustar configurações baseado no dispositivo
  const fontSize = isMobile 
    ? get('defaults.fontSize') * 1.2  // Fonte maior no mobile
    : get('defaults.fontSize')
  
  const maxResults = isMobile
    ? 2  // Menos resultados no mobile
    : get('limits.maxDisplayResults')
  
  const testDuration = isMobile
    ? Math.min(get('defaults.testDuration'), 60)  // Máximo 1 minuto no mobile
    : get('defaults.testDuration')
  
  return (
    <div className="responsive-display">
      <div style={{ fontSize: `${fontSize}rem` }}>
        <h2>Teste de Digitação</h2>
        <p>Duração: {testDuration}s</p>
        <p>Resultados exibidos: {maxResults}</p>
      </div>
    </div>
  )
}
```

### 🔄 Migração de Configurações
```typescript
function ConfigMigration() {
  const { get, set, config } = useAppConfig()
  
  useEffect(() => {
    const migrateOldConfigs = () => {
      // Verificar se precisa migrar configurações antigas
      const version = get('app.version', '0.0.0')
      
      if (version < '1.0.0') {
        // Migrar configurações antigas
        const oldFontSize = localStorage.getItem('fontSize')
        if (oldFontSize) {
          set('defaults.fontSize', Number(oldFontSize))
          localStorage.removeItem('fontSize')
        }
        
        const oldTheme = localStorage.getItem('theme')
        if (oldTheme) {
          set('themes.default', oldTheme)
          localStorage.removeItem('theme')
        }
        
        // Atualizar versão
        set('app.version', '1.0.0')
        console.log('Configurações migradas para v1.0.0')
      }
    }
    
    migrateOldConfigs()
  }, [get, set])
  
  return null // Componente só executa migração
}
```

---

## 🎯 Dicas e Melhores Práticas

### ✅ **Faça**
```typescript
// ✅ Use valores padrão sempre
const duration = get('defaults.testDuration', 60)

// ✅ Valide antes de atualizar
if (isWithinLimits('fontSize', newSize)) {
  set('defaults.fontSize', newSize)
}

// ✅ Use funções específicas para verificações
const isPremium = isFeatureEnabled('premium')
const needsUpgrade = isPremiumCategory('programacao')
```

### ❌ **Não Faça**
```typescript
// ❌ Nunca assuma que a configuração existe
const duration = config.defaults.testDuration  // Pode gerar erro!

// ❌ Não atualize sem validar
set('defaults.fontSize', 999)  // Valor inválido!

// ❌ Não acesse config diretamente para verificações
const isPremium = config.features.premium.enabled  // Use isFeatureEnabled()
```

### 🔧 **Debugging**
```typescript
function DebugConfig() {
  const { config, get } = useAppConfig()
  
  // Inspecionar configuração específica
  console.log('Duração atual:', get('defaults.testDuration'))
  
  // Inspecionar toda a configuração
  console.log('Config completa:', config)
  
  // Verificar se path existe
  const value = get('caminho.inexistente', 'PADRÃO')
  console.log('Valor:', value)  // "PADRÃO"
  
  return <div>Veja o console para debug</div>
}
```

---

## 🚨 Tratamento de Erros

### 🛡️ Configurações Seguras
```typescript
function SafeConfig() {
  const { get, set, isWithinLimits } = useAppConfig()
  
  const updateFontSizeeSafely = (newSize: number) => {
    // Múltiplas validações
    if (typeof newSize !== 'number') {
      console.error('Tamanho deve ser um número')
      return false
    }
    
    if (!isWithinLimits('fontSize', newSize)) {
      console.error('Tamanho fora dos limites')
      return false
    }
    
    if (newSize <= 0) {
      console.error('Tamanho deve ser positivo')
      return false
    }
    
    // Só atualiza se passou em todas as validações
    set('defaults.fontSize', newSize)
    return true
  }
  
  // Uso com tratamento de erro
  const handleSliderChange = (value: string) => {
    const success = updateFontSizeeSafely(Number(value))
    if (!success) {
      alert('Valor inválido para tamanho da fonte')
    }
  }
}
```

---

**💡 Dica Final**: O `useAppConfig` é o seu "painel de controle" universal. Use-o sempre que precisar acessar ou modificar qualquer configuração da aplicação!
