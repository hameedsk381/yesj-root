# Docker Deployment for YESJ Project

This document explains how to deploy the YESJ project using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10 or higher
- Docker Compose 1.29 or higher

## Project Structure

The project consists of three main services:
1. **MongoDB** - Database service
2. **Backend** - Node.js Express API server
3. **Frontend** - React/Vite client application

## Deployment Options

### Production Deployment

To deploy the application in production mode:

```bash
docker-compose up -d
```

This will:
- Build and start all services
- Use production-ready configurations
- Serve the frontend on port 80
- Serve the backend API on port 5000
- Persist MongoDB data in a Docker volume

### Development Deployment

To deploy the application in development mode with hot reloading:

```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

This will:
- Use development Dockerfiles with hot reloading
- Mount source code volumes for live updates
- Serve the frontend on port 3000
- Expose MongoDB on port 27017 for direct access

## Environment Variables

The following environment variables can be configured:

### MongoDB
- `MONGO_USERNAME` - MongoDB root username (default: admin)
- `MONGO_PASSWORD` - MongoDB root password (default: password)

### Backend
- `NODE_ENV` - Node environment (production/development)
- `PORT` - Port to run the backend server on (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## Service URLs

After deployment, the services will be available at:

- **Frontend**: http://localhost (or http://localhost:3000 for development)
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://admin:password@localhost:27017/yesj

## Useful Commands

### View logs
```bash
docker-compose logs -f [service_name]
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes
```bash
docker-compose down -v
```

### Rebuild services
```bash
docker-compose build
```

### Access MongoDB shell
```bash
docker exec -it yesj_mongodb mongosh -u admin -p password
```

## Data Persistence

MongoDB data is persisted in a Docker volume named `yesj_mongodb_data`. This ensures data is retained even when containers are destroyed.

To backup the data:
```bash
docker run --rm -v yesj_mongodb_data:/data/db -v $(pwd):/backup alpine tar czf /backup/mongodb_backup.tar.gz -C /data db
```

To restore the data:
```bash
docker run --rm -v yesj_mongodb_data:/data/db -v $(pwd):/backup alpine tar xzf /backup/mongodb_backup.tar.gz -C /data
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: If ports 80, 5000, or 27017 are already in use, modify the port mappings in docker-compose.yml

2. **Permission issues**: Ensure Docker has the necessary permissions to access the project directories

3. **Build failures**: Make sure all dependencies are correctly specified in package.json files

### Logs

Check the logs for each service to diagnose issues:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```