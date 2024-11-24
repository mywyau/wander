# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project (excluding files in .dockerignore)
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install a minimal set of dependencies for production
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the build artifacts from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start"]
