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
from products.serializers.product import ProductSerializer, CategorySerializer
from django.contrib.auth import get_user_model
from django.db.models import F
from rest_framework import status
from classes import SessionHandler


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################

#####################################################################
# allow product sorting
#####################################################################


class ProductCategoryView(APIView):
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)

    def post(self, request, category):
        session_handler = SessionHandler(request)
        session_handler.refresh_session()

        if category == 'all':
            products = Product.objects.all()
            products = ProductSerializer(products, many=True).data
            content = {'products': products,
                       'session_key': session_handler.session_key}
            return Response(content, status=status.HTTP_200_OK)

        try:
            category = Category.objects.get(name=category)
        except:
            return Product.objects.none()

        products = Product.objects.filter(
            category=category)
        products = ProductSerializer(products, many=True).data
        content = {'products': products,
                   'session_key': session_handler.session_key}
        return Response(content, status=status.HTTP_200_OK)


class ProductListByCategoryView(APIView):
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        session_handler = SessionHandler(request)
        session_handler.refresh_session()

        categories = Category.objects.all()

        productsDict = {}
        for category in categories:
            products = Product.objects.filter(category=category)
            products_serialized = ProductSerializer(products, many=True)

            productsDict[category.name] = products_serialized.data

        content = {'products': productsDict,
                   'session_key': session_handler.session_key}
        return Response(content, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, product_id, format=None):
        product = ProductSerializer(Product.objects.get(id=product_id))
        return Response(product.data)


class ProductDeleteView(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)


class ProductCreateView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)

    # def create(self, request, *args, **kwargs):
    #     print(request.data)
    #     request.data._mutable = True

    #     # try:
    #     category_str = request.data.pop('category.name')
    #     category = Category.objects.get_or_create(name=category_str)
    #     last_product = Product.objects.latest('id')
    #     request.data['category'] = category
    #     serializer = self.serializer_class(request.data)

    #     return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
    #     # except:
    #     # return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class ProductUpdateView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)
