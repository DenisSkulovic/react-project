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
from products.models import (Purchase,)
from products.serializers.purchase import PurchaseSerializer
from django.contrib.auth import get_user_model
from rest_framework import status


User = get_user_model()


class PurchaseListView(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class PurchaseDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, purchase_id):
        purchases = Purchase.objects.all()
        purchases_ids = {purchase.id for purchase in purchases}
        if purchase_id in purchases_ids:
            purchase = PurchaseSerializer(Purchase.objects.get(id=purchase_id))
            return Response(purchase.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class PurchaseDeleteView(DestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser,)


class PurchaseCreateView(CreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser,)


class PurchaseListView(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class PurchaseUpdateView(UpdateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser,)
