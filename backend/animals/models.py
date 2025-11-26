from django.db import models

# Create your models here.

from django.db import models
from django.conf import settings


class Animal(models.Model):
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='animais')
    nome = models.CharField(max_length=120)
    especie = models.CharField(max_length=80)
    data_nascimento = models.DateField(null=True, blank=True)
    pensamento_do_dia = models.TextField(null=True, blank=True)
    pensamento_gerado_em = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return f"{self.nome} ({self.especie})"