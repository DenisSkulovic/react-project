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
from products.models import (PurchaseItem,)
from products.serializers.purchaseItem import PurchaseItemSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class PurchaseItemListView(ListAPIView):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class PurchaseItemDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, purchaseItem_id, format=None):
        purchaseItem = PurchaseItemSerializer(
            PurchaseItem.objects.get(id=purchaseItem_id))
        return Response(purchaseItem.data)


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
