from django.urls import path
from products.api import category


urlpatterns = [

    path('all/', category.CategoryListView.as_view(), name='category_list'),

    path('<int:category_id>/',
         category.CategoryDetailView.as_view(), name='category_detail'),

    path('create/',
         category.CategoryCreateView.as_view(), name='category_create'),

    path('<int:pk>/delete/',
         category.CategoryDeleteView.as_view(), name='category_delete'),

    path('<int:pk>/update/',
         category.CategoryUpdateView.as_view(), name='category_update'),

]
