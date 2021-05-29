from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView, ListAPIView, UpdateAPIView, GenericAPIView, RetrieveAPIView
)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticated
)
from users.serializers.user import UserSessionSerializer, PasswordResetSerializer, UserSerializer, LoginSerializer, RegisterSerializer
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


class UserLogin(GenericAPIView, ConnectCartWithUserMixin):
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
            content = Response({
                "user": user.email,
                "token": token,
                'session_key': session_key,
                'status': 'success',
                'message': 'Login successful.'
            })
            return content
        else:
            content = {
                'error': serializer.errors,
                'session_key': session_key,
                'status': 'error',
                'message': 'Invalid data entered.'
            }
        return Response(content)


class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        session_key = SessionHandler(request).session_key
        # disconnect cart from user
        try:
            cart = Cart.objects.get(customer=request.user)
            cart.user_id = None
            cart.save()
        except:
            pass
        # delete auth token
        AuthToken.objects.filter(user=request.user).delete()
        content = {
            'session_key': session_key,
            'status': 'success',
        }
        return Response(content, status=status.HTTP_202_ACCEPTED)


class UserRegister(GenericAPIView, ConnectCartWithUserMixin):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        session_key = SessionHandler(request).session_key
        content = {'session_key': session_key, }
        if serializer.is_valid():
            user = serializer.save()
            _, token = AuthToken.objects.create(user)
            self.connect_cart_with_user(user, session_key)
            return Response({
                "user": user.email,
                "token": token,
                'session_key': session_key,
                'status': 'success',
                'message': 'Registration successful.'
            })
        content['error'] = serializer.errors
        content['status'] = 'error'
        if User.objects.filter(email=request.data.get('email')):
            content['message'] = 'This email already has an account.'
            return Response(content)
        content['message'] = 'Some error occured.'
        return Response(content)


class UserAPI(RetrieveAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class ChangePassword(GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        serializer = PasswordResetSerializer(data={
            'email': request.data['email'],
            'old_password': request.data['old_password'],
            'new_password': request.data['new_password'],
        })
        session_key = SessionHandler(request).session_key

        if serializer.is_valid():
            # Check old password
            if not request.user.check_password(serializer.validated_data.get("old_password")):
                content = {
                    'status': 'error',
                    'message': 'Wrong password.',
                    'session_key': session_key,
                }
                return Response(content, status=status.HTTP_200_OK)
            # set_password also hashes the password that the user will get
            request.user.set_password(
                serializer.validated_data.get("new_password"))
            request.user.save()
            content = {
                'status': 'success',
                'message': 'Password updated successfully',
                'session_key': session_key
            }
            return Response(content, status=status.HTTP_200_OK)
        content = {
            'status': 'error',
            'message': 'Something went wrong.',
            'session_key': session_key,
            'serializer_errors': serializer.errors,
        }
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
