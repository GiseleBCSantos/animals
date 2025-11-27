import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'dev-secret')
DEBUG = os.getenv('DEBUG', '1') == '1'
ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost').split(',')
CORS_ALLOW_ALL_ORIGINS = True


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'django_celery_beat',  
    'drf_spectacular',
    'drf_spectacular_sidecar',
    'accounts',
    'animals',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'petcare.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'petcare.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST', 'db'),
        'PORT': os.getenv('POSTGRES_PORT', 5432),
    }
}

if os.environ.get('DJANGO_TESTING'):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': ':memory:',
        }
    }

AUTH_USER_MODEL = 'accounts.Tutor'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,

}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}


STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  

CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', os.getenv('REDIS_URL', 'redis://redis:6379/0'))
CELERY_RESULT_BACKEND = os.getenv('CELERY_RESULT_BACKEND', os.getenv('REDIS_URL', 'redis://redis:6379/0'))
from celery.schedules import crontab


CELERY_BEAT_SCHEDULE = {
    'gerar-pensamentos-todos-os-dias-07': {
        'task': 'animals.tasks.generate_daily_thoughts',
        "schedule": crontab(minute="*/5"),
    }
}

TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
USE_L10N = True

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
