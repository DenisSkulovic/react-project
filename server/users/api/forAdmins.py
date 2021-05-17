from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import (
    CreateAPIView, ListAPIView, UpdateAPIView
)
from django.contrib.auth import get_user_model
from rest_framework.permissions import (
    AllowAny, IsAdminUser, IsAuthenticated
)
from users.serializers.user import UserSerializer, RegisterSerializer
from rest_framework.response import Response
from products.models import Cart, CartItem, Purchase, PurchaseItem
from rest_framework import status
from products.serializers.cart import CartSerializer, CartItemSerializer
from products.serializers.product import ProductSerializer
from products.serializers.purchase import PurchaseSerializer
from products.serializers.purchaseItem import PurchaseItemSerializer


from knox.models import AuthToken


User = get_user_model()


class UserFullDetailView(APIView):
    permission_classes = (IsAdminUser,)

    def get(self, request, user_id):
        user = User.objects.get(id=user_id)
        try:
            cart = Cart.objects.get(customer=user)
        except:
            cart = None
        cart_items = CartItem.objects.filter(cart=cart)
        purchases = Purchase.objects.filter(customer=user)
        purchase_history = []
        for purchase in purchases:
            purchase_items = PurchaseItem.objects.filter(purchase=purchase)
            purchase_items = PurchaseItemSerializer(
                purchase_items, many=True).data
            purchase = PurchaseSerializer(purchase).data
            purchase_history.append(
                {'purchase': purchase, 'purchase_items': purchase_items})

        user = UserSerializer(user).data
        cart = CartSerializer(cart).data
        cart_items = CartItemSerializer(cart_items, many=True).data

        content = {"cart_info": {
            "cart": cart, 'cart_items': cart_items
        },
            'user_info': user,
            'purchase_history': purchase_history}
        return Response(content, status=status.HTTP_200_OK)


class UserDetail(APIView):
    permission_classes = (IsAdminUser, )

    def get(self, request, pk, format=None):
        userdata = UserSerializer(
            User.objects.get(id=pk))
        return Response(userdata.data)


class UserCreate(CreateAPIView):
    model = User
    queryset = User.objects.all()
    permission_classes = (IsAdminUser, )
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
