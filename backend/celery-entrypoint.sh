#!/bin/sh

echo "Esperando o banco de dados iniciar para o Celery..."

while ! nc -z db 5432; do
  echo "Postgres ainda iniciando..."
  sleep 1
done

echo "Postgres OK! Iniciando Celery..."
exec "$@"
