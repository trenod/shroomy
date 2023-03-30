# Use the official Node.js image as the base for the frontend build
FROM node:latest as frontend-build

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the container
COPY app/frontend/package*.json ./

# Install NPM dependencies
RUN npm install

# Copy the frontend source code
COPY app/frontend/ .

# Build the frontend
RUN npm run build

# Use the official Python image as the base for the backend build
FROM python:3.9 as backend-build

# Set the working directory
WORKDIR /app/backend
COPY .env /app/
# Copy the requirements file to the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend source code
COPY app/backend/ .

# Expose the backend port
EXPOSE 8000

# Use the official Nginx image as the base for the final image
FROM nginx:latest

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY app/nginx.conf /etc/nginx/conf.d

# Copy the frontend build artifacts from the frontend-build stage
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy the backend build artifacts from the backend-build stage
COPY --from=backend-build /app/backend /app/backend

# Set environment variables
ENV DJANGO_SETTINGS_MODULE=app.settings
ENV PYTHONUNBUFFERED=1

# Start the backend service and Nginx
CMD ["sh", "-c", "cd /app/backend && gunicorn app.wsgi:application --bind 0.0.0.0:8000 & nginx -g 'daemon off;'"]