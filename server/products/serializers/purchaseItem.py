from rest_framework import serializers
from products.models import PurchaseItem
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer
from products.serializers.product import ProductSerializer
from products.serializers.purchase import PurchaseSerializer

User = get_user_model()


class PurchaseItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(partial=True)
    purchase = PurchaseSerializer(partial=True)

    class Meta:
        model = PurchaseItem
        fields = '__all__'
