from rest_framework import serializers
from products.models import Cart
from django.contrib.auth import get_user_model
from products.serializers.cartItem import CartItemSerializer
from users.serializers.user import UserSerializer

User = get_user_model()


class CartSerializer(serializers.ModelSerializer):
    customer = UserSerializer(partial=True)

    class Meta:
        model = Cart
        fields = ['id', 'customer']


class CartFullInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['cart', 'cart_items']

    cart = CartSerializer(partial=True)
    cart_items = CartItemSerializer(partial=True, many=True)
