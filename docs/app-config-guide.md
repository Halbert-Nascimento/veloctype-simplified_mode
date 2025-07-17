# 📋 Documentação do Sistema de Configuração

## 🎯 Visão Geral

O sistema de configuração do VelocType centraliza todas as configurações da aplicação em um único arquivo JSON. Isso facilita a manutenção, permite personalização sem alterar código e torna o sistema mais flexível.

## 📁 Arquivos do Sistema de Configuração

### 🔧 `src/config/app-config.json`
**Arquivo principal com todas as configurações da aplicação**

### 🎣 `src/hooks/useAppConfig.ts`
**Hook React para acessar e gerenciar configurações**

---

## 📖 Estrutura Detalhada do app-config.json

### 🏢 `app` - Informações Básicas da Aplicação

```json
{
  "app": {
    "name": "VelocType",                    // Nome exibido na interface
    "version": "1.0.0",                     // Versão atual da aplicação
    "description": "Aplicativo de treino de digitação"  // Descrição para SEO/meta tags
  }
}
```

**O que controla:**
- Título que aparece na aba do navegador
- Nome exibido no header da aplicação
- Versão para controle de updates
- Descrição para motores de busca

**Quando modificar:**
- Ao lançar nova versão (atualizar `version`)
- Ao renomear a aplicação (alterar `name`)
- Ao melhorar SEO (ajustar `description`)

---

### 🎁 `features` - Recursos e Funcionalidades

#### 💎 Premium
```json
{
  "premium": {
    "enabled": true,                        // Se o sistema premium está ativo
    "categories": [                         // Categorias que exigem premium
      "programacao", 
      "numeros", 
      "misto", 
      "simbolos"
    ],
    "features": [                          // Recursos exclusivos premium
      "customTexts",      // Textos personalizados
      "detailedStats",    // Estatísticas detalhadas
      "exportData"        // Exportar dados
    ]
  }
}
```

**O que controla:**
- Quais categorias ficam bloqueadas para usuários gratuitos
- Quais recursos avançados estão disponíveis
- Se o sistema de assinatura está ativo

**Como usar:**
- `enabled: false` = desativa completamente o sistema premium
- Remover categoria do array = torna ela gratuita
- Adicionar nova feature = criar novo recurso premium

#### 🔊 Som
```json
{
  "sound": {
    "enabled": true,                        // Se sons estão habilitados
    "errorSoundUrl": "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae0b2.mp3"
  }
}
```

**O que controla:**
- Se a aplicação pode reproduzir sons
- URL do som de erro de digitação

**Personalizações:**
- Trocar `errorSoundUrl` por som personalizado
- `enabled: false` = remove todos os sons da aplicação

#### 🎨 Temas
```json
{
  "themes": {
    "default": "light",                     // Tema padrão ao carregar
    "available": ["light", "dark", "blue", "green"]  // Temas disponíveis
  }
}
```

**O que controla:**
- Qual tema aparece quando o usuário abre a aplicação pela primeira vez
- Quais opções de tema estão disponíveis no seletor

**Como expandir:**
```json
{
  "themes": {
    "default": "dark",
    "available": ["light", "dark", "blue", "green", "purple", "orange"]
  }
}
```

---

### ⚙️ `defaults` - Configurações Padrão da Interface

```json
{
  "defaults": {
    "testDuration": 60,          // Duração padrão dos testes (segundos)
    "fontSize": 1.0,             // Tamanho da fonte padrão (1.0 = 100%)
    "showErrors": true,          // Mostrar erros durante digitação
    "colorFeedback": true,       // Feedback visual colorido
    "soundFeedback": false,      // Feedback sonoro (desabilitado por padrão)
    "autoFocus": true            // Focar automaticamente no campo de digitação
  }
}
```

**Explicação de cada configuração:**

| Configuração | O que faz | Valores aceitos | Exemplo de uso |
|--------------|-----------|----------------|----------------|
| `testDuration` | Quantos segundos dura um teste padrão | Números (30, 60, 120, etc.) | 60 = teste de 1 minuto |
| `fontSize` | Tamanho relativo da fonte | 0.8 a 2.0 | 1.2 = fonte 20% maior |
| `showErrors` | Exibe erros em tempo real | true/false | false = não mostra erros |
| `colorFeedback` | Colorir letras certas/erradas | true/false | true = verde/vermelho |
| `soundFeedback` | Sons ao digitar | true/false | true = emite sons |
| `autoFocus` | Cursor ativo automático | true/false | false = usuário deve clicar |

**Quando ajustar:**
- Usuários reclamam que testes são muito longos/curtos → ajustar `testDuration`
- Interface difícil de ler → aumentar `fontSize`
- Muitas distrações → desabilitar `colorFeedback` ou `soundFeedback`

---

### 🚧 `limits` - Limites e Restrições do Sistema

```json
{
  "limits": {
    "maxLocalResults": 50,       // Máximo de resultados salvos localmente
    "maxDisplayResults": 4,      // Quantos resultados mostrar na tela
    "minFontSize": 0.8,          // Menor tamanho de fonte permitido
    "maxFontSize": 2.0,          // Maior tamanho de fonte permitido
    "maxTextLength": 500         // Máximo de caracteres por texto
  }
}
```

**Por que esses limites existem:**

- **`maxLocalResults`**: Evita que o localStorage fique cheio
- **`maxDisplayResults`**: Mantém a interface limpa
- **`minFontSize`**: Garante legibilidade mínima
- **`maxFontSize`**: Evita que a fonte quebre o layout
- **`maxTextLength`**: Previne textos excessivamente longos

**Como ajustar para melhor performance:**
```json
{
  "limits": {
    "maxLocalResults": 100,      // Mais história para usuários avançados
    "maxDisplayResults": 8,      // Mais resultados em telas grandes
    "minFontSize": 0.9,          // Fonte um pouco maior para acessibilidade
    "maxFontSize": 1.8,          // Limite menor para manter layout
    "maxTextLength": 300         // Textos mais curtos para mobile
  }
}
```

---

### 🌐 `api` - Configurações da API Externa

```json
{
  "api": {
    "baseUrl": "https://api.veloctype.com",    // URL base da API
    "endpoints": {
      "texts": "/texts",                       // Endpoint para buscar textos
      "categories": "/categories",             // Endpoint para categorias
      "results": "/results",                   // Endpoint para salvar resultados
      "user": "/user"                          // Endpoint para dados do usuário
    }
  }
}
```

**Ambientes diferentes:**
```json
// Desenvolvimento
{
  "api": {
    "baseUrl": "http://localhost:3001",
    "endpoints": { ... }
  }
}

// Produção
{
  "api": {
    "baseUrl": "https://api.veloctype.com",
    "endpoints": { ... }
  }
}

// Teste
{
  "api": {
    "baseUrl": "https://test-api.veloctype.com",
    "endpoints": { ... }
  }
}
```

**URLs completas resultantes:**
- Textos: `https://api.veloctype.com/texts`
- Categorias: `https://api.veloctype.com/categories`
- Resultados: `https://api.veloctype.com/results`
- Usuário: `https://api.veloctype.com/user`

---

### 💾 `database` - Configurações de Banco de Dados

```json
{
  "database": {
    "migration": {
      "enabled": true,              // Se migrações automáticas estão ativas
      "backupLocal": true,          // Se deve fazer backup antes de migrar
      "syncOnLoad": false           // Se deve sincronizar ao carregar a app
    }
  }
}
```

**Explicação dos comportamentos:**

- **`enabled: true`**: Sistema verifica e executa migrações automaticamente
- **`backupLocal: true`**: Salva backup dos dados antes de mudanças
- **`syncOnLoad: false`**: Não sincroniza com servidor ao abrir a aplicação

**Configurações recomendadas por ambiente:**

```json
// Desenvolvimento
{
  "migration": {
    "enabled": true,
    "backupLocal": true,
    "syncOnLoad": true      // Sempre sincroniza para pegar dados atualizados
  }
}

// Produção
{
  "migration": {
    "enabled": true,
    "backupLocal": true,
    "syncOnLoad": false     // Não sincroniza para não sobrecarregar servidor
  }
}
```

---

## 🔧 Como Modificar Configurações

### ✏️ Alterações Simples
Para mudanças pontuais, edite diretamente o `app-config.json`:

```json
{
  "defaults": {
    "testDuration": 120,     // Mudou de 60 para 120 segundos
    "fontSize": 1.1          // Mudou de 1.0 para 1.1 (fonte 10% maior)
  }
}
```

### 🔄 Alterações Programáticas
Use o hook `useAppConfig` (será criado) para mudanças dinâmicas:

```typescript
const { config, updateConfig } = useAppConfig()

// Alterar duração do teste baseado na preferência do usuário
updateConfig('defaults.testDuration', userPreference.duration)

// Habilitar/desabilitar premium
updateConfig('features.premium.enabled', false)
```

### 🌍 Configurações por Ambiente
Crie arquivos específicos para cada ambiente:

```
src/config/
├── app-config.json          # Configuração base
├── app-config.dev.json      # Sobrescreve para desenvolvimento
├── app-config.prod.json     # Sobrescreve para produção
└── app-config.test.json     # Sobrescreve para testes
```

---

## 🚨 Cuidados e Limitações

### ⚠️ **Não Altere Durante Runtime**
```typescript
// ❌ ERRADO - pode quebrar a aplicação
config.api.baseUrl = 'nova-url'

// ✅ CORRETO - use a função apropriada
updateConfig('api.baseUrl', 'nova-url')
```

### 🔒 **Validação de Tipos**
```typescript
// ❌ ERRADO - tipo incompatível
updateConfig('defaults.testDuration', 'sessenta')

// ✅ CORRETO - tipo correto
updateConfig('defaults.testDuration', 60)
```

### 💾 **Backup Antes de Mudanças Grandes**
```bash
# Sempre faça backup antes de mudanças significativas
cp app-config.json app-config.backup.json
```

### 🧪 **Teste em Ambiente de Desenvolvimento**
- Nunca mude configurações diretamente em produção
- Teste todas as alterações localmente primeiro
- Verifique se não quebra funcionalidades existentes

---

## 📋 Checklist de Manutenção

### ✅ **Verificações Regulares (Mensais)**
- [ ] Verificar se URLs da API ainda estão funcionais
- [ ] Conferir se limites estão adequados ao uso atual
- [ ] Validar se configurações padrão ainda fazem sentido

### ✅ **Verificações de Release (A cada versão)**
- [ ] Atualizar `app.version` para nova versão
- [ ] Revisar configurações de premium se houver mudanças
- [ ] Verificar se novos recursos precisam de configuração

### ✅ **Verificações de Performance (Trimestrais)**
- [ ] Analisar se `maxLocalResults` pode ser otimizado
- [ ] Verificar se `syncOnLoad` está impactando performance
- [ ] Revisar limites baseado no uso real dos usuários

---

## 🎯 Casos de Uso Comuns

### 🎮 **Desabilitar Sistema Premium**
```json
{
  "features": {
    "premium": {
      "enabled": false,
      "categories": [],
      "features": []
    }
  }
}
```

### 🔊 **Remover Todos os Sons**
```json
{
  "features": {
    "sound": {
      "enabled": false,
      "errorSoundUrl": ""
    }
  },
  "defaults": {
    "soundFeedback": false
  }
}
```

### 📱 **Otimizar para Mobile**
```json
{
  "defaults": {
    "fontSize": 1.2,
    "testDuration": 30
  },
  "limits": {
    "maxDisplayResults": 2,
    "maxTextLength": 200
  }
}
```

### 🖥️ **Otimizar para Desktop**
```json
{
  "defaults": {
    "fontSize": 1.0,
    "testDuration": 120
  },
  "limits": {
    "maxDisplayResults": 6,
    "maxTextLength": 500
  }
}
```

---

**💡 Dica Final**: Este arquivo de configuração é o "centro de controle" da aplicação. Qualquer comportamento que você queira mudar sem alterar código provavelmente pode ser controlado aqui!
