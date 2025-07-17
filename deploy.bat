@echo off
REM Script para deploy no Windows
REM Uso: deploy.bat

echo 🚀 Iniciando deploy do DigiteMais...

REM Verificar se Docker está rodando
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker não está rodando. Inicie o Docker e tente novamente.
    pause
    exit /b 1
)

REM Parar containers existentes
echo 📦 Parando containers existentes...
docker-compose -f docker-compose.nginx.yml down

REM Build da nova imagem
echo 🔨 Fazendo build da aplicação...
docker-compose -f docker-compose.nginx.yml build --no-cache

REM Subir os containers
echo 🚀 Iniciando containers...
docker-compose -f docker-compose.nginx.yml up -d

REM Aguardar containers ficarem prontos
echo ⏳ Aguardando containers ficarem prontos...
timeout /t 10 /nobreak >nul

REM Verificar status
echo 📊 Verificando status dos containers...
docker-compose -f docker-compose.nginx.yml ps

REM Health check
echo 🏥 Fazendo health check...
timeout /t 5 /nobreak >nul

curl -f http://localhost/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Deploy realizado com sucesso!
    echo 🌐 Aplicação disponível em: http://localhost
    echo 📊 Health check: http://localhost/api/health
) else (
    echo ❌ Health check falhou. Verificando logs...
    docker-compose -f docker-compose.nginx.yml logs --tail=50
    pause
    exit /b 1
)

echo.
echo ✨ Deploy concluído! Pressione qualquer tecla para continuar...
pause >nul
