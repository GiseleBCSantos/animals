from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tutor
User = get_user_model()


class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'nome', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Tutor
        fields = ('username','email','nome','password')
    def create(self, validated):
        user = Tutor(username=validated['username'], email=validated['email'], nome=validated.get('nome',''))
        user.set_password(validated['password'])
        user.save()
        return user
