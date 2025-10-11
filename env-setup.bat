@echo off
REM Environment Variables Setup Script for Windows

echo Setting up environment variables...

REM Check if we're in the project root
if not exist "client" (
    echo Error: Please run this script from the project root directory
    pause
    exit /b 1
)

if not exist "server" (
    echo Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Copy client environment files if they don't exist
if not exist "client\.env" (
    echo Creating client\.env from example...
    copy "client\.env.example" "client\.env"
)

if not exist "client\.env.development" (
    echo Creating client\.env.development from example...
    copy "client\.env.example" "client\.env.development"
)

if not exist "client\.env.production" (
    echo Creating client\.env.production from example...
    copy "client\.env.example" "client\.env.production"
)

if not exist "client\.env.staging" (
    echo Creating client\.env.staging from example...
    copy "client\.env.example" "client\.env.staging"
)

REM Copy server environment files if they don't exist
if not exist "server\.env" (
    echo Creating server\.env from example...
    copy "server\.env.example" "server\.env"
)

if not exist "server\.env.development" (
    echo Creating server\.env.development from example...
    copy "server\.env.example" "server\.env.development"
)

if not exist "server\.env.production" (
    echo Creating server\.env.production from example...
    copy "server\.env.example" "server\.env.production"
)

if not exist "server\.env.staging" (
    echo Creating server\.env.staging from example...
    copy "server\.env.example" "server\.env.staging"
)

echo Environment setup complete!
echo Please review and modify the .env files as needed for your setup.
echo Remember to never commit sensitive data to version control.

pause