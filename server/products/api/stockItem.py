from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
    StandardResultsSetPagination,
    TenResultsSetPagination,
)
from products.models import (StockItem,)
from products.serializers.stockItem import StockItemSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class StockItemListView(ListAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class StockItemDetailView(APIView):
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)

    def get(self, request, stockItem_id, format=None):
        stockItem = StockItemSerializer(StockItem.objects.get(id=stockItem_id))
        return Response(stockItem.data)


class StockItemDeleteView(DestroyAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class StockItemCreateView(CreateAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class StockItemListView(ListAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class StockItemUpdateView(UpdateAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)
