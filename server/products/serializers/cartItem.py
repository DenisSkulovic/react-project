from rest_framework import serializers
from products.models import CartItem
from django.contrib.auth import get_user_model
from users.serializers.user import UserSerializer
from products.serializers.product import ProductSerializer

User = get_user_model()


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(partial=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'price']
