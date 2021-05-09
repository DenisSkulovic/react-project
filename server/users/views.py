from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView, ListAPIView, UpdateAPIView
)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticated
)
from . import serializers
from rest_framework.response import Response


User = get_user_model()


class UserCreate(CreateAPIView):
    model = User
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = serializers.UserSerializer


class UserList(APIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    # authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)


class UserDetail(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        userdata = serializers.UserSerializer(
            User.objects.get(id=request.user.id))
        return Response(userdata.data)


class ChangePassword(UpdateAPIView):

    model = User
    serializer_class = serializers.UserSerializer
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
