from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Animal
from .serializers import AnimalSerializer
from .permissions import IsTutorOrReadOnly
from drf_spectacular.utils import extend_schema



@extend_schema(tags=['Animals'])
class AnimalViewSet(viewsets.ModelViewSet):
    serializer_class = AnimalSerializer
    permission_classes = (permissions.IsAuthenticated,)


    def get_queryset(self):
        return Animal.objects.filter(tutor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)
    
    def perform_update(self, serializer):
        instance = self.get_object()

        photo_in_request = 'photo' in self.request.data

        wants_to_remove_photo = (
            not photo_in_request and
            instance.photo is not None 
        )

        if wants_to_remove_photo:
            instance.photo.delete(save=False)
            instance.photo = None
            instance.save()
            serializer.validated_data['photo'] = None

        serializer.save()