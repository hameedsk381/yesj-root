# Deployment Guide

This document explains how to deploy the YESJ application using various methods.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Methods](#deployment-methods)
  - [Docker Deployment](#docker-deployment)
  - [Manual Deployment](#manual-deployment)
  - [Git-based Deployment](#git-based-deployment)
- [Environment Configuration](#environment-configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring and Logging](#monitoring-and-logging)

## Prerequisites

- Git
- Node.js 18+
- Docker and Docker Compose (for Docker deployment)
- MongoDB (for manual deployment)
- SSH access to deployment server (for manual deployment)

## Deployment Methods

### Docker Deployment

The recommended deployment method uses Docker Compose for containerized deployment.

#### Production Deployment

```bash
# Clone the repository
git clone https://github.com/your-username/yesj.git
cd yesj

# Build and start services
docker-compose up -d

# Check service status
docker-compose ps
```

#### Development Deployment

```bash
# Clone the repository
git clone https://github.com/your-username/yesj.git
cd yesj

# Build and start services with development overrides
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# Check service status
docker-compose ps
```

### Manual Deployment

For manual deployment without Docker:

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set environment variables
export NODE_ENV=production
export PORT=5000
export MONGODB_URI=mongodb://localhost:27017/yesj

# Start the server
npm start
```

#### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Build for production
npm run build

# Serve the built files (using any HTTP server)
npx serve -s dist
```

### Git-based Deployment

For deployment to platforms that support Git-based deployment (like Heroku, Railway, etc.):

#### Heroku Deployment

1. Create a new Heroku app
2. Add MongoDB addon (or use external MongoDB)
3. Set environment variables in Heroku dashboard
4. Deploy using Git:

```bash
# Add Heroku remote
heroku git:remote -a your-heroku-app-name

# Deploy
git push heroku main
```

#### Railway Deployment

1. Create a new Railway project
2. Connect your GitHub repository
3. Configure environment variables
4. Railway will automatically deploy on push to main branch

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yesj
```

### Frontend Environment Variables

Create a `.env.production` file in the `client` directory:

```env
VITE_API_BASE_URL=https://your-domain.com
NODE_ENV=production
```

## CI/CD Pipeline

The project includes GitHub Actions workflows for automated testing and deployment:

### Continuous Integration (CI)

- Runs on every push and pull request
- Executes linting, testing, and building
- Ensures code quality before merging

### Continuous Deployment (CD)

- Automatically deploys to staging on pushes to `develop` branch
- Automatically deploys to production on pushes to `main` branch
- Builds and pushes Docker images on tagged releases

### Setting up GitHub Actions Secrets

For the Docker build workflow, you need to set up the following secrets in your GitHub repository:

1. `DOCKER_USERNAME` - Your Docker Hub username
2. `DOCKER_PASSWORD` - Your Docker Hub access token

## Monitoring and Logging

### Docker Logs

```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f
```

### Application Health Checks

The backend includes a health check endpoint at `/health` which returns:

```json
{
  "status": "OK",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "database": "Connected"
}
```

### Error Monitoring

For production deployments, consider integrating error monitoring services like:

- Sentry
- Rollbar
- New Relic

## Backup and Recovery

### MongoDB Backup

```bash
# Create backup
docker exec yesj_mongodb mongodump --out /data/backup

# Restore backup
docker exec yesj_mongodb mongorestore /data/backup
```

### File Backup

Ensure regular backups of the `uploads` directory which contains user-uploaded files.

## Scaling

### Horizontal Scaling

For high-traffic deployments, consider:

1. Using a load balancer in front of multiple backend instances
2. Using a CDN for static assets
3. Implementing database read replicas
4. Using Redis for session storage

### Vertical Scaling

Increase resources (CPU, RAM) for Docker containers by modifying the `docker-compose.yml` file:

```yaml
services:
  backend:
    # ... other config
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `docker-compose.yml`
2. **Database connection errors**: Verify MongoDB URI and credentials
3. **Build failures**: Check Node.js version compatibility
4. **Permission issues**: Ensure proper file permissions for Docker volumes

### Debugging

```bash
# Check container status
docker-compose ps

# View container logs
docker-compose logs [service]

# Execute commands in container
docker-compose exec [service] [command]

# Access container shell
docker-compose exec [service] sh
```

### Rollback

To rollback to a previous version:

```bash
# If using Git tags
git checkout v1.0.0
docker-compose down
docker-compose up -d

# If using Docker images
docker-compose down
# Edit docker-compose.yml to use specific image tags
docker-compose up -d
```