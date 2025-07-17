# ===================================================================
# ESTÁGIO 1: Construção da aplicação
# ===================================================================
FROM node:20-alpine AS builder

# Instalar dependências necessárias para build
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar arquivos de dependências primeiro (melhor cache do Docker)
COPY package.json package-lock.json* ./

# Instalar dependências apenas de produção + devDependencies para build
RUN npm ci --only=production --ignore-scripts && \
    npm ci --only=development --ignore-scripts

# Copiar código fonte
COPY . .

# Desabilitar telemetria do Next.js para build mais rápido
ENV NEXT_TELEMETRY_DISABLED 1

# Build da aplicação
RUN npm run build

# ===================================================================
# ESTÁGIO 2: Produção otimizada
# ===================================================================
FROM node:20-alpine AS runner

# Instalar dependências necessárias para runtime
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Configurar variáveis de ambiente para produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Copiar arquivos necessários do estágio de build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Definir usuário não-root
USER nextjs

# Expor porta
EXPOSE 3000

# Health check para monitoramento
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Comando de inicialização
CMD ["node", "server.js"]