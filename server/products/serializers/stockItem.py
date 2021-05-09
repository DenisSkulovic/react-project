from rest_framework import serializers
from products.models import StockItem
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from products.serializers.product import ProductSerializer

User = get_user_model()


class StockItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(partial=True)

    class Meta:
        model = StockItem
        fields = ['id', 'product', 'quantity']
