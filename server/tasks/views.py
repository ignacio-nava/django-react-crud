from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema

from .models import Task
from .serializers import TaskSerializer


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Asignar automáticamente el usuario que crea la tarea
        serializer.save(owner=self.request.user)

    @swagger_auto_schema(operation_summary="Lista las tareas", operation_description="Obtén una lista de todas las tareas disponibles.")
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="Creación de tarea", operation_description="Crea una tarea asignada al usuario autenticado.")
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(operation_summary="No soportado", operation_description="No soportado", responses={405: "Method Not Allowed"})
    def partial_update(self, request, *args, **kwargs):
        # Se bloquea el soporte a PATCH
        from rest_framework.response import Response
        from rest_framework import status
        return Response(
            {"detail": "PATCH method not allowed."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )
