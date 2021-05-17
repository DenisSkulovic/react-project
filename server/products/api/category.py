from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions, status
from products.pagination import (
    LargeResultsSetPagination,
)
from products.models import (Category,)
from products.serializers.category import CategorySerializer
from django.contrib.auth import get_user_model
from classes import CartHandler, SessionHandler

User = get_user_model()


class CategoryListView(APIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        session_handler = SessionHandler(request)
        session_handler.refresh_session()
        categories = Category.objects.all()
        categories = CategorySerializer(categories, many=True).data
        content = {'categories': categories,
                   'session_key': session_handler.session_key}
        return Response(content, status=status.HTTP_200_OK)


class CategoryDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

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


class CategoryUpdateView(UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAdminUser,)
