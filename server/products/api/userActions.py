from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from products.models import (
    CartItem, Purchase, PurchaseItem)
from products.serializers.cartItem import CartItemSerializer
from products.serializers.purchaseItem import PurchaseItemSerializer
from products.serializers.purchase import PurchaseSerializer
from django.contrib.auth import get_user_model
from django.db.models import F
from rest_framework import status
from classes import CartHandler

User = get_user_model()


class FinalizeCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):

        cart_handler = CartHandler(request)
        cart_handler.session_handler.refresh_session()
        purchase, puchase_items = cart_handler.finalize_cart()

        content = {'purchase': PurchaseSerializer(
            purchase).data,
            'purchase_items': PurchaseItemSerializer(puchase_items, many=True).data,
            'session_key': cart_handler.session_key}
        return Response(content, status=status.HTTP_201_CREATED)


class ClearCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        cart_handler = CartHandler(request)
        cart_handler.session_handler.refresh_session()
        cart_handler.clear_cart()

        # has to be empty, but just in case, returning the supposedly empty list
        cart_items = cart_handler.get_cart_items()
        cart_items = CartItemSerializer(cart_items, many=True).data
        content = {'cart_items': cart_items,
                   'session_key': cart_handler.session_key}
        return Response(content, status=status.HTTP_202_ACCEPTED)


class GetPurchases(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        cart_handler = CartHandler(request)
        cart_handler.session_handler.refresh_session()
        content = []
        purchases = Purchase.objects.filter(
            customer=request.user).order_by('created_date')
        for purchase in purchases:
            purchase_items = PurchaseItem.objects.filter(purchase=purchase)
            content.append({'purchase': PurchaseSerializer(purchase).data,
                            'purchase_items': PurchaseItemSerializer(purchase_items, many=True).data,
                            'session_key': cart_handler.session_key})
        return Response(content, status=status.HTTP_200_OK)


class GetCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        cart_handler = CartHandler(request)
        cart_handler.session_handler.refresh_session()
        cart_items = cart_handler.get_cart_items()
        cart_items = CartItemSerializer(cart_items, many=True).data
        content = {
            'cart_items': cart_items,
            'session_key': cart_handler.session_key
        }
        return Response(content, status=status.HTTP_200_OK)


class AddRemoveCartItem(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, change, item_id, quantity):
        if change not in {"add", "remove"}:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

        quantity = int(quantity)

        cart_handler = CartHandler(request)
        cart_handler.session_handler.refresh_session()
        cart_handler.add_or_remove_cart_item(change, item_id, quantity)

        # return cart
        cart_items = CartItem.objects.filter(
            cart=cart_handler.cart).order_by('product__category', 'product__name')
        cart_items = CartItemSerializer(cart_items, many=True).data
        content = {'cart_items': cart_items,
                   'session_key': cart_handler.session_key}
        return Response(content, status=status.HTTP_201_CREATED)
