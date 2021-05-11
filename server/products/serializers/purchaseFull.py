from rest_framework import serializers
from products.models import Purchase, Product
from django.contrib.auth import get_user_model
from users.serializers.user import UserSerializer
from products.serializers.purchaseItem import PurchaseItemSerializer
from products.serializers.purchase import PurchaseSerializer

User = get_user_model()


class PurchaseFullSerializer(serializers.ModelSerializer):
    purchase = PurchaseSerializer()
    purchase_items = PurchaseItemSerializer(many=True)

    class Meta:
        model = Purchase
        fields = ['purchase', 'purchase_items']


class PurchasesFullSerializer(serializers.ModelSerializer):
    purchases = PurchaseFullSerializer(many=True)

    class Meta:
        model = Purchase
        fields = ['purchases']
