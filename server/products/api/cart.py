from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView,)
from rest_framework.response import Response
from rest_framework import permissions
from products.pagination import (
    LargeResultsSetPagination,
)
from products.models import (
    Cart, CartItem,
)
from products.serializers.cart import CartSerializer
from products.serializers.cartItem import CartItemSerializer

from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class CartDetailView(APIView):
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)

    def get(self, request, user_id, format=None):
        user = User.objects.get(id=user_id)
        cart = Cart.objects.get(customer=user)
        cart_items = CartItemSerializer(
            CartItem.objects.filter(cart=cart), many=True)
        return Response(cart_items.data)


class CartDeleteView(DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class CartCreateView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class CartListView(ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)


class CartUpdateView(UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser, permissions.IsAuthenticated)
