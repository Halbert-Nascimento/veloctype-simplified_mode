#!/bin/bash

# ========================================================================
# Script de Update Rápido - DigiteMais (Sem afetar SSL)
# ========================================================================

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Detectar versão do Docker Compose
if command -v "docker-compose" &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif command -v "docker" &> /dev/null && docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker compose"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE} 🔄 Update Rápido - DigiteMais${NC}"
echo -e "${BLUE}========================================${NC}"

# Verificar se estamos na pasta correta
if [[ ! -f "docker-compose.nginx.yml" ]]; then
    echo -e "${RED}[ERROR]${NC} docker-compose.nginx.yml não encontrado. Execute na pasta do projeto."
    exit 1
fi

echo -e "${YELLOW}Escolha o tipo de update:${NC}"
echo "1) 🔄 Restart simples (apenas reinicia containers)"
echo "2) 🔨 Rebuild aplicação (rebuild + restart do Next.js)"
echo "3) 📥 Git pull + rebuild (atualiza código + rebuild)"
echo "4) 🌐 Restart Nginx (se mudou nginx.conf)"
echo "5) 📊 Ver status dos containers"
echo -e "${YELLOW}Digite sua opção (1-5):${NC} "
read -r OPTION

case $OPTION in
    1)
        echo -e "${BLUE}🔄 Reiniciando containers...${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml restart
        echo -e "${GREEN}✅ Containers reiniciados!${NC}"
        ;;
    2)
        echo -e "${BLUE}🔨 Rebuild da aplicação Next.js...${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml up --build -d digitemais
        echo -e "${GREEN}✅ Aplicação rebuilded e reiniciada!${NC}"
        ;;
    3)
        echo -e "${BLUE}📥 Atualizando código do Git...${NC}"
        git pull
        echo -e "${BLUE}🔨 Rebuild da aplicação...${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml up --build -d digitemais
        echo -e "${GREEN}✅ Código atualizado e aplicação rebuilded!${NC}"
        ;;
    4)
        echo -e "${BLUE}🌐 Reiniciando Nginx...${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml restart nginx
        echo -e "${GREEN}✅ Nginx reiniciado!${NC}"
        ;;
    5)
        echo -e "${BLUE}📊 Status dos containers:${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml ps
        echo
        echo -e "${BLUE}Logs recentes:${NC}"
        $DOCKER_COMPOSE -f docker-compose.nginx.yml logs --tail=10
        ;;
    *)
        echo -e "${RED}Opção inválida!${NC}"
        exit 1
        ;;
esac

echo
echo -e "${BLUE}🔗 Links úteis:${NC}"
echo -e "  🌐 Site: https://digitemais.click"
echo -e "  ⚕️ Health: https://digitemais.click/api/health"

echo
echo -e "${YELLOW}💡 Dica:${NC} O SSL permanece intacto durante updates da aplicação!"
