# File Path: backend/Dockerfile

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
