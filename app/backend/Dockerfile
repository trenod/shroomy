#!/usr/bin/env bash
# Use the official Python base image
FROM python:3.10-slim-buster

# Set the working directory
WORKDIR /backend

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Copy the .env file into the container
COPY .env /backend/.env

# Upgrade pip and install required dependencies
RUN python -m pip install --upgrade pip && \
    apt-get update && \
    apt-get install -y ffmpeg libsm6 libxext6 libjpeg-dev zlib1g-dev libtiff-dev libopenjp2-7-dev libwebp-dev libfreetype6-dev && \
    pip3 install -r requirements.txt && \
    pip install --no-cache-dir gunicorn pillow opencv-python imageio




# Expose the required port
EXPOSE 8000

# Copy the remaining files into the container
COPY . .
