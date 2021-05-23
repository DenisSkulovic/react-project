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
from products.serializers.cart import CartSerializer
from products.serializers.cartItem import CartItemSerializer
from classes import CartHandler
from django.contrib.auth import get_user_model


User = get_user_model()


class CartClearExpired(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request):
        CartHandler.clearExpiredCarts()
        return Response({'message': 'Expired carts cleared.'}, status=status.HTTP_201_CREATED)


class CartDetailView(APIView):
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, user_id):
        # first retrieve info to Python and check outside of SQL to avoid injection
        users = User.objects.all()
        user_ids = {user.id for user in users}
        try:
            if user_id in user_ids:
                user = User.objects.get(id=user_id)
                cart = Cart.objects.get(customer=user)
                cart_items = CartItemSerializer(
                    CartItem.objects.filter(cart=cart), many=True)
                return Response(cart_items.data, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Requested id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({'message': 'Requested id does not exist.'}, status=status.HTTP_400_BAD_REQUEST)


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
