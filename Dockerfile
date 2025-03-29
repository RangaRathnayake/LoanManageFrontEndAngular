# Stage 1: Build the Angular application
FROM node:16.13.2 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built artifacts from stage 1
COPY --from=build /app/dist/loan-manage-front-end-angular /usr/share/nginx/html

# Copy nginx configuration (if you have custom config)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3006

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]