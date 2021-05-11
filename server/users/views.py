from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView, ListAPIView, UpdateAPIView
)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticated
)
from users.serializers.user import UserSerializer
from users.serializers.userFullInfo import UserFullInfoSerializer
from rest_framework.response import Response
from products.models import Cart, CartItem, Purchase, PurchaseItem
from rest_framework import status
from collections import namedtuple


User = get_user_model()


UserFull_namedtuple = namedtuple(
    'UserFull', ('user', 'cart_info', 'purchases'))
cart_info_namedtuple = namedtuple('cart_info', ('cart', 'cart_items',))
purchase_info_namedtuple = namedtuple(
    'purchase_info', ('purchase', 'purchase_items'))
purchases_namedtuple = namedtuple(
    'purchases', ('purchases',))


class UserFullDetailView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request, user_id, format=None):
        user = User.objects.get(id=user_id)
        cart = Cart.objects.get(customer=user)
        cart_items = CartItem.objects.filter(cart=cart)
        purchases = Purchase.objects.filter(customer=user)

        # put purchases and related purchase items into a list of tuples
        purchases_listOfTuples = [purchase_info_namedtuple(
            purchase=purchase, purchase_items=PurchaseItem.objects.filter(purchase=purchase)) for purchase in purchases]

        # put cart and purchases info into tuples
        cart_info_tuple = cart_info_namedtuple(
            cart=cart, cart_items=cart_items)
        purchases_tuple = purchases_namedtuple(
            purchases=purchases_listOfTuples)

        # finally, put cart and purchases tuples into user tuple
        userFull = UserFull_namedtuple(
            user=user, cart_info=cart_info_tuple, purchases=purchases_tuple)

        # serialize user tuple
        userFull_serialized = UserFullInfoSerializer(userFull)

        return Response(userFull_serialized.data)


class UserDetail(APIView):
    permission_classes = (IsAdminUser, )

    def get(self, request, format=None):
        userdata = UserSerializer(
            User.objects.get(id=request.user.id))
        return Response(userdata.data)


class UserCreate(CreateAPIView):
    model = User
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # create cart together with user
        user = User.objects.get(email=serializer.data['email'])
        Cart.objects.get_or_create(customer=user)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class UserList(APIView):
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
    # authentication_classes = [authentication.TokenAuthentication]

    def get(self, request, format=None):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)


class UserAccount(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, format=None):
        userdata = UserSerializer(
            User.objects.get(id=request.user.id))
        return Response(userdata.data)


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
