from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
    TenResultsSetPagination,
)
from products.models import (Product, Category, StockItem,)
from products.serializers.product import ProductSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class ProductCategoryView(ListAPIView):
    model = Product
    serializer_class = ProductSerializer
    pagination_class = TenResultsSetPagination
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        category = self.kwargs['category']
        queryset = self.model.objects.filter(
            category=Category.objects.get(name=category))
        return queryset


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, product_id, format=None):
        product = ProductSerializer(Product.objects.get(id=product_id))
        return Response(product.data)


class ProductDeleteView(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class ProductCreateView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class ProductUpdateView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)
