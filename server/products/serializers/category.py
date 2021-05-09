from rest_framework import serializers
from products.models import Category
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # fields = '__all__'
        fields = ['id', 'name']
