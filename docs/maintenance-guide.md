# 📋 Documentação de Manutenção - VelocType

## 🎯 Visão Geral do Projeto

O VelocType é uma aplicação web para treinamento de digitação construída com Next.js 15, React 19 e TypeScript. O projeto segue uma arquitetura modular e bem organizada para facilitar manutenção e desenvolvimento.

## 📁 Estrutura de Pastas Explicada

### `/src/app` - Páginas e Layout Principal
```
src/app/
├── components/           # Componentes reutilizáveis
│   ├── Navigation.tsx    # Barra de navegação superior
│   ├── Footer.tsx        # Rodapé da aplicação
│   ├── ThemeProvider.tsx # Gerenciador de tema claro/escuro
│   └── PageContainer.tsx # Container padrão para páginas
├── globals.css          # Estilos globais do Tailwind CSS
├── layout.tsx           # Layout principal que envolve todas as páginas
├── page.tsx             # Página inicial (/)
├── contato/             # Página de contato (/contato)
├── estatisticas/        # Página de estatísticas (/estatisticas)
├── privacidade/         # Página de privacidade (/privacidade)
├── sobre/               # Página sobre o projeto (/sobre)
├── termos/              # Página de termos de uso (/termos)
└── treino/              # Página de treinamento (/treino)
```

### `/src/config` - Configurações
```
src/config/
└── app-config.json      # Configurações gerais da aplicação
```

### `/src/data` - Dados Estáticos
```
src/data/
└── typing-texts.json    # Banco de dados com textos para exercícios
```

### `/src/hooks` - Hooks Personalizados
```
src/hooks/
└── useTypingTexts.ts    # Hook principal para gerenciar textos
```

### `/docs` - Documentação
```
docs/
└── useTypingTexts-guide.md  # Guia do hook principal
```

## 🔧 Tecnologias e Suas Funções

### Framework e Core
- **Next.js 15.4.1**: Framework React com SSR e roteamento
- **React 19.1.0**: Biblioteca para interfaces de usuário
- **TypeScript 5.8.3**: Tipagem estática para JavaScript

### Estilização
- **Tailwind CSS 3.4.17**: Framework CSS utilitário
- **PostCSS 8.5.6**: Processador de CSS
- **Autoprefixer 10.4.21**: Adiciona prefixos CSS automaticamente

### Interface e Ícones
- **Heroicons 2.2.0**: Ícones SVG do Tailwind
- **React Icons 5.5.0**: Biblioteca de ícones
- **Framer Motion 11.18.2**: Animações suaves

### Desenvolvimento
- **ESLint 9.31.0**: Linter para código JavaScript/TypeScript
- **eslint-config-next**: Configuração ESLint específica para Next.js

## 🎨 Sistema de Temas

### Como Funciona
O sistema de temas usa a classe `dark` no elemento `<html>` para alternar entre tema claro e escuro.

### Arquivo Responsável
- **`ThemeProvider.tsx`**: Gerencia o estado do tema
- **`globals.css`**: Define as classes CSS para cada tema

### Como Adicionar Novas Cores
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'nova-cor': '#hexcode',           // Tema claro
        'nova-cor-dark': '#hexcode',      // Tema escuro
      }
    }
  }
}
```

### Usando nos Componentes
```jsx
<div className="bg-nova-cor dark:bg-nova-cor-dark">
  Conteúdo que muda de cor
</div>
```

## 🗃️ Sistema de Dados (typing-texts.json)

### Estrutura do Arquivo
```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-01-17",
    "totalTexts": 50,
    "totalCategories": 5
  },
  "categories": [
    {
      "id": "programacao",
      "name": "Programação",
      "description": "Textos sobre código",
      "icon": "💻",
      "premium": false,
      "difficulty": "medium",
      "color": "#3b82f6"
    }
  ],
  "texts": [
    {
      "id": "texto_001",
      "categoryId": "programacao",
      "title": "Função JavaScript",
      "content": "function soma(a, b) { return a + b; }",
      "difficulty": "medium",
      "estimatedWPM": 25,
      "wordCount": 7,
      "characterCount": 39,
      "hasNumbers": false,
      "hasSymbols": true,
      "language": "pt-BR",
      "tags": ["javascript", "função"]
    }
  ]
}
```

### Como Adicionar Novos Textos
1. Abra `src/data/typing-texts.json`
2. Adicione novo objeto no array `texts`
3. Use um ID único (ex: `texto_052`)
4. Preencha todos os campos obrigatórios
5. Use as funções `analyzeText()` e `estimateWPM()` para calcular estatísticas

### Como Adicionar Nova Categoria
1. Adicione objeto no array `categories`
2. Use ID único e sem espaços
3. Escolha ícone emoji apropriado
4. Defina se é premium ou gratuita

## 🔄 Fluxo de Navegação

### Páginas Principais
1. **Página Inicial (`/`)**: Apresentação e introdução
2. **Treinamento (`/treino`)**: Exercícios de digitação
3. **Estatísticas (`/estatisticas`)**: Progresso do usuário
4. **Sobre (`/sobre`)**: Informações sobre o projeto

### Páginas Legais
- **Contato (`/contato`)**: Formulário de contato
- **Privacidade (`/privacidade`)**: Política de privacidade
- **Termos (`/termos`)**: Termos de uso

### Como Adicionar Nova Página
1. Criar pasta em `src/app/nome-da-pagina/`
2. Adicionar arquivo `page.tsx` na pasta
3. Exportar componente React default
4. Atualizar navegação em `Navigation.tsx` se necessário

## 🎮 Componentes Principais

### Navigation.tsx
**Função**: Barra de navegação superior com menu e toggle de tema

**Principais Recursos**:
- Menu responsivo para mobile/desktop
- Botão para alternar tema claro/escuro
- Links para todas as páginas principais
- Indicação da página atual

**Como Personalizar**:
```jsx
// Adicionar novo link
<Link href="/nova-pagina" className="...">
  Nova Página
</Link>

// Modificar cores
className="bg-[#cor-personalizada] dark:bg-[#cor-escura]"
```

### ThemeProvider.tsx
**Função**: Gerencia o estado global do tema (claro/escuro)

**Como Funciona**:
1. Verifica preferência salva no localStorage
2. Se não houver, usa preferência do sistema
3. Aplica classe `dark` no HTML quando necessário
4. Salva mudanças no localStorage

**Como Usar em Novos Componentes**:
```jsx
import { useTheme } from '@/app/components/ThemeProvider'

function MeuComponente() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Tema atual: {theme}
    </button>
  )
}
```

### Footer.tsx
**Função**: Rodapé com links úteis e informações do projeto

**Seções**:
- Links para páginas principais
- Links legais (privacidade, termos)
- Informações de copyright
- Links para redes sociais (se houver)

## 🔧 Scripts de Desenvolvimento

### Scripts Disponíveis
```json
{
  "dev": "next dev",        // Servidor de desenvolvimento
  "build": "next build",    // Build para produção
  "start": "next start",    // Servidor de produção
  "lint": "next lint"       // Verificação de código
}
```

### Como Executar
```bash
npm run dev     # Desenvolvimento local
npm run build   # Preparar para produção
npm run start   # Rodar versão de produção
npm run lint    # Verificar problemas no código
```

## 🚨 Problemas Comuns e Soluções

### 1. Erro: "Cannot find module"
**Causa**: Dependência não instalada ou caminho incorreto

**Solução**:
```bash
npm install          # Reinstalar dependências
npm run dev          # Reiniciar servidor
```

### 2. Tema não funciona
**Causa**: localStorage corrompido ou erro no ThemeProvider

**Solução**:
1. Limpar localStorage do navegador
2. Verificar se ThemeProvider está envolvendo a aplicação
3. Confirmar classes dark: no Tailwind

### 3. Textos não carregam
**Causa**: Erro no arquivo typing-texts.json

**Solução**:
1. Validar JSON em validator online
2. Verificar se todas as propriedades existem
3. Conferir import no useTypingTexts.ts

### 4. Estilos não aplicam
**Causa**: Problema no Tailwind CSS

**Solução**:
```bash
rm -rf .next         # Limpar cache
npm run dev          # Reiniciar
```

### 5. TypeScript reclama de tipos
**Causa**: Interface não está atualizada

**Solução**:
1. Verificar interfaces em useTypingTexts.ts
2. Atualizar tipos conforme necessário
3. Usar `any` temporariamente se necessário

## 📈 Guia de Performance

### Otimizações Implementadas
- **Next.js Image**: Otimização automática de imagens
- **Code Splitting**: Carregamento sob demanda
- **Static Generation**: Páginas estáticas quando possível
- **CSS Purging**: Remove CSS não utilizado

### Como Manter Performance
1. **Imagens**: Sempre use `next/image`
2. **Imports**: Use import dinâmico para componentes pesados
3. **Estados**: Minimize re-renders desnecessários
4. **Bundle**: Monitore tamanho com `npm run build`

## 🔄 Versionamento e Deploy

### Preparar para Deploy
```bash
npm run build       # Criar build de produção
npm run start       # Testar localmente
```

### Plataformas Recomendadas
- **Vercel**: Deploy automático via GitHub
- **Netlify**: Build e deploy automático
- **Railway**: Deploy com banco de dados
- **Heroku**: Hospedagem tradicional

### Variáveis de Ambiente
Criar arquivo `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://seu-site.com
NEXT_PUBLIC_ANALYTICS_ID=sua-id-analytics
```

## 📝 Checklist de Manutenção

### Mensal
- [ ] Atualizar dependências (`npm outdated`)
- [ ] Verificar links quebrados
- [ ] Revisar logs de erro
- [ ] Backup dos dados

### Trimestral
- [ ] Audit de segurança (`npm audit`)
- [ ] Análise de performance
- [ ] Atualização da documentação
- [ ] Review do código

### Anual
- [ ] Atualização major das dependências
- [ ] Refatoração de código antigo
- [ ] Otimização de SEO
- [ ] Análise de UX

---

**💡 Dica Final**: Mantenha esta documentação atualizada sempre que fizer mudanças significativas no projeto. Seu eu futuro (e outros desenvolvedores) agradecerão!
