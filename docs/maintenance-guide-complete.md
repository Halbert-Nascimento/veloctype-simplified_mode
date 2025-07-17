# 🔧 Guia de Manutenção do VelocType

## 📖 Introdução à Manutenção

Este guia foi criado para te ajudar a **manter e atualizar** o VelocType de forma segura e organizada. Aqui você aprenderá como fazer mudanças sem quebrar nada e como expandir o projeto de maneira inteligente.

**🎯 Objetivo**: Ensinar manutenção prática e segura do projeto

---

## 🛠️ Preparação para Manutenção

### 🔍 **Antes de Começar**
```bash
# 1. Certifique-se de que tudo está funcionando
npm run dev

# 2. Faça backup das configurações importantes
cp src/config/app-config.json src/config/app-config.backup.json
cp src/data/typing-texts.json src/data/typing-texts.backup.json

# 3. Verifique se não há erros no console
# Abra o navegador e veja o console (F12)
```

### 📋 **Checklist de Segurança**
- [ ] ✅ Projeto rodando sem erros
- [ ] ✅ Backup das configurações feito
- [ ] ✅ Documentação consultada
- [ ] ✅ Ambiente de teste preparado

---

## 📝 Tarefas Comuns de Manutenção

### 🎨 **1. Mudando Cores do Tema**

#### 🔍 **Onde Modificar**
```typescript
// Em src/app/components/ThemeProvider.tsx
// E nas classes CSS dos componentes

// Exemplo: Mudando a cor principal de cyan para blue
// Localizar todas as classes com 'cyan' e trocar por 'blue'

// Navigation.tsx - linha 32 aproximadamente
className="text-cyan-700 dark:text-cyan-300"
// Mudar para:
className="text-blue-700 dark:text-blue-300"
```

#### 🎯 **Passo a Passo**
1. **Defina a nova cor** (ex: blue, green, purple)
2. **Use busca global** no editor (Ctrl+Shift+F)
3. **Procure por 'cyan'** em todos os arquivos
4. **Substitua uma por uma** verificando o contexto
5. **Teste ambos os temas** (claro e escuro)

### 📱 **2. Adicionando Nova Página**

#### 📁 **Estrutura Necessária**
```bash
# Criar nova pasta em src/app/
src/app/nova-pagina/
└── page.tsx

# Adicionar link no Navigation.tsx
# Criar documentação em docs/
```

#### 🔧 **Exemplo Prático: Página "Ranking"**
```typescript
// 1. Criar src/app/ranking/page.tsx
import PageContainer from '@/app/components/PageContainer'

export default function RankingPage() {
  return (
    <PageContainer 
      title="Ranking de Usuários"
      subtitle="Veja os melhores digitadores"
    >
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Top 10 Digitadores</h2>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p>Lista de ranking aqui...</p>
        </div>
      </div>
    </PageContainer>
  )
}

// 2. Adicionar link no Navigation.tsx (linha 35 aproximadamente)
<Link href="/ranking" className={`text-base font-medium transition-colors ${
  pathname === '/ranking' 
    ? 'text-cyan-700 dark:text-cyan-300' 
    : 'text-[#1e293b] dark:text-white hover:text-cyan-700 dark:hover:text-cyan-300'
}`}>
  Ranking
</Link>
```

### ⚙️ **3. Adicionando Nova Configuração**

#### 📋 **Modificar app-config.json**
```json
// Em src/config/app-config.json
{
  "app": {
    "name": "VelocType",
    "version": "1.0.0"
  },
  "defaults": {
    "testDuration": 60,
    "fontSize": 1.0,
    "showErrors": true,
    "colorFeedback": true,
    // ✅ Nova configuração
    "autoSave": true,
    "soundEffects": false
  }
}
```

#### 🎣 **Atualizar useAppConfig.ts**
```typescript
// Adicionar no tipo AppConfig (linha 15 aproximadamente)
interface AppConfig {
  app: {
    name: string
    version: string
  }
  defaults: {
    testDuration: number
    fontSize: number
    showErrors: boolean
    colorFeedback: boolean
    // ✅ Novas configurações
    autoSave: boolean
    soundEffects: boolean
  }
  // ... resto do config
}
```

### 🔤 **4. Adicionando Nova Categoria de Texto**

#### 📝 **Modificar typing-texts.json**
```json
// Em src/data/typing-texts.json
{
  "categories": [
    {
      "id": "programacao",
      "name": "Programação",
      "description": "Códigos e sintaxes de programação"
    },
    // ✅ Nova categoria
    {
      "id": "medicina",
      "name": "Medicina",
      "description": "Termos médicos e textos da área da saúde",
      "isPremium": false
    }
  ],
  "texts": [
    // ✅ Textos da nova categoria
    {
      "id": "med_001",
      "title": "Anatomia Básica",
      "content": "O corpo humano é composto por diferentes sistemas...",
      "category": "medicina",
      "difficulty": "medium",
      "wordCount": 150
    }
  ]
}
```

### 🎵 **5. Adicionando Sons/Efeitos**

#### 📁 **Estrutura de Arquivos**
```bash
# Adicionar sons em public/sounds/
public/
└── sounds/
    ├── success.mp3
    ├── error.mp3
    └── typing.mp3
```

#### 🔧 **Implementação**
```typescript
// Criar hook personalizado
// src/hooks/useSounds.ts
export function useSounds() {
  const { get } = useAppConfig()
  
  const playSound = (soundName: string) => {
    const soundEnabled = get('defaults.soundEffects', false)
    if (!soundEnabled) return
    
    const audio = new Audio(`/sounds/${soundName}.mp3`)
    audio.play().catch(console.error)
  }
  
  return {
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playTyping: () => playSound('typing')
  }
}
```

---

## 🚨 Problemas Comuns e Soluções

### ❌ **Erro: "Module not found"**
```bash
# Problema: Arquivo não encontrado
Error: Cannot resolve module './MeuComponente'

# Solução:
# 1. Verifique se o arquivo existe
# 2. Confira se o caminho está correto
# 3. Verifique se o export está correto

// ✅ Export correto
export default function MeuComponente() { ... }

// ✅ Import correto  
import MeuComponente from './MeuComponente'
```

### ❌ **Erro: "Tema não muda"**
```typescript
// Problema: Componente não reage a mudanças de tema

// ❌ Errado - acessando diretamente
const theme = localStorage.getItem('theme')

// ✅ Correto - usando o hook
import { useTheme } from '@/app/components/ThemeProvider'

function MeuComponente() {
  const { theme } = useTheme()
  // ...
}
```

### ❌ **Erro: "Configuração não salva"**
```typescript
// Problema: useAppConfig não está salvando

// ❌ Errado - modificando objeto diretamente
config.defaults.fontSize = 1.5

// ✅ Correto - usando função set
const { set } = useAppConfig()
set('defaults.fontSize', 1.5)
```

### ❌ **Erro: "Layout quebrado no mobile"**
```typescript
// Problema: CSS não responsivo

// ❌ Errado - apenas desktop
<div className="flex gap-8">

// ✅ Correto - responsivo
<div className="flex flex-col md:flex-row gap-4 md:gap-8">
```

---

## 🔄 Processo de Atualização Segura

### 📋 **Metodologia "Pequenos Passos"**
1. **Uma mudança por vez** - não misture diferentes tipos de alteração
2. **Teste imediatamente** - após cada mudança, veja se funciona
3. **Commit frequente** - salve progressos pequenos e funcionais
4. **Rollback rápido** - se algo quebrar, volte ao estado anterior

### 🎯 **Fluxo Recomendado**
```bash
# 1. Planejamento
# - O que você quer mudar?
# - Onde está o código relevante?
# - Quais arquivos serão afetados?

# 2. Implementação
# - Faça a mudança mínima necessária
# - Teste no navegador
# - Verifique ambos os temas (claro/escuro)

# 3. Validação
# - Navegue por todas as páginas
# - Teste funcionalidades relacionadas
# - Verifique no mobile e desktop

# 4. Documentação
# - Atualize comentários se necessário
# - Documente mudanças importantes
```

---

## 📊 Monitoramento e Performance

### 🔍 **Verificações Regulares**
```bash
# Verificar se build está funcionando
npm run build

# Verificar tamanho do bundle
npm run build
# Veja o output para arquivos muito grandes (>1MB)

# Verificar erros de linting
npm run lint
```

### ⚡ **Otimizações Simples**
```typescript
// ✅ Use lazy loading para componentes pesados
import dynamic from 'next/dynamic'

const ComponentePesado = dynamic(() => import('./ComponentePesado'), {
  loading: () => <p>Carregando...</p>
})

// ✅ Otimize imagens
import Image from 'next/image'

<Image 
  src="/imagem.jpg" 
  alt="Descrição"
  width={300}
  height={200}
  placeholder="blur"
/>
```

---

## 🎯 Casos de Uso Específicos

### 🔄 **Migrando Dados de Configuração**
```typescript
// Quando app-config.json muda estrutura
function migrateConfig() {
  const { get, set } = useAppConfig()
  
  // Verificar se é versão antiga
  const version = get('app.version', '0.0.0')
  
  if (version < '2.0.0') {
    // Migrar configurações antigas
    const oldFontSize = get('fontSize')  // Caminho antigo
    if (oldFontSize) {
      set('defaults.fontSize', oldFontSize)  // Caminho novo
    }
    
    // Atualizar versão
    set('app.version', '2.0.0')
  }
}
```

### 🎨 **Personalizando Tema Corporativo**
```typescript
// Criando tema personalizado para empresa
const temaEmpresa = {
  light: {
    primary: '#003366',      // Azul da empresa
    secondary: '#FFD700',    // Dourado da empresa
    background: '#F8F9FA',
    text: '#212529'
  },
  dark: {
    primary: '#4A90E2',      // Azul claro
    secondary: '#FFE066',    // Dourado claro
    background: '#1A1A1A',
    text: '#FFFFFF'
  }
}

// Aplicar no Tailwind ou CSS customizado
```

### 📱 **Adicionando PWA (App Mobile)**
```typescript
// Configuração básica de PWA
// 1. Criar public/manifest.json
{
  "name": "VelocType",
  "short_name": "VelocType",
  "description": "App de treinamento de digitação",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#162032",
  "theme_color": "#0891b2",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}

// 2. Registrar service worker
// 3. Adicionar meta tags no layout
```

---

## 🎓 Recursos de Aprendizado

### 📚 **Documentação Oficial**
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

### 🛠️ **Ferramentas Úteis**
- **VS Code**: Editor recomendado
- **React DevTools**: Extensão do browser
- **Tailwind CSS IntelliSense**: Extensão do VS Code
- **GitLens**: Para controle de versão

### 🎯 **Próximos Passos de Aprendizado**
1. **Domine os hooks personalizados** - useTypingTexts e useAppConfig
2. **Entenda o Tailwind CSS** - sistema de classes utilitárias
3. **Aprenda Framer Motion** - para animações mais avançadas
4. **Explore Next.js** - roteamento, SSR, performance

---

## ⚠️ Checklist Final

### ✅ **Antes de Fazer Deploy**
- [ ] Build roda sem erros (`npm run build`)
- [ ] Linting passa (`npm run lint`)
- [ ] Testado em ambos os temas
- [ ] Testado em mobile e desktop
- [ ] Todas as páginas funcionam
- [ ] Configurações salvas corretamente
- [ ] Performance aceitável

### 📋 **Arquivo de Configuração**
- [ ] app-config.json válido (JSON syntax)
- [ ] Todas as configurações têm valores padrão
- [ ] Novas configurações documentadas
- [ ] Backup das configurações antigas

### 🎨 **Interface**
- [ ] Tema claro e escuro funcionando
- [ ] Responsividade mantida
- [ ] Animações suaves
- [ ] Acessibilidade preservada

---

**🎉 Parabéns!** Agora você tem um guia completo para manter o VelocType funcionando perfeitamente. Lembre-se: **mudanças pequenas e frequentes** são sempre melhores que mudanças grandes e arriscadas.

**💡 Dica de Ouro**: Sempre que tiver dúvida, consulte primeiro a documentação, faça backup, teste em ambiente local, e só depois aplique em produção!

**🚀 Próximo Nível**: Quando se sentir confortável com manutenção básica, explore funcionalidades avançadas como PWA, analytics, ou integração com APIs externas!
