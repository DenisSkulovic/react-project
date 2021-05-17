from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView,)
from rest_framework.response import Response
from rest_framework import permissions, status
from products.pagination import (
    LargeResultsSetPagination,
)
from products.models import (
    Cart, CartItem,
)
from products.serializers.cart import CartSerializer, CartFullInfoSerializer
from products.serializers.cartItem import CartItemSerializer
from django.shortcuts import get_object_or_404

from classes import CartHandler, SessionHandler


from django.contrib.auth import get_user_model


User = get_user_model()

#####################################################################
# from rest_framework import authentication
# authentication_classes = [authentication.TokenAuthentication]
#####################################################################


class CartClearExpired(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def post(self, request):
        CartHandler.clearExpiredCarts()
        return Response({'message': 'Expired carts cleared.'}, status=status.HTTP_201_CREATED)


class CartDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, id=user_id)
        cart = Cart.objects.get(customer=user)
        cart_items = CartItemSerializer(
            CartItem.objects.filter(cart=cart), many=True)
        return Response(cart_items.data, status=status.HTTP_200_OK)


class CartListView(ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    pagination_class = LargeResultsSetPagination
    permission_classes = (permissions.IsAdminUser,)


class CartDeleteView(DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser,)


class CartCreateView(CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser,)


class CartUpdateView(UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = (permissions.IsAdminUser,)
