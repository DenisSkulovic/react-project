from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.AllProductsView.as_view(), name='all'),
    path('cart/', views.CartView.as_view(), name='cart'),
    path('category/<str:category>',
         views.CategoryProductsView.as_view(), name='category'),
]
