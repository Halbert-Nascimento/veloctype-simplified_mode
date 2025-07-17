# 🚀 VelocType - Plataforma de Treinamento de Digitação

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.4.1-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
</div>

<div align="center">
  <h3>🎯 Melhore sua velocidade de digitação com exercícios práticos e feedback em tempo real</h3>
  <p>Uma plataforma moderna e intuitiva para desenvolver suas habilidades de digitação</p>
</div>

---

## 📖 Sobre o Projeto

**VelocType** é uma aplicação web desenvolvida para ajudar usuários a melhorar sua velocidade e precisão na digitação. Com uma interface moderna e responsiva, oferece exercícios práticos, estatísticas detalhadas e acompanhamento de progresso.

### ✨ Principais Funcionalidades

- 🎯 **Exercícios de Digitação**: Textos variados para prática
- 📊 **Estatísticas Detalhadas**: Acompanhe seu WPM (palavras por minuto) e precisão
- 🌙 **Tema Escuro/Claro**: Interface adaptável às suas preferências
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- ⚡ **Feedback em Tempo Real**: Veja seu desempenho instantaneamente
- 🎨 **Interface Moderna**: Design clean e intuitivo

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 15.4.1](https://nextjs.org/) (React 19.1.0)
- **Linguagem**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **Ícones**: [Heroicons](https://heroicons.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animações**: [Framer Motion 11.18.2](https://www.framer.com/motion/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/) ou [bun](https://bun.sh/)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Halbert-Nascimento/veloctype-simplified_mode.git
cd veloctype-v4-simplified_mode
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📁 Estrutura do Projeto

```
veloctype-v4-simplified_mode/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── PageContainer.tsx
│   │   │   └── ThemeProvider.tsx
│   │   ├── contato/            # Página de contato
│   │   ├── estatisticas/       # Página de estatísticas
│   │   ├── privacidade/        # Página de privacidade
│   │   ├── sobre/              # Página sobre
│   │   ├── termos/             # Página de termos
│   │   ├── treino/             # Página de treinamento
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout principal
│   │   └── page.tsx            # Página inicial
│   ├── config/
│   │   └── app-config.json     # Configurações da aplicação
│   ├── data/
│   │   └── typing-texts.json   # Textos para exercícios
│   └── hooks/
│       └── useTypingTexts.ts   # Hook personalizado
├── public/                     # Arquivos estáticos
├── .vscode/                    # Configurações do VS Code
├── package.json                # Dependências e scripts
├── tailwind.config.js          # Configuração do Tailwind
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Este arquivo
```

## 🎮 Como Usar

1. **Página Inicial**: Visão geral da plataforma com informações sobre funcionalidades
2. **Treinamento**: Acesse exercícios de digitação com diferentes níveis de dificuldade
3. **Estatísticas**: Acompanhe seu progresso, WPM e precisão ao longo do tempo
4. **Tema**: Use o botão no header para alternar entre tema claro e escuro

## 🛠️ Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter para verificar código
```

## 🎨 Personalização

### Cores do Tema

As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#f8fafc',
      text: '#1e293b',
    }
  }
}
```

### Fonte

O projeto usa a fonte [Inter](https://fonts.google.com/specimen/Inter) carregada via Google Fonts.

## 🚀 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/seu-usuario/veloctype-v4-simplified_mode)

### Outras Plataformas

- **Netlify**: Conecte seu repositório e configure o build command como `npm run build`
- **Railway**: Deploy automático conectando o repositório GitHub
- **Heroku**: Use o buildpack do Node.js

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Mantenha o código limpo e bem documentado
- Siga as convenções de nomenclatura do projeto
- Teste suas mudanças antes de submeter
- Atualize a documentação quando necessário

## 📝 Roadmap

- [ ] Sistema de usuários e perfis
- [ ] Ranking global de usuários
- [ ] Mais tipos de exercícios
- [ ] Suporte a múltiplos idiomas
- [ ] Modo competitivo
- [ ] Estatísticas avançadas
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@Halbert-Nascimento](https://github.com/Halbert-Nascimento)
- LinkedIn: [Halbert-Nascimento](https://linkedin.com/in/halbert-nascimento)

---

<div align="center">
  <p>Feito com ❤️ e ☕</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>
