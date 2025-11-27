# Animals Backend

## Overview

This backend is a Django-based REST API for managing pet and tutor (owner) data, with support for authentication, background tasks, and API documentation. It is containerized for deployment and includes support for Celery task queues, JWT authentication, and PostgreSQL.

---

## Project Structure

```
backend/
│
├── accounts/                # Custom user model and authentication logic
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   ├── models.py            # Custom user model: Tutor
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── animals/                 # Main app for animal management
│   ├── admin.py
│   ├── apps.py
│   ├── llm.py               # Integration with LLM for animal thoughts
│   ├── management/
│   │   └── commands/
│   │       └── generate_mock_data.py # Command to generate mock data
│   ├── migrations/
│   ├── models.py            # Animal model
│   ├── permissions.py
│   ├── serializers.py
│   ├── tasks.py             # Celery tasks (e.g., generate_daily_thoughts)
│   ├── tests.py
│   ├── urls.py
│   └── views.py
│
├── petcare/                 # Django project settings and entrypoints
│   ├── asgi.py
│   ├── celery.py            # Celery app configuration
│   ├── settings.py          # Main Django settings
│   ├── settings_celery.py   # (Optional) Celery-specific settings
│   ├── urls.py
│   └── wsgi.py
│
├── staticfiles/             # Collected static files for deployment
│
├── celery-entrypoint.sh     # Entrypoint script for Celery worker
├── Dockerfile               # Docker build instructions
├── entrypoint.sh            # Entrypoint script for Django app
├── manage.py                # Django management script
├── requirements.txt         # Python dependencies
└── pytest.ini               # Pytest configuration
```

---

## Key Components

### 1. Django Apps

- **accounts**: Custom user model (`Tutor`), authentication, and user management.
- **animals**: Animal model, API endpoints, business logic, and integration with LLM for generating animal thoughts.

### 2. API

- Built with Django REST Framework.
- JWT authentication via `djangorestframework-simplejwt`.
- All endpoints require authentication by default.
- Main endpoints:
  - `/animals/` (CRUD for animals, only owner can access their animals)
  - `/accounts/` (user management, if exposed)

### 3. Background Tasks

- **Celery** is used for background processing.
- Example task: `generate_daily_thoughts` generates a daily thought for each animal using an LLM (see `animals/llm.py`).
- Celery is configured to use Redis as a broker and result backend.

### 4. LLM Integration

- The `animals/llm.py` module integrates with the Gemini API to generate animal thoughts.
- Prompts are dynamically constructed based on animal attributes.

### 5. Mock Data

- The management command `generate_mock_data.py` creates sample users and animals for development/testing.

### 6. Static Files

- Static files are collected to `/staticfiles` for production use.

---

## Configuration

### Environment Variables

- `DJANGO_SECRET_KEY`: Django secret key
- `DEBUG`: Set to `1` for debug mode
- `DJANGO_ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`: PostgreSQL configuration
- `CELERY_BROKER_URL`, `CELERY_RESULT_BACKEND`: Celery/Redis configuration
- `GEMINI_API_KEY`: API key for Gemini LLM

### Settings

- Custom user model: `accounts.Tutor`
- REST Framework: JWT authentication, pagination, and schema generation with drf-spectacular
- Celery: Scheduled tasks via `django_celery_beat`
- CORS: All origins allowed (for development)

---

## Deployment

### Docker

- The `Dockerfile` builds the backend image.
- `entrypoint.sh` waits for the database, runs migrations, collects static files, and starts the Django server (Gunicorn in production).
- `celery-entrypoint.sh` is used to start Celery workers after the database is ready.

### Static Files

- Collected to `/staticfiles` using `python manage.py collectstatic`.

---

## Development

### Running Locally

1. Install dependencies: `pip install -r requirements.txt`
2. Set environment variables (see `.env.example` if available)
3. Run migrations: `python manage.py migrate`
4. Create a superuser: `python manage.py createsuperuser`
5. Start the server: `python manage.py runserver`
6. (Optional) Start Celery: `celery -A petcare worker -l info`

### Running Tests

- Run all tests: `pytest`
- Tests are located in `animals/tests.py` and `accounts/tests.py` (if present).

### Generating Mock Data

- Run: `python manage.py generate_mock_data`

---

## API Documentation

- OpenAPI/Swagger docs are available via drf-spectacular.
- Visit `/api/schema/` or `/api/docs/` (depending on your URL configuration).

---

## Security

- All API endpoints require authentication.
- Only the owner (tutor) can access or modify their animals.
- JWT tokens are used for authentication.

---

For further details, see the code in each app and the configuration files in `/backend/`.
