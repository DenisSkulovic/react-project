from rest_framework import serializers
from products.models import Purchase
from django.contrib.auth import get_user_model
from users.serializers.user import UserSerializer


User = get_user_model()


class PurchaseSerializer(serializers.ModelSerializer):
    customer = UserSerializer()

    class Meta:
        model = Purchase
        fields = '__all__'
