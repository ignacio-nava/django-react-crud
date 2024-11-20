from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import (
    UserLoginSerializer,
    UserSerializer,
    PerfilSerializer
)
from django.contrib.auth.models import User


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        print('prueba de si el código llega hasta acá')
        print()
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer_user = UserSerializer(request.user)
        perfil = request.user.perfil  # Relación OneToOne
        serializer_perfil = PerfilSerializer(perfil)

        data = {
            'user': {**serializer_user.data, **serializer_perfil.data}
        }
        return Response(data, status=status.HTTP_200_OK)
