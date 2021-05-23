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

    def get(self, request, *args, **kwargs):
        session_handler = SessionHandler(request)
        session_handler.refresh_session()
        try:
            categories = Category.objects.all()
            categories = CategorySerializer(categories, many=True).data
            content = {'categories': categories,
                       'session_key': session_handler.session_key}
            return Response(content, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoryDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, category_id):
        session_handler = SessionHandler(request)
        session_handler.refresh_session()
        try:
            # retrieve all categories into Python and check for membership; to protect against SQL injections
            categories = Category.objects.all()
            category_ids = {category.id for category in categories}
            if category_id in category_ids:
                category = CategorySerializer(
                    Category.objects.get(id=category_id)).data
                content = {
                    'category': category,
                    'session_key': session_handler.session_key
                }
                return Response(content, status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


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
