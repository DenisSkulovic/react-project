from rest_framework import serializers
from products.models import Product
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from products.serializers.category import CategorySerializer

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(partial=True)

    class Meta:
        model = Product
        # fields = '__all__'
        fields = ['id', 'name', 'image', 'unit', 'unit_price', 'category']
