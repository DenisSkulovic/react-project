from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView, ListAPIView, UpdateAPIView
)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticated
)
from users.serializers.user import UserSessionSerializer, UserSerializer, LoginSerializer, RegisterSerializer
from rest_framework.response import Response
from products.models import Cart, CartItem, Purchase, PurchaseItem

from knox.models import AuthToken
from rest_framework import generics

from classes import CartHandler, SessionHandler
from users.serializers.user import UserSessionSerializer

User = get_user_model()


class UserSession(generics.GenericAPIView):
    serializer_class = UserSessionSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        session_key = SessionHandler(request).session_key
        return Response({'session_key': session_key})


class UserLogin(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        session_key = SessionHandler(request).session_key

        return Response({
            "user": UserSerializer(
                user,
                context=self.get_serializer_context()
            ).data,
            "token": token,
            'session_key': session_key
        })


class UserRegister(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        session_key = SessionHandler(request).session_key

        return Response({
            "user": UserSerializer(
                user,
                context=self.get_serializer_context()
            ).data,
            "token": token,
            'session_key': session_key
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePassword(UpdateAPIView):

    model = User
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, IsAdminUser,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
