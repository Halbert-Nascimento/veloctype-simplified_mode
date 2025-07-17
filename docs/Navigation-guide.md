# 🧭 Documentação do Navigation

## 📖 O que é o Navigation?

O `Navigation` é a **barra de navegação principal** da aplicação. É um componente fixo que aparece no topo de todas as páginas, fornecendo acesso rápido aos principais recursos do VelocType e controle do tema visual.

**🎯 Função Principal**: Navegação entre páginas e controle do tema da aplicação

---

## 🔧 Como Funciona?

### 🧠 **Estrutura Principal**
```typescript
// O Navigation é um header fixo com três seções principais:
<header className="fixed w-full ...">
  <nav className="...">
    📍 Logo (esquerda)
    🔗 Menu Central (meio) 
    ⚙️ Ações (direita)
  </nav>
</header>
```

### 📱 **Responsividade**
- **Desktop**: Menu completo visível
- **Mobile**: Menu pode ser adaptado (hidden md:flex)
- **Fixo**: Sempre visível no topo (`fixed w-full`)

### 🎨 **Integração com Tema**
- Usa o `useTheme()` para controle de aparência
- Cores automáticas baseadas no tema ativo
- Botão animado para alternar tema

---

## 🎯 Recursos e Funcionalidades

### 🔗 **Sistema de Navegação**
```typescript
// Links principais da aplicação
const menuItems = [
  { href: '/', label: 'Início' },
  { href: '/treino', label: 'Praticar' },
  { href: '/estatisticas', label: 'Estatísticas' },
  { href: '/sobre', label: 'Sobre' }
]
```

### 🎨 **Indicação de Página Ativa**
```typescript
// Destaca o link da página atual
const pathname = usePathname()
const isActive = pathname === '/treino'

<Link className={`
  ${isActive 
    ? 'text-cyan-700 dark:text-cyan-300'    // Página ativa
    : 'text-[#1e293b] dark:text-white'      // Página inativa
  }
`}>
```

### 🌗 **Controle de Tema Animado**
```typescript
// Botão com animação de rotação
const [rotating, setRotating] = useState(false)

function handleToggle() {
  setRotating(true)      // Inicia animação
  toggleTheme()          // Muda o tema
  setTimeout(() => {
    setRotating(false)   // Para animação após 400ms
  }, 400)
}
```

---

## 🎨 Design e Estilização

### 🌈 **Esquema de Cores**
```typescript
// Cores por tema
const colors = {
  light: {
    background: '#f8fafc',     // Fundo claro
    text: '#1e293b',           // Texto escuro
    border: '#cbd5e1',         // Borda sutil
    accent: '#0891b2'          // Destaque (cyan)
  },
  dark: {
    background: '#162032',     // Fundo escuro
    text: 'white',             // Texto claro
    border: '#1e293b',         // Borda escura
    accent: '#67e8f9'          // Destaque claro (cyan)
  }
}
```

### 📱 **Layout Responsivo**
```typescript
// Estrutura do layout
<nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
  {/* 📍 Logo - sempre visível */}
  <div className="flex items-center gap-2">...</div>
  
  {/* 🔗 Menu - oculto em mobile */}
  <div className="hidden md:flex gap-6 mx-auto">...</div>
  
  {/* ⚙️ Ações - sempre visível */}
  <div className="flex items-center gap-4">...</div>
</nav>
```

### ✨ **Animações**
```css
/* Animação personalizada para o botão de tema */
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 0.4s linear;
}
```

---

## 🛠️ Componentes Internos

### 📍 **Logo (VelocType)**
```typescript
<Link href="/" className="flex items-center gap-2 text-2xl font-bold">
  <ComputerDesktopIcon className="w-7 h-7" />
  VelocType
</Link>
```
- **Ícone**: ComputerDesktopIcon (Heroicons)
- **Função**: Voltar para página inicial
- **Estilo**: Font bold, tamanho 2xl

### 🔗 **Menu de Navegação**
```typescript
{/* Cada link do menu */}
<Link 
  href="/treino" 
  className={`text-base font-medium transition-colors ${
    pathname === '/treino' 
      ? 'text-cyan-700 dark:text-cyan-300'     // Ativo
      : 'text-[#1e293b] dark:text-white'       // Inativo
  }`}
>
  Praticar
</Link>
```
- **Destaque Automático**: Página atual em cyan
- **Transições**: Smooth color transition
- **Responsivo**: Oculto em telas pequenas

### 🌗 **Botão de Tema**
```typescript
<button
  onClick={handleToggle}
  className={`p-2 rounded-lg border transition-colors ${
    rotating ? 'animate-spin-slow' : ''
  }`}
>
  {theme === 'dark' ? 
    <SunIcon className="w-5 h-5" /> : 
    <MoonIcon className="w-5 h-5" />
  }
</button>
```
- **Ícones**: SunIcon (claro) / MoonIcon (escuro)
- **Animação**: Rotação de 360° em 400ms
- **Estado**: Visual feedback durante mudança

---

## 🔄 Estados e Ciclo de Vida

### 🚀 **Inicialização**
```typescript
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)  // Indica que React foi montado
}, [])
```

### 🔄 **Fluxo de Navegação**
1. **Usuário clica** em um link do menu
2. **Next.js navega** para nova rota
3. **usePathname()** detecta mudança
4. **Link ativo** é atualizado automaticamente

### 🎨 **Fluxo de Mudança de Tema**
1. **Usuário clica** no botão de tema
2. **handleToggle()** é executado
3. **Animação inicia** (rotating = true)
4. **Tema é alterado** via ThemeProvider
5. **Ícone muda** (sun ↔ moon)
6. **Animação para** após 400ms

---

## 📋 Dependências

### 📦 **Imports Principais**
```typescript
import Link from 'next/link'                    // Navegação do Next.js
import { usePathname } from 'next/navigation'   // Detecção de rota atual
import { 
  ComputerDesktopIcon, 
  MoonIcon, 
  SunIcon 
} from '@heroicons/react/24/outline'            // Ícones
import { useTheme } from './ThemeProvider'      // Controle de tema
```

### 🔗 **Dependências Externas**
- **Next.js**: Sistema de roteamento
- **Heroicons**: Biblioteca de ícones
- **Tailwind CSS**: Estilização
- **React**: Hooks (useState, useEffect)

---

## 🚀 Exemplo de Uso

### 📱 **Integração no Layout**
```typescript
// Já configurado em layout.tsx
import Navigation from '@/app/components/Navigation'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <Navigation />      {/* Barra de navegação fixa */}
          <main className="pt-16">  {/* Margem para não sobrepor */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 🎯 **Personalização de Links**
```typescript
// Para adicionar novos links ao menu:
const menuItems = [
  { href: '/', label: 'Início' },
  { href: '/treino', label: 'Praticar' },
  { href: '/estatisticas', label: 'Estatísticas' },
  { href: '/sobre', label: 'Sobre' },
  // ✅ Novo link
  { href: '/ranking', label: 'Ranking' },
]

// No JSX:
{menuItems.map(item => (
  <Link 
    key={item.href}
    href={item.href} 
    className={`text-base font-medium transition-colors ${
      pathname === item.href 
        ? 'text-cyan-700 dark:text-cyan-300' 
        : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'
    }`}
  >
    {item.label}
  </Link>
))}
```

---

## 🔧 Exemplos Práticos

### 📱 **Menu Mobile (Futuro)**
```typescript
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      {/* Botão hamburger */}
      <button 
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      
      {/* Menu sobreposto */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900">
          <Link href="/" onClick={() => setIsOpen(false)}>Início</Link>
          <Link href="/treino" onClick={() => setIsOpen(false)}>Praticar</Link>
          {/* ... outros links */}
        </div>
      )}
    </>
  )
}
```

### 🔍 **Indicador de Carregamento**
```typescript
function NavigationWithLoader() {
  const [loading, setLoading] = useState(false)
  
  const handleNavigation = (href: string) => {
    setLoading(true)
    // Next.js automaticamente navegará
    // Reset loading state após navegação
    setTimeout(() => setLoading(false), 500)
  }
  
  return (
    <nav className="relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse" />
      )}
      {/* ... resto do menu */}
    </nav>
  )
}
```

### 🔔 **Badge de Notificação**
```typescript
function NavigationWithBadge() {
  const notificationCount = 3
  
  return (
    <Link href="/estatisticas" className="relative">
      Estatísticas
      {notificationCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </Link>
  )
}
```

---

## ⚠️ Coisas Importantes

### ✅ **Boas Práticas**
- **Sempre use Next.js Link** para navegação interna
- **Mantenha o menu limpo** - máximo 5-6 links principais
- **Teste em mobile** - considere menu hamburger
- **Use aria-label** em botões de ação

### 🚨 **Evite**
```typescript
// ❌ Não use <a> para links internos
<a href="/treino">Praticar</a>

// ❌ Não faça navegação manual
window.location.href = '/treino'

// ✅ Use Next.js Link
<Link href="/treino">Praticar</Link>
```

### 🎯 **Troubleshooting**
- **Menu não destaca página atual?** → Verifique se `usePathname()` está correto
- **Tema não muda?** → Confirme se ThemeProvider está funcionando
- **Animação não roda?** → Verifique se CSS personalizado está carregando

---

## 📱 Responsividade

### 📊 **Breakpoints**
```typescript
// Comportamento por tamanho de tela
const responsive = {
  mobile: 'até 768px',     // Menu oculto, só logo e tema
  tablet: '768px+',        // Menu completo visível  
  desktop: '1024px+',      // Layout otimizado
}
```

### 🎨 **Adaptações**
- **Mobile**: Logo + botão tema (menu pode ser hamburger)
- **Tablet/Desktop**: Menu completo visível
- **Acessibilidade**: Focus states e aria-labels

---

**💡 Dica Final**: O Navigation é o "GPS" da aplicação. Mantenha-o simples, intuitivo e sempre testado em diferentes tamanhos de tela. A navegação clara é fundamental para uma boa experiência do usuário!
