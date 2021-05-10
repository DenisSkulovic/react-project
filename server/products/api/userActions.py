from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView, DestroyAPIView,
    CreateAPIView, UpdateAPIView)
from rest_framework.response import Response
from rest_framework import permissions
from products.models import (
    Product, Cart, CartItem, Purchase, PurchaseItem, StockItem, Category)
from products.serializers.cartItem import CartItemSerializer
from django.contrib.auth import get_user_model
from django.db.models import F
from rest_framework import status
from django.shortcuts import get_object_or_404

User = get_user_model()


class FinalizeCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, cart_id):
        cart = get_object_or_404(Cart, id=cart_id)
        cart_items = CartItem.objects.filter(cart=cart)

        if len(cart_items) == 0:
            return Response({"message": "Cart is empty"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        total_paid = 0
        for cart_item in cart_items:
            total_paid += cart_item.quantity * cart_item.unit_price
        purchase = Purchase.objects.create(
            customer=request.user, total_paid=total_paid)

        # create purchase items and remove cart items
        for cart_item in cart_items:
            PurchaseItem.objects.create(product=cart_item.product, purchase=purchase,
                                        quantity=cart_item.quantity, price=cart_item.unit_price)
            cart_item.delete()
        cart.delete()

        # return purchase
        content = PurchaseItem.objects.filter(purchase=purchase)
        return Response(PurchaseItemSerializer(content).data, status=status.HTTP_201_CREATED)


class ClearCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, cart_id):
        cart = get_object_or_404(Cart,
                                 id=cart_id, customer=request.user)
        CartItem.objects.filter(cart=cart).delete()
        content = CartItem.objects.filter(cart=cart)
        return Response(content, status=status.HTTP_202_ACCEPTED)


class GetCart(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        cart = get_object_or_404(Cart,
                                 customer=request.user)
        content = CartItemSerializer(
            CartItem.objects.filter(cart=cart), many=True).data
        return Response(content, status=status.HTTP_200_OK)


class AddRemoveCartItem(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, item_id, quantity):
        item = get_object_or_404(Product, id=item_id)
        quantity = int(quantity)
        stock_item = get_object_or_404(StockItem, product=item)
        cart = Cart.objects.get_or_create(customer=request.user)

        if stock_item.quantity < quantity:
            return Response({"message": "Insufficient items in stock."}, status=status.HTTP_406_NOT_ACCEPTABLE)

        if quantity == 0:
            # return cart
            content = CartItem.objects.filter(cart=cart)
            return Response(CartItemSerializer(content, many=True).data, status=status.HTTP_200_OK)

        # if adding some amount to cart
        elif quantity > 0:
            try:
                cartItem = CartItem.objects.get(cart=cart, product=item)
                stock_item.update(quantity=F("quantity") - quantity)
                cartItem.update(quantity=F("quantity") + quantity)
            except:
                cartItem = CartItem.objects.create(
                    customer=request.user, product=item, cart=cart, quantity=quantity, price=item.unit_price)
            # return cart
            content = CartItem.objects.filter(cart=cart)
            return Response(CartItemSerializer(content, many=True).data, status=status.HTTP_201_CREATED)

        # if removing some amount from cart
        elif quantity < 0:
            try:
                cartItem = CartItem.objects.get(product=item)
                cartItem.update(quantity=F('quantity') - quantity)
                stock_item.update(quantity=F("quantity") + quantity)
                # return cart
                content = CartItem.objects.filter(cart=cart)
                return Response(CartItemSerializer(content, many=True).data, status=status.HTTP_200_OK)
            except:
                # return cart
                content = CartItem.objects.filter(cart=cart)
                return Response(CartItemSerializer(content, many=True).data, status=status.HTTP_200_OK)

        # return cart
        content = CartItem.objects.filter(cart=cart)
        return Response(CartItemSerializer(content, many=True).data, status=status.HTTP_201_CREATED)
