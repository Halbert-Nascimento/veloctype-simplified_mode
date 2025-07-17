# 🦶 Documentação do Footer

## 📖 O que é o Footer?

O `Footer` é o **rodapé da aplicação** que aparece na parte inferior de todas as páginas. Ele fornece informações legais, links importantes e mantém a consistência visual em toda a aplicação.

**🎯 Função Principal**: Rodapé informativo com links legais e de contato

---

## 🔧 Como Funciona?

### 🧠 **Estrutura Principal**
```typescript
// O Footer é uma seção simples e limpa:
<footer className="w-full bg-[...] text-[...] py-8 mt-auto">
  <div className="max-w-5xl mx-auto flex justify-between">
    📄 Copyright (esquerda)
    🔗 Links Legais (direita)
  </div>
</footer>
```

### 📱 **Layout Responsivo**
- **Desktop**: Copyright à esquerda, links à direita
- **Mobile**: Stack vertical, copyright em cima, links embaixo
- **Centralizado**: Container máximo 5xl (1280px)

### 🎨 **Integração Automática**
- **PageContainer**: Inclui automaticamente o Footer
- **Posicionamento**: `mt-auto` empurra para o final da página
- **Tema**: Cores automáticas baseadas no tema ativo

---

## 🎨 Design e Estilização

### 🌈 **Esquema de Cores**
```typescript
// Cores automáticas por tema
const colors = {
  light: {
    background: '#e0e7ef',     // Fundo cinza claro suave
    text: '#0891b2',           // Texto cyan escuro
    border: '#cbd5e1',         // Borda sutil
    hover: '#0e7490'           // Hover cyan mais escuro
  },
  dark: {
    background: '#162032',     // Fundo escuro consistente
    text: '#cffafe',           // Texto cyan muito claro
    border: '#1e293b',         // Borda escura
    hover: '#67e8f9'           // Hover cyan claro
  }
}
```

### 📐 **Layout e Espaçamento**
```typescript
// Estrutura responsiva
<footer className="w-full py-8 mt-auto">           // Full width, padding vertical
  <div className="max-w-5xl mx-auto px-4">         // Container centralizado
    <div className="flex flex-col md:flex-row">     // Stack mobile, row desktop
      <span>Copyright</span>                        // Informação de direitos
      <div className="flex gap-6">                  // Links espaçados
        <Link>Termos</Link>
        <Link>Privacidade</Link>
        <Link>Contato</Link>
      </div>
    </div>
  </div>
</footer>
```

### 🔗 **Links e Navegação**
```typescript
// Links com hover states
<Link 
  href="/termos" 
  className="hover:underline transition-colors hover:text-cyan-500"
>
  Termos
</Link>
```

---

## 📋 Conteúdo e Links

### 📄 **Copyright**
```typescript
// Informação de direitos autorais
<span>© 2025 VelocType. Todos os direitos reservados.</span>
```

### 🔗 **Links Legais**
```typescript
// Links para páginas importantes
const footerLinks = [
  { href: '/termos', label: 'Termos' },
  { href: '/privacidade', label: 'Privacidade' },
  { href: '/contato', label: 'Contato' }
]
```

### 📱 **Páginas Vinculadas**
- **`/termos`**: Termos de Uso da aplicação
- **`/privacidade`**: Política de Privacidade
- **`/contato`**: Página de contato e suporte

---

## 🚀 Como é Usado

### 📱 **Integração Automática**
```typescript
// No PageContainer - Footer é incluído automaticamente
<PageContainer title="Minha Página">
  <div>Conteúdo da página aqui</div>
  {/* Footer aparece automaticamente aqui */}
</PageContainer>
```

### 🎯 **Posicionamento Inteligente**
```typescript
// No PageContainer - estrutura flex
<div className="min-h-screen flex flex-col">
  <div className="flex-1">          // Conteúdo principal cresce
    {/* Conteúdo da página */}
  </div>
  <Footer />                       // Footer sempre no final
</div>
```

---

## 🔧 Exemplos de Personalização

### 🌟 **Footer Expandido**
```typescript
function ExpandedFooter() {
  return (
    <footer className="w-full bg-[#e0e7ef] dark:bg-[#162032] py-12 mt-auto border-t">
      <div className="max-w-6xl mx-auto px-4">
        {/* Seção principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyan-700 dark:text-cyan-300">
              VelocType
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Melhore sua velocidade de digitação com nossa plataforma interativa.
            </p>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold mb-3 text-cyan-700 dark:text-cyan-300">
              Links Rápidos
            </h4>
            <div className="space-y-2">
              <Link href="/treino" className="block text-sm hover:text-cyan-500">
                Praticar
              </Link>
              <Link href="/estatisticas" className="block text-sm hover:text-cyan-500">
                Estatísticas
              </Link>
              <Link href="/sobre" className="block text-sm hover:text-cyan-500">
                Sobre
              </Link>
            </div>
          </div>
          
          {/* Suporte */}
          <div>
            <h4 className="font-semibold mb-3 text-cyan-700 dark:text-cyan-300">
              Suporte
            </h4>
            <div className="space-y-2">
              <Link href="/contato" className="block text-sm hover:text-cyan-500">
                Contato
              </Link>
              <Link href="/faq" className="block text-sm hover:text-cyan-500">
                FAQ
              </Link>
              <Link href="/ajuda" className="block text-sm hover:text-cyan-500">
                Central de Ajuda
              </Link>
            </div>
          </div>
          
          {/* Redes Sociais */}
          <div>
            <h4 className="font-semibold mb-3 text-cyan-700 dark:text-cyan-300">
              Siga-nos
            </h4>
            <div className="flex gap-3">
              <a href="#" className="text-cyan-700 hover:text-cyan-500">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-cyan-700 hover:text-cyan-500">
                <span className="sr-only">GitHub</span>
                🐙
              </a>
              <a href="#" className="text-cyan-700 hover:text-cyan-500">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 VelocType. Todos os direitos reservados.
            </span>
            <div className="flex gap-6 mt-2 md:mt-0">
              <Link href="/termos" className="text-sm hover:text-cyan-500">
                Termos
              </Link>
              <Link href="/privacidade" className="text-sm hover:text-cyan-500">
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### 📊 **Footer com Estatísticas**
```typescript
function FooterWithStats() {
  const stats = {
    users: '10,000+',
    tests: '50,000+',
    wpm: '95'
  }
  
  return (
    <footer className="w-full bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 py-12 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
              {stats.users}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Usuários Ativos
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
              {stats.tests}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Testes Realizados
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
              {stats.wpm} WPM
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Velocidade Média
            </div>
          </div>
        </div>
        
        {/* Copyright padrão */}
        <div className="border-t border-cyan-200 dark:border-cyan-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-sm text-cyan-700 dark:text-cyan-300">
              © 2025 VelocType. Todos os direitos reservados.
            </span>
            <div className="flex gap-6 mt-2 md:mt-0">
              <Link href="/termos" className="text-sm hover:underline">
                Termos
              </Link>
              <Link href="/privacidade" className="text-sm hover:underline">
                Privacidade
              </Link>
              <Link href="/contato" className="text-sm hover:underline">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### 📱 **Footer Minimalista**
```typescript
function MinimalFooter() {
  return (
    <footer className="w-full py-4 mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 VelocType
          </span>
          <div className="flex gap-4">
            <Link href="/termos" className="text-xs text-gray-500 hover:text-cyan-600">
              Termos
            </Link>
            <Link href="/privacidade" className="text-xs text-gray-500 hover:text-cyan-600">
              Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## 🔄 Responsividade

### 📱 **Comportamento por Dispositivo**
```typescript
// Mobile (até 768px)
<footer>
  <div className="flex flex-col items-center gap-4">
    <span>© 2025 VelocType...</span>     // Copyright em cima
    <div className="flex gap-6">         // Links embaixo
      <Link>Termos</Link>
      <Link>Privacidade</Link>
      <Link>Contato</Link>
    </div>
  </div>
</footer>

// Desktop (768px+)
<footer>
  <div className="flex flex-row justify-between items-center">
    <span>© 2025 VelocType...</span>     // Copyright à esquerda
    <div className="flex gap-6">         // Links à direita
      <Link>Termos</Link>
      <Link>Privacidade</Link>
      <Link>Contato</Link>
    </div>
  </div>
</footer>
```

---

## 🛠️ Dependências

### 📦 **Imports Essenciais**
```typescript
import Link from 'next/link'    // Navegação do Next.js
```

### 🔗 **Dependências Externas**
- **Next.js**: Sistema de roteamento para links
- **Tailwind CSS**: Sistema de estilização
- **React**: Componente base

---

## ⚠️ Coisas Importantes

### ✅ **Boas Práticas**
- **Copyright sempre atualizado** - mude o ano automaticamente
- **Links funcionais** - todos devem levar a páginas reais
- **Acessibilidade** - use Links do Next.js
- **Consistência visual** - mantenha com o design geral

### 🚨 **Evite**
```typescript
// ❌ Não use <a> para links internos
<a href="/termos">Termos</a>

// ❌ Não esqueça do responsive
<div className="flex">  {/* Quebra no mobile */}

// ❌ Não faça footer muito grande
<footer className="py-20">  {/* Ocupa muito espaço */}

// ✅ Use corretamente
<Link href="/termos">Termos</Link>
<div className="flex flex-col md:flex-row">
<footer className="py-8">
```

### 🎯 **Troubleshooting**
- **Links não funcionam?** → Use Next.js Link corretamente
- **Footer não fica no final?** → Verifique se PageContainer está usando flex-col
- **Cores não mudam com tema?** → Confirme classes dark: nas cores

---

## 🔧 Manutenção

### 📅 **Atualizações Anuais**
```typescript
// Para atualizar o ano automaticamente:
const currentYear = new Date().getFullYear()

<span>© {currentYear} VelocType. Todos os direitos reservados.</span>
```

### 🔗 **Adicionando Novos Links**
```typescript
// Para adicionar mais links:
const footerLinks = [
  { href: '/termos', label: 'Termos' },
  { href: '/privacidade', label: 'Privacidade' },
  { href: '/contato', label: 'Contato' },
  // ✅ Novo link
  { href: '/faq', label: 'FAQ' },
  { href: '/suporte', label: 'Suporte' }
]

// No JSX:
{footerLinks.map(link => (
  <Link 
    key={link.href}
    href={link.href} 
    className="hover:underline transition-colors hover:text-cyan-500"
  >
    {link.label}
  </Link>
))}
```

### 🎨 **Personalizando Cores**
```typescript
// Para alterar esquema de cores:
const customFooter = {
  light: {
    bg: 'bg-gray-100',      // Fundo mais neutro
    text: 'text-gray-700',  // Texto mais sutil
    hover: 'hover:text-blue-600'
  },
  dark: {
    bg: 'dark:bg-gray-900',
    text: 'dark:text-gray-300',
    hover: 'dark:hover:text-blue-400'
  }
}
```

---

## 📱 Acessibilidade

### ♿ **Recursos de Acessibilidade**
- **Links semânticos**: Usando Next.js Link
- **Contraste adequado**: Cores testadas para legibilidade
- **Navegação por teclado**: Tab index funcional
- **Screen readers**: Estrutura HTML semântica

### 🎯 **Melhores Práticas**
- **Texto descritivo**: Links claros sobre o destino
- **Foco visível**: Estados de hover e focus bem definidos
- **Estrutura lógica**: Footer como elemento `<footer>`

---

**💡 Dica Final**: O Footer é o "final elegante" de cada página. Mantenha-o simples, funcional e sempre atualizado. É o último elemento que o usuário vê, então deve transmitir profissionalismo e confiança!
