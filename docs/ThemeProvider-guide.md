# 🎨 Documentação do ThemeProvider

## 📖 O que é o ThemeProvider?

O `ThemeProvider` é o **sistema de gerenciamento de temas** da aplicação. Ele permite alternar entre tema claro e escuro, salvando a preferência do usuário e detectando automaticamente o tema preferido do sistema operacional.

**🎯 Função Principal**: Controlar a aparência visual de toda a aplicação (claro/escuro)

---

## 🔧 Como Funciona?

### 🧠 **Lógica Central**
```typescript
// O ThemeProvider cria um "contexto" que pode ser usado em qualquer lugar da aplicação
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',        // Tema atual: 'light' ou 'dark'
  toggleTheme: () => {} // Função para alternar o tema
})
```

### 💾 **Salvamento Automático**
- Salva a escolha do usuário no `localStorage`
- Na primeira visita, detecta automaticamente o tema preferido do sistema
- Mantém a preferência entre sessões do browser

### 🎛️ **Aplicação do Tema**
- Adiciona/remove a classe `dark` no elemento HTML principal
- O Tailwind CSS usa essa classe para aplicar os estilos correspondentes

---

## 📋 Interface e Tipos

### 🔗 **ThemeContextProps**
```typescript
interface ThemeContextProps {
  theme: 'light' | 'dark'  // Tema atual ativo
  toggleTheme: () => void  // Função para alternar tema
}
```

### 🎣 **Hook useTheme**
```typescript
// Hook personalizado para acessar o tema em qualquer componente
export function useTheme() {
  return useContext(ThemeContext)
}
```

---

## 🚀 Como Usar

### 📱 **1. Setup Inicial (já configurado)**
```typescript
// No layout.tsx - envolve toda a aplicação
<ThemeProvider>
  <Navigation />
  <main>{children}</main>
  <Footer />
</ThemeProvider>
```

### 🎨 **2. Usando o Hook em Componentes**
```typescript
import { useTheme } from '@/app/components/ThemeProvider'

function MeuComponente() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <div>
      <p>Tema atual: {theme}</p>
      <button onClick={toggleTheme}>
        {theme === 'dark' ? '☀️ Claro' : '🌙 Escuro'}
      </button>
    </div>
  )
}
```

### 🎯 **3. Estilização Condicional**
```typescript
function ComponenteComTema() {
  const { theme } = useTheme()
  
  return (
    <div className={`
      p-4 rounded-lg transition-colors
      ${theme === 'dark' 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900'
      }
    `}>
      <h2>Meu conteúdo aqui</h2>
    </div>
  )
}
```

---

## 🔄 Fluxo de Execução

### 🚀 **Inicialização**
1. **Verifica localStorage** → Tem tema salvo?
2. **Se não tem** → Detecta preferência do sistema (`prefers-color-scheme`)
3. **Define tema inicial** → 'dark' ou 'light'
4. **Aplica no HTML** → Adiciona/remove classe 'dark'

### 🎛️ **Alteração de Tema**
1. **Usuário clica** no botão de alternar
2. **toggleTheme()** é executado
3. **Estado é atualizado** → 'dark' ↔ 'light'
4. **useEffect dispara** → Atualiza classe HTML
5. **localStorage é atualizado** → Salva nova preferência

### 🔄 **Ciclo de Vida**
```
Carregamento → Detecção → Aplicação → Uso → Alteração → Salvamento
     ↓            ↓          ↓       ↓        ↓           ↓
  Página       Sistema/   Classe   Hook    Toggle    localStorage
  carrega      Storage    'dark'   usado   clicado      atualizado
```

---

## 🛠️ Detalhes Técnicos

### 💾 **Gerenciamento de Estado**
```typescript
// Estado principal do tema
const [theme, setTheme] = useState<'light' | 'dark'>(() => {
  // Função de inicialização - roda apenas uma vez
  if (typeof window !== 'undefined') {
    // 1. Tenta buscar do localStorage
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    
    // 2. Se não tem, detecta preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }
  
  // 3. Fallback para servidor (SSR)
  return 'dark'
})
```

### 🎨 **Aplicação Visual**
```typescript
useEffect(() => {
  const root = window.document.documentElement // <html>
  
  if (theme === 'dark') {
    root.classList.add('dark')      // <html class="dark">
    localStorage.setItem('theme', 'dark')
  } else {
    root.classList.remove('dark')   // <html class="">
    localStorage.setItem('theme', 'light')
  }
}, [theme]) // Executa sempre que 'theme' muda
```

### 🔄 **Função de Alternância**
```typescript
function toggleTheme() {
  setTheme(currentTheme => {
    // Se atual é 'dark', vira 'light'
    // Se atual é 'light', vira 'dark'
    return currentTheme === 'dark' ? 'light' : 'dark'
  })
}
```

---

## 🎨 Trabalhando com Estilos

### 🌈 **Classes do Tailwind CSS**
```typescript
// ✅ Jeito recomendado - usar classes dark: do Tailwind
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-blue-600 dark:text-blue-400">Título</h1>
  <p className="text-gray-600 dark:text-gray-300">Parágrafo</p>
</div>

// ⚠️ Alternativa - estilização manual (menos recomendado)
const { theme } = useTheme()
<div className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
  Conteúdo
</div>
```

### 🎯 **Padrões de Design**
```typescript
// Cores principais por tema
const themeColors = {
  light: {
    background: 'bg-white',
    text: 'text-gray-900',
    accent: 'text-blue-600',
    border: 'border-gray-200'
  },
  dark: {
    background: 'bg-gray-900',
    text: 'text-white',
    accent: 'text-blue-400', 
    border: 'border-gray-700'
  }
}
```

---

## 🔧 Exemplos Práticos

### 🎛️ **Botão de Alternar Tema**
```typescript
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button 
      onClick={toggleTheme}
      className="
        p-2 rounded-lg transition-all duration-200
        bg-gray-100 hover:bg-gray-200 
        dark:bg-gray-800 dark:hover:bg-gray-700
        text-gray-900 dark:text-white
      "
      aria-label={`Alternar para tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
    >
      {theme === 'dark' ? (
        <span className="flex items-center gap-2">
          ☀️ <span>Claro</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          🌙 <span>Escuro</span>
        </span>
      )}
    </button>
  )
}
```

### 🎨 **Card Responsivo ao Tema**
```typescript
function ThemedCard({ title, content }: { title: string, content: string }) {
  return (
    <div className="
      p-6 rounded-xl shadow-lg transition-all duration-300
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      hover:shadow-xl dark:hover:shadow-2xl
    ">
      <h3 className="
        text-xl font-bold mb-3
        text-gray-900 dark:text-white
      ">
        {title}
      </h3>
      <p className="
        text-gray-600 dark:text-gray-300
        leading-relaxed
      ">
        {content}
      </p>
    </div>
  )
}
```

### 📊 **Indicador Visual do Tema**
```typescript
function ThemeIndicator() {
  const { theme } = useTheme()
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`
        w-3 h-3 rounded-full 
        ${theme === 'dark' ? 'bg-purple-500' : 'bg-yellow-500'}
      `} />
      <span className="text-gray-600 dark:text-gray-400">
        Tema {theme === 'dark' ? 'Escuro' : 'Claro'} ativo
      </span>
    </div>
  )
}
```

---

## ⚠️ Coisas Importantes

### ✅ **Boas Práticas**
- **Sempre use o hook `useTheme()`** em vez de acessar o contexto diretamente
- **Prefira classes `dark:` do Tailwind** em vez de lógica condicional
- **Teste ambos os temas** ao desenvolver novos componentes
- **Use transições** para mudanças suaves: `transition-colors duration-200`

### 🚨 **Evite**
```typescript
// ❌ Não acesse o contexto diretamente
const context = useContext(ThemeContext)

// ❌ Não assuma que o tema estará sempre disponível
// const { theme } = useTheme() // Pode ser undefined!

// ✅ Sempre forneça fallbacks
const { theme = 'dark' } = useTheme()
```

### 🎯 **Troubleshooting**
- **Tema não muda?** → Verifique se o ThemeProvider está envolvendo o componente
- **Preferência não salva?** → Confirme se localStorage está disponível
- **Estilos não aplicam?** → Verifique se as classes `dark:` estão corretas

---

## 📱 Compatibilidade

### 🌐 **Suporte a Browsers**
- ✅ Chrome/Edge (moderno)
- ✅ Firefox 
- ✅ Safari
- ✅ Mobile browsers

### 📋 **Detecção de Sistema**
- ✅ Windows (tema claro/escuro)
- ✅ macOS (tema claro/escuro)
- ✅ Linux (dependente do desktop)
- ✅ Android/iOS (tema do sistema)

---

**💡 Dica Final**: O ThemeProvider é a base do visual da aplicação. Uma vez configurado, todos os outros componentes podem usar o hook `useTheme()` para se adaptar automaticamente ao tema escolhido!
