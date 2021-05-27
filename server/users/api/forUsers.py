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
from django.utils import timezone
from datetime import timedelta

from knox.models import AuthToken
from knox.auth import TokenAuthentication
from rest_framework import generics, status
from mixins import ConnectCartWithUserMixin


from classes import CartHandler, SessionHandler
from users.serializers.user import UserSessionSerializer

User = get_user_model()


class UserLogin(generics.GenericAPIView, ConnectCartWithUserMixin):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        session_key = SessionHandler(request).session_key

        if serializer.is_valid():
            user = serializer.validated_data
            AuthToken.objects.filter(user_id=user.id).delete()
            _, token = AuthToken.objects.create(user)
            self.connect_cart_with_user(user, session_key)

            response = Response({
                "user": user.email,
                "token": token,
                'session_key': session_key,
                'status': 'success'
            })
            return response
        else:
            content = {
                'error': serializer.errors,
                'session_key': session_key,
                'status': 'error',
            }
        return Response(content)


class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        session_key = SessionHandler(request).session_key

        # disconnect cart from user
        cart = Cart.objects.get(customer=request.user)
        cart.user_id = None
        cart.save()

        # delete auth token
        AuthToken.objects.filter(user=request.user).delete()
        content = {
            'session_key': session_key,
            'status': 'success',
        }
        return Response(content, status=status.HTTP_202_ACCEPTED)


class UserRegister(generics.GenericAPIView, ConnectCartWithUserMixin):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        print("\nrequest.data", request.data)
        serializer = self.get_serializer(data=request.data)
        session_key = SessionHandler(request).session_key

        content = {'session_key': session_key, }

        if serializer.is_valid():
            user = serializer.save()
            _, token = AuthToken.objects.create(user)
            print("\n\nuser", user)

            self.connect_cart_with_user(user, session_key)

            return Response({
                "user": UserSerializer(
                    user,
                    context=self.get_serializer_context()
                ).data,
                "token": token,
                'session_key': session_key,
                'status': 'success'
            })
        content['error'] = serializer.errors
        content['status'] = 'error'
        if User.objects.filter(email=request.data.get('email')):
            content['message'] = 'This email already has an account.'
            return Response(content)
        content['message'] = 'Some error occured.'
        return Response(content)


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
