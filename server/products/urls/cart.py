from django.urls import path
from products.api import cart
from products.api import userActions


urlpatterns = [

    path('all/', cart.CartListView.as_view(), name="cart_list"),

    path('<int:user_id>/', cart.CartDetailView.as_view(), name='cart_detail'),

    path('create/',
         cart.CartCreateView.as_view(), name='cart_create'),

    path('<int:pk>/delete/',
         cart.CartDeleteView.as_view(), name='cart_delete'),

    path('<int:pk>/update/',
         cart.CartUpdateView.as_view(), name='cart_update'),

    path('clear-expired/', cart.CartClearExpired.as_view(),
         name='cart_clear_expired'),

    #
    # user cart interactions
    #
    path("change/<str:change>/<int:item_id>/<int:quantity>",
         userActions.AddRemoveCartItem.as_view(), name="cart_add_remove"),

    path('pay/', userActions.FinalizeCart.as_view(),
         name="finalize_cart"),

    path('', userActions.GetCart.as_view(), name="user_cart"),

    path("clear/", userActions.ClearCart.as_view(), name="clear_user_cart"),
]
