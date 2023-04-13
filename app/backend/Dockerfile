FROM python:3.9
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN python -m pip install --upgrade pip
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip check torchvision
RUN pip check torch
COPY . .