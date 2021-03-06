from rest_framework import serializers
from products.models import Product, Category
from django.contrib.auth import get_user_model
from users.serializers.user import UserSerializer
from products.serializers.category import CategorySerializer

User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(partial=True)

    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['id', 'name', 'image', 'unit', 'unit_price', 'category']

    def create(self, validated_data):
        category_name = validated_data.pop('category')
        category_name = category_name.get("name")
        categ, _ = Category.objects.get_or_create(
            name=category_name)

        product = Product.objects.create(category=categ, **validated_data)

        return product
