from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
    StandardResultsSetPagination,
    SmallResultsSetPagination,
)
from products.models import (StockItem,)
from products.serializers.stockItem import StockItemSerializer
from django.contrib.auth import get_user_model


User = get_user_model()


class StockItemListView(ListAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class StockItemDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, stockItem_id, format=None):
        stockItems = StockItem.objects.all()
        stockItems_ids = {stockItem.id for stockItem in stockItems}
        if stockItem_id in stockItems_ids:
            stockItem = StockItemSerializer(
                StockItem.objects.get(id=stockItem_id))
            return Response(stockItem.data)


class StockItemDeleteView(DestroyAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser,)


class StockItemCreateView(CreateAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser,)


class StockItemListView(ListAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class StockItemUpdateView(UpdateAPIView):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
    permission_classes = (permissions.IsAdminUser,)
