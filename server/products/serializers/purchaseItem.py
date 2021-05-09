from rest_framework import serializers
from products.models import PurchaseItem
from django.contrib.auth import get_user_model
from users.serializers import UserSerializer

User = get_user_model()


class PurchaseItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = PurchaseItem
        fields = '__all__'
