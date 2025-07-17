# 📚 Documentação do Hook useTypingTexts

## 🎯 Visão Geral

O `useTypingTexts` é o hook principal para gerenciar todos os textos de digitação no VelocType. Ele funciona como uma "biblioteca" que organiza e fornece acesso fácil aos textos de exercícios.

## 🏗️ Arquitetura Simples

```
typing-texts.json → useTypingTexts.ts → Componentes React
     (dados)           (lógica)          (interface)
```

### Como os Dados Fluem:
1. **JSON**: Arquivo com todos os textos e categorias
2. **Hook**: Carrega os dados e oferece funções úteis
3. **Componentes**: Usam o hook para mostrar textos na tela

## 📖 Como Usar nos Componentes

### Exemplo Básico
```typescript
import { useTypingTexts } from '@/hooks/useTypingTexts'

function MinhaTelaDeExercicio() {
  // 1. Importa o hook
  const { texts, getRandomText, getTextsByCategory } = useTypingTexts()
  
  // 2. Usa as funções conforme necessário
  const textoAleatorio = getRandomText()
  const textosDeProgramacao = getTextsByCategory('programacao')
  
  return (
    <div>
      <h1>Exercício de Digitação</h1>
      {textoAleatorio && (
        <p>{textoAleatorio.content}</p>
      )}
    </div>
  )
}
```

### Casos de Uso Comuns

#### 1. Mostrar Texto Aleatório
```typescript
const { getRandomText } = useTypingTexts()

// Qualquer texto aleatório
const textoQualquer = getRandomText()

// Texto aleatório de uma categoria específica
const textoProgramacao = getRandomText('programacao')
```

#### 2. Filtrar por Dificuldade
```typescript
const { getTextsByDifficulty } = useTypingTexts()

// Para iniciantes
const textosFaceis = getTextsByDifficulty('easy')

// Para usuários avançados
const textosExpert = getTextsByDifficulty('expert')
```

#### 3. Buscar Textos
```typescript
const { searchTexts } = useTypingTexts()

// Busca por palavra-chave
const resultados = searchTexts('javascript')
// Retorna todos os textos que mencionam "javascript"
```

#### 4. Listar Categorias Disponíveis
```typescript
const { getAvailableCategories } = useTypingTexts()

// Para usuário gratuito
const categoriasGratuitas = getAvailableCategories(false)

// Para usuário premium
const todasCategorias = getAvailableCategories(true)
```

## 🔧 Funções Disponíveis

### Funções de Busca
| Função | O que faz | Exemplo |
|--------|-----------|---------|
| `getTextsByCategory()` | Busca textos de uma categoria | `getTextsByCategory('literatura')` |
| `getTextsByDifficulty()` | Busca textos por dificuldade | `getTextsByDifficulty('easy')` |
| `getTextsBySubcategory()` | Busca textos de subcategoria | `getTextsBySubcategory('javascript')` |
| `getRandomText()` | Pega texto aleatório | `getRandomText()` |
| `searchTexts()` | Busca por palavra-chave | `searchTexts('função')` |
| `getTextById()` | Busca texto específico | `getTextById('texto_001')` |

### Funções de Categoria
| Função | O que faz | Exemplo |
|--------|-----------|---------|
| `getCategoryById()` | Busca categoria por ID | `getCategoryById('programacao')` |
| `getAvailableCategories()` | Lista categorias disponíveis | `getAvailableCategories(true)` |

### Dados Disponíveis
| Propriedade | O que contém | Tipo |
|-------------|--------------|------|
| `texts` | Todos os textos | `TypingText[]` |
| `categories` | Todas as categorias | `TextCategory[]` |
| `metadata` | Informações gerais | `TextsMetadata` |

## 🛠️ Funções Utilitárias

### analyzeText()
Analisa características de um texto:

```typescript
import { analyzeText } from '@/hooks/useTypingTexts'

const resultado = analyzeText('function soma(a, b) { return a + b; }')
console.log(resultado)
// {
//   wordCount: 7,
//   characterCount: 39,
//   hasNumbers: false,
//   hasSymbols: true
// }
```

### estimateWPM()
Estima velocidade de digitação esperada:

```typescript
import { estimateWPM } from '@/hooks/useTypingTexts'

const wpm = estimateWPM('código com símbolos @#$', 'medium')
console.log(wpm) // ~23 WPM (reduzido devido aos símbolos)
```

## 📁 Estrutura dos Dados

### TypingText (Texto Individual)
```typescript
{
  id: "texto_001",
  categoryId: "programacao",
  subcategory: "javascript",
  title: "Função Simples",
  content: "function soma(a, b) { return a + b; }",
  difficulty: "medium",
  estimatedWPM: 25,
  wordCount: 7,
  characterCount: 39,
  hasNumbers: false,
  hasSymbols: true,
  language: "pt-BR",
  tags: ["javascript", "função", "programação"]
}
```

### TextCategory (Categoria)
```typescript
{
  id: "programacao",
  name: "Programação",
  description: "Textos sobre desenvolvimento de software",
  icon: "💻",
  premium: false,
  difficulty: "medium",
  color: "#3b82f6",
  subcategories: ["javascript", "python", "css"]
}
```

## 🚨 Problemas Comuns e Soluções

### Problema: Hook retorna arrays vazios
**Causa**: Arquivo `typing-texts.json` não foi encontrado ou está malformado

**Solução**: 
1. Verificar se o arquivo existe em `src/data/typing-texts.json`
2. Validar se o JSON está bem formatado
3. Conferir se as propriedades `categories`, `texts` e `metadata` existem

### Problema: Função retorna null inesperadamente
**Causa**: ID ou parâmetro inválido

**Solução**:
```typescript
// ❌ Errado
const texto = getTextById('id-inexistente')
console.log(texto.content) // Erro!

// ✅ Correto
const texto = getTextById('id-inexistente')
if (texto) {
  console.log(texto.content)
} else {
  console.log('Texto não encontrado')
}
```

### Problema: Busca não encontra resultados
**Causa**: Busca case-sensitive ou caracteres especiais

**Solução**:
```typescript
// A função já é case-insensitive, mas verifique:
const resultados = searchTexts('JavaScript') // Funciona
const resultados2 = searchTexts('javascript') // Também funciona
```

## 🎓 Exemplos Práticos

### Exemplo 1: Tela de Seleção de Categoria
```typescript
function TelaSelecaoCategoria() {
  const { categories, getAvailableCategories } = useTypingTexts()
  const [usuarioEhPremium, setUsuarioEhPremium] = useState(false)
  
  const categoriasDisponiveis = getAvailableCategories(usuarioEhPremium)
  
  return (
    <div>
      <h2>Escolha uma Categoria</h2>
      {categoriasDisponiveis.map(categoria => (
        <div key={categoria.id}>
          <span>{categoria.icon}</span>
          <h3>{categoria.name}</h3>
          <p>{categoria.description}</p>
          {categoria.premium && <span>PREMIUM</span>}
        </div>
      ))}
    </div>
  )
}
```

### Exemplo 2: Sistema de Busca
```typescript
function SistemaBusca() {
  const { searchTexts } = useTypingTexts()
  const [termoBusca, setTermoBusca] = useState('')
  const [resultados, setResultados] = useState([])
  
  useEffect(() => {
    if (termoBusca.length > 2) {
      const novosResultados = searchTexts(termoBusca)
      setResultados(novosResultados)
    }
  }, [termoBusca])
  
  return (
    <div>
      <input 
        value={termoBusca}
        onChange={(e) => setTermoBusca(e.target.value)}
        placeholder="Buscar textos..."
      />
      
      {resultados.map(texto => (
        <div key={texto.id}>
          <h4>{texto.title}</h4>
          <p>{texto.content.substring(0, 100)}...</p>
          <span>Dificuldade: {texto.difficulty}</span>
        </div>
      ))}
    </div>
  )
}
```

### Exemplo 3: Gerador de Exercício Personalizado
```typescript
function GeradorExercicio() {
  const { getTextsByDifficulty, getRandomText } = useTypingTexts()
  const [dificuldadeSelecionada, setDificuldadeSelecionada] = useState('easy')
  const [textoAtual, setTextoAtual] = useState(null)
  
  const gerarNovoTexto = () => {
    const textosDisponiveis = getTextsByDifficulty(dificuldadeSelecionada)
    if (textosDisponiveis.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * textosDisponiveis.length)
      setTextoAtual(textosDisponiveis[indiceAleatorio])
    }
  }
  
  return (
    <div>
      <select 
        value={dificuldadeSelecionada} 
        onChange={(e) => setDificuldadeSelecionada(e.target.value)}
      >
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
        <option value="expert">Expert</option>
      </select>
      
      <button onClick={gerarNovoTexto}>
        Novo Exercício
      </button>
      
      {textoAtual && (
        <div>
          <h3>{textoAtual.title}</h3>
          <p>{textoAtual.content}</p>
          <small>WPM esperado: {textoAtual.estimatedWPM}</small>
        </div>
      )}
    </div>
  )
}
```

## 📝 Checklist para Manutenção

### Ao Adicionar Novos Textos:
- [ ] Verificar se o ID é único
- [ ] Confirmar que a categoria existe
- [ ] Usar `analyzeText()` para preencher estatísticas
- [ ] Usar `estimateWPM()` para calcular velocidade esperada
- [ ] Adicionar tags relevantes para busca

### Ao Modificar o Hook:
- [ ] Manter compatibilidade com código existente
- [ ] Atualizar esta documentação
- [ ] Testar todas as funções
- [ ] Verificar performance com muitos textos

### Ao Fazer Debug:
- [ ] Verificar se `typing-texts.json` está carregando
- [ ] Conferir se IDs estão corretos
- [ ] Validar se arrays não estão vazios
- [ ] Testar funções de busca com dados reais

---

**💡 Dica**: Este hook é o coração do sistema de textos. Se algo não funciona com textos, provavelmente o problema está aqui ou no arquivo JSON!
