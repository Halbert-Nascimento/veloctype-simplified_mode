#!/bin/bash

# ========================================================================
# Script de Configuração SSL/HTTPS - DigiteMais
# ========================================================================

set -e  # Parar em caso de erro

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
DOMAIN="digitemais.click"
WWW_DOMAIN="www.digitemais.click"
EMAIL="seu-email@exemplo.com"  # ALTERE ESTE EMAIL
PROJECT_DIR="/opt/apps/digitemais"
SSL_DIR="$PROJECT_DIR/ssl"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE} 🔒 Configuração SSL - DigiteMais${NC}"
echo -e "${BLUE}========================================${NC}"

# Função para imprimir status
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se está rodando como root
if [[ $EUID -ne 0 ]]; then
   print_error "Este script deve ser executado como root (use sudo)"
   exit 1
fi

# Verificar se estamos na pasta correta
if [[ ! -f "docker-compose.nginx.yml" ]]; then
    print_error "docker-compose.nginx.yml não encontrado. Execute na pasta do projeto."
    exit 1
fi

print_status "Verificando pré-requisitos..."

# Verificar se certbot está instalado
if ! command -v certbot &> /dev/null; then
    print_warning "Certbot não está instalado. Instalando..."
    apt update
    apt install -y certbot python3-certbot-nginx
    print_status "Certbot instalado com sucesso!"
fi

# Verificar DNS
print_status "Verificando configuração DNS..."
DOMAIN_IP=$(dig +short $DOMAIN)
if [[ -z "$DOMAIN_IP" ]]; then
    print_error "Domínio $DOMAIN não resolve para um IP. Verifique sua configuração DNS."
    exit 1
fi

print_status "Domínio $DOMAIN resolve para: $DOMAIN_IP"

# Verificar se aplicação está rodando
print_status "Verificando se aplicação está rodando..."
if ! docker-compose -f docker-compose.nginx.yml ps | grep -q "digitemais-app.*Up"; then
    print_warning "Aplicação não está rodando. Iniciando..."
    docker-compose -f docker-compose.nginx.yml up -d
    sleep 10
fi

# Verificar se porta 80 responde
if ! curl -s http://localhost/api/health > /dev/null; then
    print_error "Aplicação não responde na porta 80. Verifique os containers."
    docker-compose -f docker-compose.nginx.yml ps
    exit 1
fi

print_status "Aplicação está funcionando!"

# Parar nginx para obter certificado
print_status "Parando Nginx temporariamente para obter certificado..."
docker-compose -f docker-compose.nginx.yml stop nginx

# Obter certificado SSL
print_status "Obtendo certificado SSL do Let's Encrypt..."

# Verificar se certificado já existe
if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    print_warning "Certificado já existe. Deseja renovar? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_status "Pulando obtenção do certificado..."
    else
        print_status "Renovando certificado..."
        certbot renew --force-renewal
    fi
else
    print_status "Obtendo novo certificado..."
    
    # Solicitar email se não foi configurado
    if [[ "$EMAIL" == "seu-email@exemplo.com" ]]; then
        echo -e "${YELLOW}Digite seu email para o Let's Encrypt:${NC}"
        read -r EMAIL
    fi
    
    certbot certonly --standalone \
        -d $DOMAIN \
        -d $WWW_DOMAIN \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --non-interactive
fi

# Verificar se certificado foi criado
if [[ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    print_error "Falha ao obter certificado SSL!"
    exit 1
fi

print_status "Certificado SSL obtido com sucesso!"

# Criar pasta SSL se não existir
mkdir -p $SSL_DIR

# Copiar certificados
print_status "Copiando certificados para pasta do projeto..."
cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/
cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/

# Ajustar permissões
chown $SUDO_USER:$SUDO_USER $SSL_DIR/*
chmod 644 $SSL_DIR/fullchain.pem
chmod 600 $SSL_DIR/privkey.pem

print_status "Certificados copiados e permissões ajustadas!"

# Fazer backup da configuração atual
if [[ -f "nginx.conf" ]]; then
    print_status "Fazendo backup da configuração atual..."
    cp nginx.conf nginx.conf.backup-$(date +%Y%m%d-%H%M%S)
fi

# Usar configuração SSL se disponível
if [[ -f "nginx-ssl.conf" ]]; then
    print_status "Aplicando configuração SSL..."
    cp nginx-ssl.conf nginx.conf
else
    print_warning "nginx-ssl.conf não encontrado. Mantenha configuração atual."
fi

# Reiniciar aplicação com SSL
print_status "Reiniciando aplicação com SSL..."
docker-compose -f docker-compose.nginx.yml up -d

# Aguardar containers iniciarem
sleep 10

# Verificar se containers estão rodando
print_status "Verificando status dos containers..."
docker-compose -f docker-compose.nginx.yml ps

# Testar HTTPS
print_status "Testando configuração HTTPS..."
sleep 5

if curl -k -s https://localhost/api/health > /dev/null; then
    print_status "✅ HTTPS funcionando localmente!"
else
    print_error "❌ HTTPS não está funcionando localmente"
fi

if curl -s https://$DOMAIN/api/health > /dev/null; then
    print_status "✅ HTTPS funcionando via domínio!"
else
    print_warning "⚠️ HTTPS via domínio pode demorar alguns minutos para funcionar (propagação DNS)"
fi

# Testar redirect HTTP -> HTTPS
HTTP_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN)
if [[ "$HTTP_RESPONSE" == "301" ]]; then
    print_status "✅ Redirect HTTP → HTTPS funcionando!"
else
    print_warning "⚠️ Redirect HTTP → HTTPS pode não estar funcionando (código: $HTTP_RESPONSE)"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN} 🎉 SSL CONFIGURADO COM SUCESSO!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}URLs disponíveis:${NC}"
echo -e "  🌐 Site: https://$DOMAIN"
echo -e "  🌐 Site (www): https://$WWW_DOMAIN"
echo -e "  ⚕️ Health: https://$DOMAIN/api/health"
echo ""
echo -e "${BLUE}Verificações recomendadas:${NC}"
echo -e "  🔍 SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo -e "  🔒 SSL Checker: https://www.sslchecker.com/sslchecker"
echo ""
echo -e "${BLUE}Próximos passos:${NC}"
echo -e "  📅 Configurar renovação automática (cron job)"
echo -e "  📊 Configurar monitoramento"
echo -e "  🔒 Testar no navegador e verificar ícone de cadeado"
echo ""

# Configurar renovação automática
print_status "Configurando renovação automática..."

# Criar script de renovação
cat > /usr/local/bin/renew-digitemais-ssl.sh << 'EOF'
#!/bin/bash

PROJECT_DIR="/opt/apps/digitemais"
LOG_FILE="/var/log/digitemais-ssl-renewal.log"

echo "$(date): Iniciando renovação SSL DigiteMais..." >> $LOG_FILE

cd $PROJECT_DIR

# Parar Nginx
docker-compose -f docker-compose.nginx.yml stop nginx

# Renovar certificados
if certbot renew --quiet; then
    echo "$(date): Certificados renovados com sucesso" >> $LOG_FILE
    
    # Copiar novos certificados
    cp /etc/letsencrypt/live/digitemais.click/fullchain.pem ./ssl/
    cp /etc/letsencrypt/live/digitemais.click/privkey.pem ./ssl/
    
    # Ajustar permissões
    chown $(stat -c '%U:%G' .) ./ssl/*
    chmod 644 ./ssl/fullchain.pem
    chmod 600 ./ssl/privkey.pem
    
    echo "$(date): Certificados copiados" >> $LOG_FILE
else
    echo "$(date): Erro na renovação" >> $LOG_FILE
fi

# Reiniciar Nginx
docker-compose -f docker-compose.nginx.yml start nginx

echo "$(date): Renovação SSL concluída" >> $LOG_FILE
EOF

chmod +x /usr/local/bin/renew-digitemais-ssl.sh

# Adicionar ao cron (verificar a cada 12 horas)
CRON_JOB="0 */12 * * * /usr/local/bin/renew-digitemais-ssl.sh"
(crontab -l 2>/dev/null | grep -v "renew-digitemais-ssl"; echo "$CRON_JOB") | crontab -

print_status "✅ Renovação automática configurada!"

echo ""
echo -e "${GREEN}🔒 Configuração SSL completa!${NC}"
echo -e "${BLUE}Logs de renovação em: /var/log/digitemais-ssl-renewal.log${NC}"
