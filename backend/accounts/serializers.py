from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tutor
User = get_user_model()


class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ('id', 'username', 'name', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Tutor
        fields = ('username','email','name','password')
    
    def validate_email(self, value):
        if Tutor.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated):
        user = Tutor(
            username=validated['username'],
            email=validated['email'],
            name=validated.get('name','')
        )
        user.set_password(validated['password'])
        user.save()
        return user