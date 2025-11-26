from django.db import models
from django.conf import settings


class Animal(models.Model):
    SPECIES_CHOICES = [
        ('dog', 'Dog'),
        ('cat', 'Cat'),
        ('bird', 'Bird'),
        ('rabbit', 'Rabbit'),
        ('hamster', 'Hamster'),
        ('fish', 'Fish'),
        ('reptile', 'Reptile'),
        ('horse', 'Horse'),
        ('other', 'Other'),
    ]
    
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='pets')
    name = models.CharField(max_length=120)
    species = models.CharField(max_length=20, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=80, blank=True, null=True)
    age = models.PositiveIntegerField(blank=True, null=True, help_text="Age in years")
    photo = models.ImageField(upload_to='pet_photos/', null=True, blank=True)
    thought_of_the_day = models.TextField(null=True, blank=True)
    thought_generated_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.species})"