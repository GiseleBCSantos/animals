from django.db import models
from django.contrib.auth.models import AbstractUser


class Tutor(AbstractUser):
    name = models.CharField(max_length=120, blank=True)
    
    def __str__(self):
        return self.username or self.email or str(self.id)