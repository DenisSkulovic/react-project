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
from products.models import (Purchase,)
from products.serializers.purchase import PurchaseSerializer
from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class PurchaseListView(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.AllowAny,)


class PurchaseDetailView(APIView):
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)

    def get(self, request, purchase_id, format=None):
        purchase = PurchaseSerializer(Purchase.objects.get(id=purchase_id))
        return Response(purchase.data)


class PurchaseDeleteView(DestroyAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class PurchaseCreateView(CreateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class PurchaseListView(ListAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class PurchaseUpdateView(UpdateAPIView):
    queryset = Purchase.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)
