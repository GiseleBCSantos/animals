from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Animal
from .serializers import AnimalSerializer
from .permissions import IsTutorOrReadOnly


class AnimalViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalSerializer
    permission_classes = (permissions.IsAuthenticated,)


    def get_queryset(self):
        return Animal.objects.filter(tutor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)