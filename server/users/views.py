from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from . import serializers


User = get_user_model()


class UserCreate(generics.CreateAPIView):
    model = User
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = serializers.UserSerializer
