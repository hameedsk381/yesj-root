@echo off
REM YESJ Setup Script for Windows

echo Setting up YESJ project...

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Build and start services
echo Building and starting services...
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

REM Wait for services to start
echo Waiting for services to start...
timeout /t 30 /nobreak >nul

REM Check if services are running
echo Checking service status...
docker-compose ps

echo Setup complete!
echo Access the application at:
echo - Frontend: http://localhost:3000
echo - Backend API: http://localhost:5000
echo - MongoDB: mongodb://admin:password@localhost:27017/yesj

pause