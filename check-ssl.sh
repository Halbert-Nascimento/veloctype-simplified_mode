#!/bin/bash

# ========================================================================
# Script de Verificação SSL - DigiteMais
# ========================================================================

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

DOMAIN="digitemais.click"
WWW_DOMAIN="www.digitemais.click"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE} 🔍 Verificação SSL - DigiteMais${NC}"
echo -e "${BLUE}========================================${NC}"
echo

# Função para verificar status
check_status() {
    if [[ $1 -eq 0 ]]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $3${NC}"
    fi
}

# 1. Verificar certificados Let's Encrypt
echo -e "${YELLOW}1. Certificados Let's Encrypt:${NC}"
if sudo certbot certificates | grep -q "$DOMAIN"; then
    echo -e "${GREEN}✅ Certificados encontrados${NC}"
    sudo certbot certificates | grep -A 5 "$DOMAIN"
else
    echo -e "${RED}❌ Certificados não encontrados${NC}"
fi
echo

# 2. Verificar arquivos SSL locais
echo -e "${YELLOW}2. Arquivos SSL locais:${NC}"
if [[ -f "ssl/fullchain.pem" && -f "ssl/privkey.pem" ]]; then
    echo -e "${GREEN}✅ Arquivos SSL encontrados${NC}"
    ls -la ssl/
    echo
    echo "Validade do certificado:"
    openssl x509 -in ssl/fullchain.pem -noout -dates
else
    echo -e "${RED}❌ Arquivos SSL não encontrados em ./ssl/${NC}"
fi
echo

# 3. Status dos containers
echo -e "${YELLOW}3. Status dos containers:${NC}"
docker-compose -f docker-compose.nginx.yml ps
echo

# 4. Teste de conectividade HTTPS local
echo -e "${YELLOW}4. Teste HTTPS local:${NC}"
if curl -k -s https://localhost/api/health > /dev/null; then
    echo -e "${GREEN}✅ HTTPS local funcionando${NC}"
    curl -s https://localhost/api/health | head -n 3
else
    echo -e "${RED}❌ HTTPS local não funcionando${NC}"
fi
echo

# 5. Teste de conectividade HTTPS via domínio
echo -e "${YELLOW}5. Teste HTTPS via domínio:${NC}"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/api/health)
if [[ "$HTTP_CODE" == "200" ]]; then
    echo -e "${GREEN}✅ HTTPS via domínio funcionando (código: $HTTP_CODE)${NC}"
    echo "Response:"
    curl -s https://$DOMAIN/api/health | head -n 3
else
    echo -e "${RED}❌ HTTPS via domínio não funcionando (código: $HTTP_CODE)${NC}"
fi
echo

# 6. Teste redirect HTTP → HTTPS
echo -e "${YELLOW}6. Teste redirect HTTP → HTTPS:${NC}"
REDIRECT_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN)
REDIRECT_LOCATION=$(curl -s -I http://$DOMAIN | grep -i location | cut -d' ' -f2 | tr -d '\r')

if [[ "$REDIRECT_CODE" == "301" ]] && [[ "$REDIRECT_LOCATION" == *"https://"* ]]; then
    echo -e "${GREEN}✅ Redirect HTTP → HTTPS funcionando (código: $REDIRECT_CODE)${NC}"
    echo "Location: $REDIRECT_LOCATION"
else
    echo -e "${RED}❌ Redirect HTTP → HTTPS não funcionando${NC}"
    echo "Código: $REDIRECT_CODE"
    echo "Location: $REDIRECT_LOCATION"
fi
echo

# 7. Verificar cadeia SSL
echo -e "${YELLOW}7. Verificação da cadeia SSL:${NC}"
if openssl s_client -servername $DOMAIN -connect $DOMAIN:443 </dev/null 2>/dev/null | openssl x509 -noout -subject > /dev/null; then
    echo -e "${GREEN}✅ Cadeia SSL válida${NC}"
    echo "Certificado para: $(openssl s_client -servername $DOMAIN -connect $DOMAIN:443 </dev/null 2>/dev/null | openssl x509 -noout -subject | cut -d'=' -f3)"
    echo "Válido até: $(openssl s_client -servername $DOMAIN -connect $DOMAIN:443 </dev/null 2>/dev/null | openssl x509 -noout -enddate | cut -d'=' -f2)"
else
    echo -e "${RED}❌ Problema na cadeia SSL${NC}"
fi
echo

# 8. Verificar headers de segurança
echo -e "${YELLOW}8. Headers de segurança:${NC}"
HEADERS=$(curl -s -I https://$DOMAIN)

check_header() {
    if echo "$HEADERS" | grep -qi "$1"; then
        echo -e "${GREEN}✅ $1 presente${NC}"
    else
        echo -e "${YELLOW}⚠️ $1 ausente${NC}"
    fi
}

check_header "Strict-Transport-Security"
check_header "X-Frame-Options"
check_header "X-Content-Type-Options"
check_header "X-XSS-Protection"
echo

# 9. Teste de performance SSL
echo -e "${YELLOW}9. Performance SSL:${NC}"
SSL_TIME=$(curl -w "@-" -o /dev/null -s https://$DOMAIN/api/health <<'EOF'
     time_namelookup:  %{time_namelookup}\n
      time_connect:  %{time_connect}\n
   time_appconnect:  %{time_appconnect}\n
  time_pretransfer:  %{time_pretransfer}\n
     time_redirect:  %{time_redirect}\n
time_starttransfer:  %{time_starttransfer}\n
                   ----------\n
         time_total:  %{time_total}\n
EOF
)
echo "$SSL_TIME"
echo

# 10. Logs do Nginx (últimas 10 linhas)
echo -e "${YELLOW}10. Logs recentes do Nginx:${NC}"
if docker logs nginx-proxy 2>&1 | tail -n 5; then
    echo -e "${GREEN}✅ Logs acessíveis${NC}"
else
    echo -e "${RED}❌ Erro ao acessar logs${NC}"
fi
echo

# 11. Verificação de portas
echo -e "${YELLOW}11. Verificação de portas:${NC}"
if netstat -tulpn | grep -q ":443"; then
    echo -e "${GREEN}✅ Porta 443 (HTTPS) aberta${NC}"
else
    echo -e "${RED}❌ Porta 443 (HTTPS) não está aberta${NC}"
fi

if netstat -tulpn | grep -q ":80"; then
    echo -e "${GREEN}✅ Porta 80 (HTTP) aberta${NC}"
else
    echo -e "${RED}❌ Porta 80 (HTTP) não está aberta${NC}"
fi
echo

# 12. Renovação automática
echo -e "${YELLOW}12. Renovação automática:${NC}"
if crontab -l | grep -q "renew-digitemais-ssl"; then
    echo -e "${GREEN}✅ Renovação automática configurada${NC}"
    echo "Cron job:"
    crontab -l | grep "renew-digitemais-ssl"
else
    echo -e "${YELLOW}⚠️ Renovação automática não configurada${NC}"
fi
echo

# Resumo final
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE} 📊 Resumo da Verificação${NC}"
echo -e "${BLUE}========================================${NC}"

# Testar acesso geral
if curl -s https://$DOMAIN/api/health > /dev/null && [[ $(curl -s -o /dev/null -w "%{http_code}" http://$DOMAIN) == "301" ]]; then
    echo -e "${GREEN}🎉 SSL/HTTPS configurado corretamente!${NC}"
    echo
    echo -e "${BLUE}URLs funcionais:${NC}"
    echo -e "  🌐 https://$DOMAIN"
    echo -e "  🌐 https://$WWW_DOMAIN"
    echo -e "  ⚕️ https://$DOMAIN/api/health"
    echo
    echo -e "${BLUE}Próximas verificações recomendadas:${NC}"
    echo -e "  🔍 SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    echo -e "  🔒 SSL Checker: https://www.sslchecker.com/sslchecker"
    echo -e "  🛡️ Security Headers: https://securityheaders.com/?q=$DOMAIN"
else
    echo -e "${RED}❌ Problemas detectados na configuração SSL${NC}"
    echo
    echo -e "${YELLOW}Ações recomendadas:${NC}"
    echo -e "  1. Verificar se containers estão rodando"
    echo -e "  2. Verificar configuração do nginx.conf"
    echo -e "  3. Verificar se certificados estão válidos"
    echo -e "  4. Verificar logs do Nginx para erros"
fi
echo
