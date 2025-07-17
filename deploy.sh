#!/bin/bash

# Script para build e deploy em produção
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy do DigiteMais..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    error "Docker não está rodando. Inicie o Docker e tente novamente."
    exit 1
fi

# Detectar comando do Docker Compose
COMPOSE_CMD=""
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
elif docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    error "Docker Compose não encontrado. Instale docker-compose ou use Docker Desktop."
    exit 1
fi

log "Usando comando: $COMPOSE_CMD"

# Parar containers existentes
log "Parando containers existentes..."
$COMPOSE_CMD -f docker-compose.nginx.yml down || true

# Limpar imagens antigas (opcional)
read -p "Deseja remover imagens antigas? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log "Removendo imagens antigas..."
    docker image prune -f
    docker system prune -f
fi

# Build da nova imagem
log "Fazendo build da aplicação..."
$COMPOSE_CMD -f docker-compose.nginx.yml build --no-cache

# Subir os containers
log "Iniciando containers..."
$COMPOSE_CMD -f docker-compose.nginx.yml up -d

# Aguardar containers ficarem saudáveis
log "Aguardando containers ficarem prontos..."
sleep 10

# Verificar status
log "Verificando status dos containers..."
$COMPOSE_CMD -f docker-compose.nginx.yml ps

# Health check
log "Fazendo health check..."
sleep 5

if curl -f http://localhost/api/health > /dev/null 2>&1; then
    log "✅ Deploy realizado com sucesso!"
    log "🌐 Aplicação disponível em: http://localhost"
    log "📊 Health check: http://localhost/api/health"
else
    error "❌ Health check falhou. Verificando logs..."
    $COMPOSE_CMD -f docker-compose.nginx.yml logs --tail=50
    exit 1
fi

# Mostrar logs em tempo real (opcional)
read -p "Deseja ver os logs em tempo real? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    $COMPOSE_CMD -f docker-compose.nginx.yml logs -f
fi
