FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV IN_DOCKER=true


COPY requirements.txt /app/

RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    pip install --upgrade pip && \
    pip install -r requirements.txt && \
    rm -rf /var/lib/apt/lists/*


COPY . /app/

RUN chmod +x /app/entrypoint.sh
RUN chmod +x /app/celery-entrypoint.sh
