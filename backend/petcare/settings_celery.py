from celery.schedules import crontab
from datetime import timedelta


CELERY_BEAT_SCHEDULE = {
    'gerar-pensamentos-todos-os-dias-07': {
        'task': 'animals.tasks.gerar_pensamentos_diarios',
        "schedule": crontab(hour=7, minute=0),
    }
}