from rest_framework import permissions


class IsTutorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.tutor == request.user