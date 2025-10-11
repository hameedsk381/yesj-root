#!/bin/bash

# Environment Variables Setup Script

echo "Setting up environment variables..."

# Check if we're in the project root
if [ ! -d "client" ] || [ ! -d "server" ]; then
    echo "Error: Please run this script from the project root directory"
    exit 1
fi

# Copy client environment files if they don't exist
if [ ! -f "client/.env" ]; then
    echo "Creating client/.env from example..."
    cp client/.env.example client/.env
fi

if [ ! -f "client/.env.development" ]; then
    echo "Creating client/.env.development from example..."
    cp client/.env.example client/.env.development
fi

if [ ! -f "client/.env.production" ]; then
    echo "Creating client/.env.production from example..."
    cp client/.env.example client/.env.production
fi

if [ ! -f "client/.env.staging" ]; then
    echo "Creating client/.env.staging from example..."
    cp client/.env.example client/.env.staging
fi

# Copy server environment files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "Creating server/.env from example..."
    cp server/.env.example server/.env
fi

if [ ! -f "server/.env.development" ]; then
    echo "Creating server/.env.development from example..."
    cp server/.env.example server/.env.development
fi

if [ ! -f "server/.env.production" ]; then
    echo "Creating server/.env.production from example..."
    cp server/.env.example server/.env.production
fi

if [ ! -f "server/.env.staging" ]; then
    echo "Creating server/.env.staging from example..."
    cp server/.env.example server/.env.staging
fi

echo "Environment setup complete!"
echo "Please review and modify the .env files as needed for your setup."
echo "Remember to never commit sensitive data to version control."