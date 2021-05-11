from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer
from products.serializers.cart import CartFullInfoSerializer
from users.serializers.user import UserSerializer
from products.serializers.purchaseFull import PurchasesFullSerializer

User = get_user_model()

# https://stackoverflow.com/questions/44978045/serialize-multiple-models-and-send-all-in-one-json-response-django-rest-framewor


class UserFullInfoSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('user', 'cart_info', 'purchases')

    user = UserSerializer()
    cart_info = CartFullInfoSerializer()
    purchases = PurchasesFullSerializer()
