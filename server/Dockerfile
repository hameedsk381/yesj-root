# Use Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose the port the app runs on
EXPOSE 5000

# Start the server with nodemon for hot-reloading
CMD ["nodemon", "index.js"]
