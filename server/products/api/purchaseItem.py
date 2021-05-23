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
from products.models import (PurchaseItem,)
from products.serializers.purchaseItem import PurchaseItemSerializer
from django.contrib.auth import get_user_model
from rest_framework import status
from classes import SessionHandler


User = get_user_model()


class PurchaseItemListView(ListAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class PurchaseItemDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, purchaseItem_id):
        session_key = SessionHandler(request).session_key

        # preventing SQL injection
        purchaseItems = PurchaseItem.objects.all()
        purchaseItems_ids = {purchaseItem.id for purchaseItem in purchaseItems}
        if purchaseItem_id in purchaseItems_ids:
            purchaseItem = PurchaseItemSerializer(
                PurchaseItem.objects.get(id=purchaseItem_id)).data
            content = {
                'purchaseItem': purchaseItem,
                'session_key': session_key}
            return Response(purchaseItem, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class PurchaseItemDeleteView(DestroyAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = (permissions.IsAdminUser,)


class PurchaseItemCreateView(CreateAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = (permissions.IsAdminUser,)


class PurchaseItemListView(ListAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class PurchaseItemUpdateView(UpdateAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    permission_classes = (permissions.IsAdminUser,)
