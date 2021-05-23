from rest_framework import serializers
from products.models import PurchaseItem
from django.contrib.auth import get_user_model
from products.serializers.product import ProductSerializer

User = get_user_model()


class PurchaseItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = PurchaseItem
        exclude = ['purchase']
