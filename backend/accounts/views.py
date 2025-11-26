from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import TutorSerializer
User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = TutorSerializer


class ProfileView(generics.RetrieveAPIView):
    serializer_class = TutorSerializer
    
    def get_object(self):
        return self.request.user