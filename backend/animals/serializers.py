from rest_framework import serializers
from .models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = (
            'id',
            'tutor',
            'name',
            'species',
            'breed',
            'age',
            'photo',
            'thought_of_the_day',
            'thought_generated_at',
        )
        read_only_fields = ('tutor', 'thought_of_the_day', 'thought_generated_at')