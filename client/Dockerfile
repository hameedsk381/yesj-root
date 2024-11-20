# File Path: frontend/Dockerfile

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the React development server port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
