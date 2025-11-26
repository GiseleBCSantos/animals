#!/bin/sh

DB_HOST=${POSTGRES_HOST:-db}
DB_PORT=${POSTGRES_PORT:-5432}

echo "Esperando o banco de dados ($DB_HOST:$DB_PORT) iniciar..."

# Espera o Postgres estar pronto
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Banco ainda iniciando..."
  sleep 1
done

echo "Banco pronto! Rodando migrações..."
python manage.py migrate --noinput

mkdir -p /app/staticfiles

echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput || echo "Falha em coletar staticfiles, continuando..."

PORT=${PORT:-8000}

echo "Iniciando Django..."
echo "Rodando no render? $RUNNING_IN_RENDER"
echo "Usando a porta $PORT"

if [ "$RUNNING_IN_RENDER" = "true" ]; then
    exec gunicorn petcare.wsgi:application --bind 0.0.0.0:$PORT
else
    exec python manage.py runserver 0.0.0.0:$PORT
fi
