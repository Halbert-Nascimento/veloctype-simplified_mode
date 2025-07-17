# 📦 Documentação do PageContainer

## 📖 O que é o PageContainer?

O `PageContainer` é o **componente de layout base** para todas as páginas da aplicação. Ele fornece estrutura consistente, animações de entrada, responsividade e integração automática com o rodapé.

**🎯 Função Principal**: Layout padronizado e animado para todas as páginas do VelocType

---

## 🔧 Como Funciona?

### 🧠 **Estrutura Principal**
```typescript
// O PageContainer cria um layout completo de página:
<div className="min-h-screen bg-[...] flex flex-col">
  📄 Header Area (com título e subtítulo)
  📦 Content Area (conteúdo principal da página)
  🦶 Footer (rodapé automático)
</div>
```

### ✨ **Sistema de Animações**
- **Entrada em duas fases**: Título primeiro, conteúdo depois
- **Framer Motion**: Animações suaves e profissionais
- **Timing controlado**: Delay de 200ms entre elementos

### 📱 **Layout Responsivo**
- **Mobile-first**: Design que se adapta automaticamente
- **Container centralizado**: Máximo 4xl (1024px)
- **Espaçamento inteligente**: Padding automático

---

## 📋 Interface e Props

### 🔧 **PageContainerProps**
```typescript
interface PageContainerProps {
  title: string         // ✅ Obrigatório - Título principal da página
  subtitle?: string     // ⚠️ Opcional - Subtítulo descritivo
  children: ReactNode   // ✅ Obrigatório - Conteúdo da página
  className?: string    // ⚠️ Opcional - Classes CSS adicionais
}
```

### 📝 **Descrição das Props**
- **`title`**: Título principal (aparece em cyan, h1)
- **`subtitle`**: Texto explicativo opcional (aparece abaixo do título)
- **`children`**: Todo o conteúdo principal da página
- **`className`**: Classes extras para personalização

---

## 🎨 Design e Estilização

### 🌈 **Esquema de Cores**
```typescript
// Cores automáticas por tema
const colors = {
  light: {
    pageBackground: '#f8fafc',    // Fundo geral claro
    contentBackground: 'white',   // Fundo do card branco
    text: '#1e293b',              // Texto escuro
    title: '#0891b2',             // Título cyan escuro
    subtitle: '#0891b2',          // Subtítulo cyan
    border: '#cbd5e1'             // Borda sutil
  },
  dark: {
    pageBackground: '#0d1724',    // Fundo geral escuro
    contentBackground: '#162032', // Fundo do card escuro
    text: 'white',                // Texto claro
    title: '#67e8f9',             // Título cyan claro
    subtitle: '#cffafe',          // Subtítulo cyan muito claro
    border: '#1e293b'             // Borda escura
  }
}
```

### 📐 **Layout Structure**
```typescript
// Hierarquia visual
<div className="min-h-screen flex flex-col">          // Página completa
  <div className="flex-1 pt-24 pb-8 px-4">           // Área principal
    <div className="w-full max-w-4xl mx-auto">        // Container centralizado
      <motion.div>                                    // Header animado
        <h1>Título</h1>
        <p>Subtítulo</p>
      </motion.div>
      <motion.div className="bg-white rounded-2xl">   // Card de conteúdo
        {children}                                     // Conteúdo da página
      </motion.div>
    </div>
  </div>
  <Footer />                                          // Rodapé fixo
</div>
```

### ✨ **Animações Framer Motion**
```typescript
// Animação do header (título + subtítulo)
const headerAnimation = {
  initial: { opacity: 0, y: 20 },     // Inicia invisível, 20px abaixo
  animate: { opacity: 1, y: 0 },      // Termina visível, posição normal
  transition: { duration: 0.5 }       // 500ms de duração
}

// Animação do conteúdo
const contentAnimation = {
  initial: { opacity: 0, y: 30 },     // Inicia invisível, 30px abaixo  
  animate: { opacity: 1, y: 0 },      // Termina visível, posição normal
  transition: { 
    duration: 0.5,                    // 500ms de duração
    delay: 0.2                        // 200ms de atraso (depois do header)
  }
}
```

---

## 🚀 Como Usar

### 📱 **Uso Básico**
```typescript
import PageContainer from '@/app/components/PageContainer'

function MinhaPage() {
  return (
    <PageContainer title="Minha Página">
      <div>
        <h2>Conteúdo principal aqui</h2>
        <p>Todo o conteúdo fica dentro do card branco.</p>
      </div>
    </PageContainer>
  )
}
```

### 📝 **Com Subtítulo**
```typescript
function PaginaComSubtitulo() {
  return (
    <PageContainer 
      title="Estatísticas de Digitação"
      subtitle="Acompanhe sua evolução e performance"
    >
      <div>
        <p>Gráficos e dados aqui...</p>
      </div>
    </PageContainer>
  )
}
```

### 🎨 **Com Personalização**
```typescript
function PaginaCustomizada() {
  return (
    <PageContainer 
      title="Página Especial"
      subtitle="Com estilo personalizado"
      className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950"
    >
      <div className="space-y-6">
        <h2>Conteúdo especial</h2>
        <p>Esta página tem fundo gradiente personalizado</p>
      </div>
    </PageContainer>
  )
}
```

---

## 🎯 Exemplos Práticos

### 📊 **Página de Estatísticas**
```typescript
function EstatisticasPage() {
  return (
    <PageContainer 
      title="Suas Estatísticas"
      subtitle="Acompanhe sua evolução na digitação"
    >
      <div className="space-y-8">
        {/* Resumo geral */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="WPM Médio" value="65" />
          <StatCard title="Precisão" value="94%" />
          <StatCard title="Testes Feitos" value="127" />
        </div>
        
        {/* Gráfico de evolução */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Evolução WPM</h3>
          {/* Componente de gráfico aqui */}
        </div>
        
        {/* Histórico recente */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Últimos Testes</h3>
          {/* Lista de testes recentes */}
        </div>
      </div>
    </PageContainer>
  )
}
```

### 🎮 **Página de Treino**
```typescript
function TreinoPage() {
  return (
    <PageContainer 
      title="Praticar Digitação"
      subtitle="Escolha um texto e comece a treinar"
    >
      <div className="space-y-6">
        {/* Configurações */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
          <h3 className="text-lg font-medium mb-4">Configurações</h3>
          <div className="flex gap-4">
            <select className="rounded-lg border px-3 py-2">
              <option>Duração: 1 minuto</option>
              <option>Duração: 2 minutos</option>
            </select>
            <select className="rounded-lg border px-3 py-2">
              <option>Categoria: Programação</option>
              <option>Categoria: Literatura</option>
            </select>
          </div>
        </div>
        
        {/* Área de digitação */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
          <div className="font-mono text-lg leading-relaxed">
            {/* Componente de digitação aqui */}
            <TypingArea />
          </div>
        </div>
        
        {/* Botões de ação */}
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-cyan-600 text-white rounded-lg">
            Iniciar Teste
          </button>
          <button className="px-6 py-3 border border-cyan-600 text-cyan-600 rounded-lg">
            Novo Texto
          </button>
        </div>
      </div>
    </PageContainer>
  )
}
```

### ℹ️ **Página Sobre**
```typescript
function SobrePage() {
  return (
    <PageContainer 
      title="Sobre o VelocType"
      subtitle="Conheça nossa missão e história"
    >
      <div className="prose dark:prose-invert max-w-none">
        <h2>Nossa Missão</h2>
        <p>
          O VelocType foi criado para ajudar pessoas a melhorar suas 
          habilidades de digitação de forma divertida e eficiente.
        </p>
        
        <h2>Como Funciona</h2>
        <ul>
          <li>Escolha uma categoria de texto</li>
          <li>Configure a duração do teste</li>
          <li>Digite o texto apresentado</li>
          <li>Receba feedback instantâneo</li>
        </ul>
        
        <h2>Recursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">
              📊 Estatísticas Detalhadas
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Acompanhe WPM, precisão e evolução
            </p>
          </div>
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-cyan-700 dark:text-cyan-300">
              🎨 Tema Personalizado
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modo claro e escuro disponíveis
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
```

### 📞 **Página de Contato**
```typescript
function ContatoPage() {
  return (
    <PageContainer 
      title="Entre em Contato"
      subtitle="Estamos aqui para ajudar"
    >
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Nome Completo
            </label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Seu nome aqui"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Mensagem
            </label>
            <textarea 
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Como podemos ajudar?"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Enviar Mensagem
          </button>
        </form>
        
        {/* Informações de contato */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Outras Formas de Contato</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span>📧</span>
              <span>contato@veloctype.com</span>
            </div>
            <div className="flex items-center gap-3">
              <span>💬</span>
              <span>Chat ao vivo (disponível das 9h às 18h)</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
```

---

## 🔄 Fluxo de Renderização

### 🚀 **Sequência de Animação**
1. **Página carrega** → Componentes invisíveis (opacity: 0)
2. **200ms** → Título e subtítulo aparecem (y: 20 → 0)
3. **400ms** → Card de conteúdo aparece (y: 30 → 0)
4. **500ms** → Animação completa

### 📱 **Responsividade Automática**
```typescript
// Adaptações por tamanho de tela
const responsive = {
  mobile: {
    title: 'text-3xl',          // Título menor
    container: 'px-4',          // Padding lateral reduzido
    card: 'p-6'                 // Padding interno menor
  },
  desktop: {
    title: 'text-4xl',          // Título maior
    container: 'px-8',          // Padding lateral maior
    card: 'p-8'                 // Padding interno maior
  }
}
```

---

## 🛠️ Dependências

### 📦 **Imports Essenciais**
```typescript
import { motion } from 'framer-motion'    // Animações
import { ReactNode } from 'react'         // Tipagem React
import Footer from './Footer'             // Rodapé automático
```

### 🔗 **Dependências Externas**
- **Framer Motion**: Animações suaves e profissionais
- **Tailwind CSS**: Sistema de estilização
- **React**: Componente base

---

## ⚠️ Coisas Importantes

### ✅ **Boas Práticas**
- **Sempre use PageContainer** como wrapper das páginas
- **Título é obrigatório** - descreve claramente a página
- **Subtítulo é opcional** - use para contexto adicional
- **Conteúdo no children** - tudo vai dentro do card branco

### 🚨 **Evite**
```typescript
// ❌ Não crie layout próprio
function MinhaPage() {
  return (
    <div className="min-h-screen">  {/* Duplicação do PageContainer */}
      <h1>Título</h1>
      <div>Conteúdo</div>
    </div>
  )
}

// ❌ Não esqueça props obrigatórias
<PageContainer>  {/* Faltou o title! */}
  <div>Conteúdo</div>
</PageContainer>

// ✅ Use corretamente
<PageContainer title="Minha Página">
  <div>Conteúdo</div>
</PageContainer>
```

### 🎯 **Troubleshooting**
- **Animação não funciona?** → Verifique se Framer Motion está instalado
- **Layout quebrado?** → Confirme que está usando o PageContainer corretamente
- **Footer não aparece?** → PageContainer automaticamente inclui o Footer

---

## 📱 Acessibilidade

### ♿ **Recursos de Acessibilidade**
- **Hierarquia semântica**: h1 para título principal
- **Contraste adequado**: Cores testadas para legibilidade
- **Motion respeitoso**: Animações não muito rápidas
- **Responsive design**: Funciona em todos os dispositivos

### 🎯 **Melhores Práticas**
- **Títulos descritivos**: Sempre claros sobre o conteúdo
- **Estrutura lógica**: Header → Content → Footer
- **Focus management**: Navegação por teclado funcional

---

**💡 Dica Final**: O PageContainer é a "moldura" de todas as páginas. Use-o consistentemente para manter o visual profissional e a experiência de usuário unificada em toda a aplicação!
