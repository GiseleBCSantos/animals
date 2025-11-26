from rest_framework import serializers
from .models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ('id','tutor','nome','especie','data_nascimento','pensamento_do_dia','pensamento_gerado_em')
        read_only_fields = ('tutor','pensamento_do_dia','pensamento_gerado_em')