#!/bin/bash

# YESJ Setup Script

echo "Setting up YESJ project..."

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null
then
    echo "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start services
echo "Building and starting services..."
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 30

# Check if services are running
echo "Checking service status..."
docker-compose ps

echo "Setup complete!"
echo "Access the application at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:5000"
echo "- MongoDB: mongodb://admin:password@localhost:27017/yesj"