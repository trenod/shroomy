# ---- Python Base ----
FROM python:3.9-slim-buster as python-base

WORKDIR /app/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH /app/backend

RUN apt-get update && \
    apt-get install -y gcc libpq-dev && \
    apt-get install -y libjpeg62-turbo-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev libtiff-dev tk-dev libharfbuzz-dev libfribidi-dev && \
    rm -rf /var/lib/apt/lists/*

COPY /requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt
RUN pip install --no-cache-dir python-dotenv

# ---- Node Base ----
FROM node:16 as node-base

WORKDIR /app/frontend

COPY app/frontend/package*.json ./
RUN npm ci

COPY app/frontend/ ./
RUN npm run build

# ---- Final Stage ----
FROM python-base

WORKDIR /app/backend

COPY app/backend/ ./
COPY /.env /app/

COPY --from=node-base /app/frontend/build /app/frontend/build

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/

# Copy Nginx configuration
COPY app/nginx.conf /etc/nginx/sites-available/default

RUN pip check torchvision
RUN pip check torch
# Expose the port on which the Django app will run
EXPOSE 8000

# Run Nginx and Gunicorn
CMD ["sh", "-c", "nginx && gunicorn --bind 0.0.0.0:8000 mushroomApp.wsgi:application"]