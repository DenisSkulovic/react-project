from django.urls import path
from products.api import product


urlpatterns = [

    path('all/', product.ProductListView.as_view(), name='product_list'),

    path('all/bycategory', product.ProductListByCategoryView.as_view(),
         name='product_list'),

    path('<int:product_id>/',
         product.ProductDetailView.as_view(), name='product_detail'),

    path('create/',
         product.ProductCreateView.as_view(), name='product_create'),

    path('<int:pk>/delete/',
         product.ProductDeleteView.as_view(), name='product_delete'),

    path('<int:pk>/update/',
         product.ProductUpdateView.as_view(), name='product_update'),

    path('all/bycategory/random/', product.ProductRandomView.as_view(),
         name='product_bycategory_random'),

    # products for category
    path('category/<str:category>/',
         product.ProductCategoryView.as_view(), name='product_list_category'),
]
