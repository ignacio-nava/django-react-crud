from django.core.exceptions import ValidationError

from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

from .models import Perfil, Rol

UserModel = get_user_model()


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(
            username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('not user')
        return user


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ("id", "nombre")


class PerfilSerializer(serializers.ModelSerializer):
    rol = RolSerializer()  # Incluye los datos del rol
    superior = serializers.SerializerMethodField()

    class Meta:
        model = Perfil
        fields = ('id', 'rol', 'superior', 'updated_at')

    def get_superior(self, obj):
        if obj.superior:
            return {
                "superior_id": obj.superior.id,
                "superior_username": obj.superior.user.username
            }
        return {
            "superior_id": None,
            "superior_username": None
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("id", "username",)
