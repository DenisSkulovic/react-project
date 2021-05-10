from django.urls import path
from products.api import cart
from products.api import userActions


urlpatterns = [

    path('all/', cart.CartListView.as_view(), name="cart_list"),

    path('<int:user_id>/', cart.CartDetailView.as_view(), name='cart_detail'),

    path('create/',
         cart.CartCreateView.as_view(), name='cart_create'),

    path('<int:user_id>/delete/',
         cart.CartDeleteView.as_view(), name='cart_delete'),

    path('<int:user_id>/update/',
         cart.CartUpdateView.as_view(), name='cart_update'),

    # user cart interactions
    path("add/<int:quantity>",
         userActions.AddRemoveCartItem.as_view(), name="cart_add_remove"),

    path('pay/<int:cart_id>/', userActions.FinalizeCart.as_view(),
         name="finalize_cart"),

    path('', userActions.GetCart.as_view(), name="user_cart"),

]
