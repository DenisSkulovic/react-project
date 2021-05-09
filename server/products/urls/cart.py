from django.urls import path
from products.api import cart


urlpatterns = [

    path('all/', cart.CartListView.as_view(), name="cart_list"),

    path('<int:user_id>/', cart.CartDetailView.as_view(), name='cart_detail'),

    path('create/',
         cart.CartCreateView.as_view(), name='cart_create'),

    path('<int:user_id>/delete/',
         cart.CartDeleteView.as_view(), name='cart_delete'),

    path('<int:user_id>/update/',
         cart.CartUpdateView.as_view(), name='cart_update'),
]
