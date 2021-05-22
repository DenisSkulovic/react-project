from django.contrib.sessions.models import Session
from django.db.models import F
from server import settings
from users.serializers.user import UserSessionSerializer
from products.models import (
    Cart,
    CartItem,
    StockItem,
    Product,
    Purchase,
    PurchaseItem)
from django.utils import timezone
from datetime import timedelta


class SessionHandler():
    '''
    Takes in a request object, validates session related data and performs session refresh/creation
    '''

    def __init__(self, request, expire_time=settings.SESSION_COOKIE_AGE):
        self.request = request
        self.expire_time = expire_time
        # session_key
        self.session_key = self._get_or_create_session_key(request)
        # session
        self.session = Session.objects.get(session_key=self.session_key)
        self.refresh_session()
        self.delete_expired_sessions()

    def refresh_session(self):
        self._refresh_session(self.session, self.expire_time)

    @staticmethod
    def _check_session_expiry_validity(session):
        if timezone.now() > session.expire_date:
            return False
        return True

    def _get_or_create_session_key(self, request):
        try:
            # try to use the key provided - check it for validity
            validated_session_key = self._validate_session_key(
                request.headers.get("Sessionkey"))
            session = Session.objects.get(
                session_key=validated_session_key)
            session_key = session.session_key
            if self._check_session_expiry_validity(session):
                return session_key
            else:
                request.session.create()
                return request.session.session_key
        except:
            # if key cannot be used - create new session
            request.session.create()
            print('request.session.session_key', request.session.session_key)
            return request.session.session_key

    @staticmethod
    def _refresh_session(session, expire_time):
        session.expire_date = timezone.now() + timedelta(seconds=expire_time)
        session.save()

    @staticmethod
    def _validate_session_key(session_key):
        serializer = UserSessionSerializer(
            data={'session_key': session_key})
        if serializer.is_valid():
            return serializer.validated_data['session_key']
        else:
            return None

    @staticmethod
    def delete_expired_sessions():
        Session.objects.filter(
            expire_date__lte=timezone.now()).delete()


class CartHandler():
    def __init__(self, request):
        self.session_handler = SessionHandler(request)
        self.session_key = self.session_handler.session_key
        self.session = self.session_handler.session
        self.request = request
        self.cart = self._get_cart(request, self.session_key)
        self.clear_expired_carts()

    def get_cart_items(self):
        return self._get_cart_items(self.cart)

    def add_or_remove_cart_item(self, change, item_id, quantity):
        self._add_or_remove_cart_item(self.cart, change, item_id, quantity)

    def clear_cart(self):
        self._clear_cart(self.cart)

    def finalize_cart(self):
        cart_items = CartItem.objects.filter(cart=self.cart)

        total_paid = 0
        for cart_item in cart_items:
            total_paid += cart_item.quantity * cart_item.price

        if self.request.user.is_authenticated:
            purchase = Purchase.objects.create(
                customer=self.request.user, total_paid=total_paid)

        else:
            purchase = Purchase.objects.create(
                session=Session.objects.get(session_key=self.session_key), total_paid=total_paid)

        # create purchase items and remove cart items
        for cart_item in cart_items:
            PurchaseItem.objects.create(product=cart_item.product, purchase=purchase,
                                        quantity=cart_item.quantity, price=cart_item.price)
            cart_item.delete()

        purchase_items = PurchaseItem.objects.filter(purchase=purchase)
        return purchase, purchase_items

    @classmethod
    def _clear_cart(cls, cart):
        cart_items = CartItem.objects.filter(cart=cart)
        cls._cart_items_back_to_stock(cart_items)

    @staticmethod
    def _get_cart(request, session_key=''):
        if session_key:
            cart, _ = Cart.objects.get_or_create(
                session=Session.objects.get(session_key=session_key))
            return cart
        elif request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(customer=request.user)
            return cart
        cart, _ = Cart.objects.get_or_create(
            session=Session.objects.get(session_key=session_key))
        return cart

    @staticmethod
    def _add_or_remove_cart_item(cart, change, item_id, quantity):
        item = Product.objects.get(id=item_id)
        stock_item = StockItem.objects.get(product=item)

        if quantity < 0:
            return

        if change == "remove":
            quantity = -quantity

        if stock_item.quantity < quantity:
            return

        if quantity > 0:
            try:
                cartItem = CartItem.objects.get(cart=cart, product=item)
                stock_item.quantity = F('quantity') - quantity
                cartItem.quantity = F('quantity') + quantity
                stock_item.save()
                cartItem.save()
            except:
                cartItem = CartItem.objects.create(
                    product=item, cart=cart, quantity=quantity, price=item.unit_price)
                stock_item.quantity = F('quantity') - quantity
                stock_item.save()

        if quantity < 0:
            try:
                cartItem = CartItem.objects.get(cart=cart, product=item)
                if cartItem.quantity + quantity <= 0:
                    CartItem.objects.filter(cart=cart, product=item).delete()
                else:
                    cartItem.quantity = F('quantity') + quantity
                    cartItem.save()
                stock_item.quantity = F('quantity') - quantity
                stock_item.save()
            except:
                return

    @staticmethod
    def _get_cart_items(cart):
        return CartItem.objects.filter(cart=cart).order_by('product__category', 'product__name')

    @staticmethod
    def _cart_items_back_to_stock(cart_items):
        for cart_item in cart_items:
            stock_item = StockItem.objects.get(
                product=cart_item.product)
            stock_item.quantity = F('quantity') + cart_item.quantity
            stock_item.save()
            cart_item.delete()

    @classmethod
    def clear_expired_carts(cls):
        active_sessions = Session.objects.filter(
            expire_date__gte=timezone.now())
        if active_sessions:
            expired_carts = Cart.objects.exclude(session__in=active_sessions)
            sessionless_carts = Cart.objects.filter(session_id=None)
            carts_to_delete = expired_carts | sessionless_carts
            if carts_to_delete:
                expired_cart_items = CartItem.objects.filter(
                    cart__in=carts_to_delete)
                if expired_cart_items:
                    cls._cart_items_back_to_stock(expired_cart_items)
                    carts_to_delete.delete()
        else:
            cls._cart_items_back_to_stock(CartItem.objects.all())
            Cart.objects.all().delete()
