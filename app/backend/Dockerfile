#!/usr/bin/env bash
FROM python:3.9-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt requirements.txt
COPY .env /backend/.env
RUN python -m pip install --upgrade pip
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install -r requirements.txt
RUN pip check torchvision
RUN pip check torch
EXPOSE 8000
COPY . .