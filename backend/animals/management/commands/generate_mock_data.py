from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from animals.models import Animal
from django.utils import timezone
import random


class Command(BaseCommand):
    help = 'Gera 3 tutores e 10 animais para cada um (mock).'


    def handle(self, *args, **options):
        User = get_user_model()


        tutors_data = [
            {"username": "alice", "email": "alice@example.com", "name": "Alice Santos"},
            {"username": "bruno", "email": "bruno@example.com", "name": "Bruno Almeida"},
            {"username": "carla", "email": "carla@example.com", "name": "Carla Ribeiro"},
        ]

        species_list = ["dog", "cat", "rabbit", "bird", "hamster", "fish", "reptile", "horse", "other"]
        animal_names = ["Rex", "Luna", "Mimi", "Bolt", "Tico", "Nala", "Foxy", "Toby", "Belinha", "Fred"]
        breeds = ["Mixed", "Labrador", "Persian", "Siamese", "Golden", "Mini Lop", "Cockatiel", "Syrian", "Betta", "Corn Snake", "Arabian"]


        self.stdout.write(self.style.WARNING("Deleting old data..."))
        Animal.objects.all().delete()
        User.objects.filter(username__in=[t["username"] for t in tutors_data]).delete()

        self.stdout.write(self.style.SUCCESS("Creating tutors..."))
        tutors = []
        for data in tutors_data:
            user = User(username=data["username"], email=data["email"], name=data["name"])
            user.set_password("123456")
            user.save()
            tutors.append(user)

        self.stdout.write(self.style.SUCCESS("Creating animals..."))
        pk = 1
        for tutor in tutors:
            for _ in range(10):
                Animal.objects.create(
                    id=pk,
                    tutor=tutor,
                    name=random.choice(animal_names),
                    species=random.choice(species_list),
                    breed=random.choice(breeds),
                    age=random.randint(1, 15),
                    photo=None,
                    thought_of_the_day=None,
                    thought_generated_at=None,
                )
                pk += 1


        self.stdout.write(self.style.SUCCESS("Mock data created successfully!"))