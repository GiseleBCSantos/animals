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
            {"username": "alice", "email": "alice@example.com", "nome": "Alice Santos"},
            {"username": "bruno", "email": "bruno@example.com", "nome": "Bruno Almeida"},
            {"username": "carla", "email": "carla@example.com", "nome": "Carla Ribeiro"},
        ]


        especies = ["Cachorro", "Gato", "Coelho", "Pássaro", "Hamster"]
        nomes_animais = ["Rex", "Luna", "Mimi", "Bolt", "Tico", "Nala", "Foxy", "Toby", "Belinha", "Fred"]


        self.stdout.write(self.style.WARNING("Limpando dados antigos..."))
        Animal.objects.all().delete()
        User.objects.filter(username__in=[t["username"] for t in tutors_data]).delete()


        self.stdout.write(self.style.SUCCESS("Criando tutores..."))
        tutors = []
        for data in tutors_data:
            user = User(username=data["username"], email=data["email"], nome=data["nome"])
            user.set_password("123456")
            user.save()
            tutors.append(user)


        self.stdout.write(self.style.SUCCESS("Criando animais..."))
        pk = 1
        for tutor in tutors:
            for _ in range(2):
                Animal.objects.create(
                id=pk,
                tutor=tutor,
                nome=random.choice(nomes_animais),
                especie=random.choice(especies),
                data_nascimento=timezone.now().date(),
                )
                pk += 1


        self.stdout.write(self.style.SUCCESS("Mock criado com sucesso!"))