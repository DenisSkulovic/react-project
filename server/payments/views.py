from django.shortcuts import render
import stripe
from rest_framework.decorators import api_view

stripe.api_key = 'pk_test_51Ioo1uLg0qQUGRvgfEKfAWwCwJDFfA0yNQDl0GG9hbeRPVaLXEKu9TmXvkHXxy78btKbKugOrNWHdOi2qaxflbf200CiAK0vmn'


@api_view(['POST'])
def test_payment(request):

    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln',
        payment_method_types=['card'],
        receipt_email='test@example.com')

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)
