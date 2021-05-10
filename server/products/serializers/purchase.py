from rest_framework import serializers
from products.models import Purchase, Product
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer

User = get_user_model()


class PurchaseSerializer(serializers.ModelSerializer):
    customer = UserSerializer()

    class Meta:
        model = Purchase
        fields = '__all__'
