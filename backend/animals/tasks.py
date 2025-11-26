from celery import shared_task
from django.utils import timezone
from .models import Animal
from .llm import gerar_texto_para_animal


@shared_task
def gerar_pensamentos_diarios():
    animals = Animal.objects.all()
    print("Pensamentos gerados em:", timezone.now())
    for a in animals:
        prompt = f"Gere um pensamento curto e fofo como se fosse um(a) {a.especie} chamado {a.nome}. Máx 180 caracteres."
        try:
            pensamento = gerar_texto_para_animal(prompt)
            a.pensamento_do_dia = pensamento
            a.pensamento_gerado_em = timezone.now()
            a.save()
        except Exception as e:
            print('Erro gerando pensamento para', a.id, e)