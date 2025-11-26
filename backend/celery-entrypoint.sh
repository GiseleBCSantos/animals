DB_HOST=${POSTGRES_HOST:-db}
DB_PORT=${POSTGRES_PORT:-5432}

echo "Esperando o banco de dados ($DB_HOST:$DB_PORT) iniciar para o Celery..."

while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Postgres ainda iniciando..."
  sleep 1
done

echo "Postgres OK! Iniciando Celery..."
exec "$@"
