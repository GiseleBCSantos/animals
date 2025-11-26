#!/bin/sh

echo "Esperando o banco de dados iniciar..."

# Tenta se conectar várias vezes
while ! nc -z db 5432; do
  echo "Postgres ainda iniciando..."
  sleep 1
done

echo "Postgres está pronto! Rodando migrações..."
python manage.py migrate --noinput

echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

echo "Iniciando o servidor Django..."
# Escuta em 0.0.0.0 para aceitar conexões externas
exec python manage.py runserver 0.0.0.0:8000
