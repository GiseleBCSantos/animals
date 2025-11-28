from django.utils import timezone
from django.shortcuts import render
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from animals.llm import generate_text_for_animal
from animals.models import Animal
from .serializers import TutorSerializer, RegisterSerializer
from rest_framework import status
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response

User = get_user_model()

@extend_schema(tags=['Accounts'])
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer


@extend_schema(tags=['Accounts'])
class ProfileView(generics.RetrieveAPIView):
    serializer_class = TutorSerializer
    
    def get_object(self):
        return self.request.user
    

@extend_schema(tags=['Accounts'])
@method_decorator(csrf_exempt, name='dispatch')
class GenerateThoughtsView(APIView):
    permission_classes = [permissions.IsAuthenticated]  


    def post(self, request):
        user = request.user
        animals = Animal.objects.filter(tutor=user)
        generated_count = 0
        details = []

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
                generated_count += 1
                details.append({"animal_id": animal.id, "name": animal.name, "thought": thought})
            except Exception as e:
                details.append({"animal_id": animal.id, "name": animal.name, "error": str(e)})

        return Response({
            "message": f"Pensamentos gerados para {generated_count} animais.",
            "details": details
        }, status=status.HTTP_200_OK)