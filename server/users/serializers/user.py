from django.contrib.auth import get_user_model
from rest_framework.serializers import (ModelSerializer, Serializer,
                                        CharField, ValidationError, EmailField)
from django.contrib.auth import authenticate
from django.contrib.sessions.models import Session


User = get_user_model()


class UserSessionSerializer(Serializer):
    session_key = CharField(max_length=32, min_length=32)


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password',)
        extra_kwargs = {'password': {'write_only': True}}

    # reset password
    def create(self, validated_data):
        print("validated_data", validated_data)
        password = validated_data.pop('new_password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class PasswordResetSerializer(Serializer):
    email = EmailField(max_length=200)
    old_password = CharField(max_length=200, write_only=True)
    new_password = CharField(max_length=200, write_only=True)

    # reset password
    def create(self, validated_data):
        print("validated_data", validated_data)
        password = validated_data.pop('new_password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['password'])
        return user


class LoginSerializer(Serializer):
    email = CharField()
    password = CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise ValidationError("Incorrect Credentials")
