# Use the official Python base image
FROM python:3.9-slim as python-base

# Set the working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install OS dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Use the official Node.js base image
FROM node:16 as node-base

# Set the working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Install npm dependencies
RUN npm ci

# Build frontend static files
COPY frontend/ ./
RUN npm run build

# Final stage: Combine Python and Node.js images
FROM python-base

# Copy the project source code
COPY . /app/

# Copy built frontend static files
COPY --from=node-base /app/frontend/build /app/frontend/build

# Expose the port on which the Django app will run
EXPOSE 8000

# Run the Django app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "your_project_name.wsgi:application"]
