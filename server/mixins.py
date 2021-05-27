from django.contrib.sessions.models import Session
from products.models import Cart


class ConnectCartWithUserMixin():
    @staticmethod
    def connect_cart_with_user(user, session_key):
        session = Session.objects.get(session_key=session_key)
        try:
            old_cart = Cart.objects.get(customer=user)
            old_cart.customer_id = None
            old_cart.save()
        except:
            pass

        cart, _ = Cart.objects.get_or_create(session_id=session.session_key)
        cart.customer_id = user.id
        cart.save()
