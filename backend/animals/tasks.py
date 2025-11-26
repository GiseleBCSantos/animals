from celery import shared_task
from django.utils import timezone
from .models import Animal
from .llm import generate_text_for_animal


@shared_task
def generate_daily_thoughts():
    animals = Animal.objects.all()
    print("Thoughts generated at:", timezone.now())
    for animal in animals:
        prompt = (
            f"Imagine you are a {animal.species} named {animal.name}. "
            f"You are {animal.age} years old, which is a very important detail for your personality and view of the world. "
            f"Your species, {animal.species}, influences how you think and feel. "
            f"Your breed is {animal.breed}. "
            f"Generate a short, cute, and unique thought (max 180 characters) that reflects your age and species."
        )
        try:
            thought = generate_text_for_animal(prompt)
            animal.thought_of_the_day = thought
            animal.thought_generated_at = timezone.now()
            animal.save()
        except Exception as e:
            print('Error generating thought for', animal.id, e)