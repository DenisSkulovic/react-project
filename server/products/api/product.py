from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
    SmallResultsSetPagination,
)
from products.models import (Product, Category, StockItem,)
from products.serializers.product import ProductSerializer, CategorySerializer
from products.serializers.stockItem import StockItemSerializer
from django.contrib.auth import get_user_model
from django.db.models import F
from rest_framework import status
from classes import SessionHandler
import random


User = get_user_model()


class ProductRandomView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.all()

    def get(self, request):
        session_handler = SessionHandler(request)
        # try:
        if request.GET.get('q'):
            q = int(request.GET.get('q'))
        else:
            q = 10

        categories = Category.objects.all()
        products_data = {}
        for category in categories:

            products = Product.objects.filter(category=category)

            products_list = list(products)
            random.shuffle(products_list)
            product_ids = [product.id for product in products_list]
            if len(product_ids) > q:
                product_ids = product_ids[:q]
            products = Product.objects.filter(id__in=product_ids)

            prods_serialized = []
            for product in products:
                prod_serialized = ProductSerializer(product).data
                stockItem = StockItem.objects.get(product=product)
                stock_serialized = StockItemSerializer(stockItem).data
                prod_serialized['stock_item'] = stock_serialized
                prods_serialized.append(prod_serialized)

            products_data[category.name] = prods_serialized

        content = {'products': products_data,
                   'session_key': session_handler.session_key}
        return Response(content, status=status.HTTP_200_OK)
        # except:
        #     return Response(status=status.HTTP_404_NOT_FOUND)


class ProductCategoryView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.all()

    def get(self, request, category, *args, **kwargs):
        return self.list(request, category, *args, **kwargs)

    def list(self, request, category, *args, **kwargs):
        queryset = self.filter_queryset(
            self.get_custom_queryset(request=request, category=category))

        page = self.paginate_queryset(queryset)
        if page is not None:
            products_serialized = []
            for product in page:
                prod_serialized = ProductSerializer(product).data
                stockItem = StockItem.objects.get(product=product)
                stock_serialized = StockItemSerializer(stockItem).data
                prod_serialized['stock_item'] = stock_serialized
                products_serialized.append(prod_serialized)

            content = {'results': products_serialized,
                       'session_key': self.session_key}
            return self.get_paginated_response(content)

        products_serialized = []
        for product in queryset:
            prod_serialized = ProductSerializer(product).data
            stockItem = StockItem.objects.get(product=product)
            stock_serialized = StockItemSerializer(stockItem).data
            prod_serialized['stock_item'] = stock_serialized
            products_serialized.append(prod_serialized)
        content = {'results': {'results': products_serialized},
                   'session_key': self.session_key}
        return Response(content, status=status.HTTP_200_OK)

    def get_custom_queryset(self, request, category):
        session_handler = SessionHandler(request)
        self.session_key = session_handler.session_key

        # to prevent SQL injection
        if request.GET.get('order_by'):
            order_by = request.GET.get('order_by')
            fields = {f.name for f in Product._meta.get_fields()}
            if order_by.replace("-", "") not in fields:
                order_by = 'name'
        else:
            order_by = 'name'

        if category == 'all':
            return Product.objects.all().order_by(order_by)

        # preventing SQL injection
        categories = Category.objects.all()
        category_names = {category.name for category in categories}
        if category in category_names:
            try:
                category = Category.objects.get(name=category)
            except:
                return Product.objects.none()

            queryset = Product.objects.filter(
                category=category).order_by(order_by)

            return queryset
        return Product.objects.none()


class ProductListByCategoryView(APIView):
    serializer_class = ProductSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        session_handler = SessionHandler(request)

        categories = Category.objects.all()

        productsDict = {}
        for category in categories:
            products = Product.objects.filter(category=category)

            products_serialized = []
            for product in products:
                prod_serialized = ProductSerializer(product).data
                stockItem = StockItem.objects.get(product=product)
                stock_serialized = StockItemSerializer(stockItem).data
                prod_serialized['stock_item'] = stock_serialized
                products_serialized.append(prod_serialized)

            productsDict[category.name] = products_serialized

        content = {'products': productsDict,
                   'session_key': session_handler.session_key}
        return Response(content, status=status.HTTP_200_OK)


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, product_id):
        session_handler = SessionHandler(request)
        try:
            # check for membership in Python to avoid SQL injection
            products = Product.objects.all()
            product_ids = {product.id for product in products}
            if product_id in product_ids:
                product = Product.objects.get(id=product_id)
                stock_item = StockItem.objects.filter(product=product)
                if len(stock_item) > 0:
                    stock_item = StockItemSerializer(stock_item[0]).data
                else:
                    stock_item = []
                product = ProductSerializer(product).data
                content = {
                    'product': product,
                    'stock_item': stock_item,
                    'session_key': session_handler.session_key,
                }
                return Response(content, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ProductDeleteView(DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)


class ProductCreateView(CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = SmallResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class ProductUpdateView(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (permissions.IsAdminUser,)
