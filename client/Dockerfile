# Start of Selection
# Build the React app in development mode
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run start  # Use npm start for development mode

# Serve the app using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html  
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# End of Selection
