from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
)
from products.models import (Category,)
from products.serializers.category import CategorySerializer
from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class CategoryDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, category_id, format=None):
        category = CategorySerializer(Category.objects.get(id=category_id))
        return Response(category.data)


class CategoryDeleteView(DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAdminUser,)


class CategoryCreateView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAdminUser,)


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class CategoryUpdateView(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAdminUser,)
