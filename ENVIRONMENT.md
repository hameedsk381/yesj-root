# Environment Variables Setup

This document explains how to configure environment variables for the YESJ application in different environments.

## Table of Contents

- [Overview](#overview)
- [Client Environment Variables](#client-environment-variables)
- [Server Environment Variables](#server-environment-variables)
- [Environment-Specific Files](#environment-specific-files)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Security Considerations](#security-considerations)

## Overview

The YESJ application uses environment variables to configure different aspects of both the client and server applications. Environment variables allow you to:

- Configure different settings for development, staging, and production
- Keep sensitive information out of the codebase
- Easily switch between different configurations

## Client Environment Variables

Client environment variables are used by the frontend application and must be prefixed with `VITE_` to be accessible in Vite applications.

### Required Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Base URL for API requests | `http://localhost:5000` |
| `NODE_ENV` | Node environment | `development` |

### Example Client Environment File

```env
# Development
VITE_API_BASE_URL=http://localhost:5000
NODE_ENV=development
```

## Server Environment Variables

Server environment variables are used by the backend application and control server behavior, database connections, and other server-side configurations.

### Required Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `PORT` | Port to run the server on | `5000` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://localhost:27017/yesj` |
| `NODE_ENV` | Node environment | `development` |

### Optional Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `MONGO_USERNAME` | MongoDB username (if authentication is enabled) | None |
| `MONGO_PASSWORD` | MongoDB password (if authentication is enabled) | None |

### Example Server Environment File

```env
# Development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yesj
NODE_ENV=development
```

## Environment-Specific Files

The application supports different environment files for different deployment scenarios:

### Client Environment Files

1. **`.env`** - Default environment variables
2. **`.env.local`** - Local overrides (not committed to git)
3. **`.env.development`** - Development environment
4. **`.env.staging`** - Staging environment
5. **`.env.production`** - Production environment

### Server Environment Files

1. **`.env`** - Default environment variables
2. **`.env.local`** - Local overrides (not committed to git)
3. **`.env.development`** - Development environment
4. **`.env.staging`** - Staging environment
5. **`.env.production`** - Production environment

## Setting Up Environment Variables

### For Development

1. Copy the example files:
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```

2. Modify the values as needed for your local setup

3. The `.env` files are loaded automatically by Vite (client) and Node.js (server)

### For Production

1. Set environment variables in your deployment platform:
   - Heroku: Use the dashboard or `heroku config:set`
   - Docker: Use environment files or `-e` flag
   - Kubernetes: Use ConfigMaps or Secrets
   - AWS: Use Parameter Store or Secrets Manager

2. Or create appropriate `.env.production` files

### For Docker Deployment

Environment variables can be passed to Docker containers in several ways:

1. Using environment files:
   ```bash
   docker run --env-file server/.env.production yesj-server
   ```

2. Using individual environment variables:
   ```bash
   docker run -e PORT=5000 -e MONGODB_URI=mongodb://host:27017/yesj yesj-server
   ```

3. Using Docker Compose:
   ```yaml
   services:
     backend:
       environment:
         - PORT=5000
         - MONGODB_URI=mongodb://mongodb:27017/yesj
   ```

## Security Considerations

### What NOT to Commit

Never commit the following to version control:

- Database credentials
- API keys
- Secret tokens
- Private keys
- Passwords

### Best Practices

1. **Use .env.local for sensitive data**:
   - Create `.env.local` files for sensitive data
   - Add `.env.local` to `.gitignore`

2. **Use different values for different environments**:
   - Development, staging, and production should have different values
   - Especially for sensitive data like database credentials

3. **Validate environment variables**:
   - Check that required variables are set
   - Validate variable formats (URLs, numbers, etc.)

4. **Use strong secrets**:
   - Generate strong passwords and API keys
   - Rotate secrets regularly

### Example .gitignore Entries

Make sure your `.gitignore` files include:

```gitignore
# Environment files with sensitive data
.env.local
.env.*.local

# But commit example files
!.env.example
```

## Environment Variable Validation

Both client and server applications should validate that required environment variables are present:

### Client Validation (in main.jsx or similar)

```javascript
// Check required environment variables
const requiredEnvVars = ['VITE_API_BASE_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}
```

### Server Validation (in index.js or similar)

```javascript
// Check required environment variables
const requiredEnvVars = ['PORT', 'MONGODB_URI'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**:
   - Check file names (must be exactly `.env`)
   - Check variable prefixes (`VITE_` for client)
   - Restart development servers after changes

2. **Wrong environment loading**:
   - Check `NODE_ENV` value
   - Verify environment-specific file names

3. **Security warnings**:
   - Ensure sensitive data is not in committed files
   - Check `.gitignore` configuration

### Debugging Environment Variables

To debug environment variables in development:

1. **Client side**:
   ```javascript
   console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
   console.log('All env vars:', import.meta.env);
   ```

2. **Server side**:
   ```javascript
   console.log('Port:', process.env.PORT);
   console.log('All env vars:', process.env);
   ```