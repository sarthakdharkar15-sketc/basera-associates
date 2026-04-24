# Use an official Node.js runtime as the base image (Node 20 for Vite 8 compatibility)
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy sub-package files first to leverage Docker cache
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies (Workspaces aware)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build

# Expose the port the server runs on
EXPOSE 5000

# Start the server
CMD ["node", "server/server.js"]
