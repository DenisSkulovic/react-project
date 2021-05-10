from django.urls import path
from products.api import stockItem


urlpatterns = [

    path('all/', stockItem.StockItemListView.as_view(),
         name='stock_item_list'),

    path('<int:user_id>/',
         stockItem.StockItemDetailView.as_view(), name='stock_item_detail'),

    path('create/',
         stockItem.StockItemCreateView.as_view(), name='stock_item_create'),

    path('<int:pk>/delete/',
         stockItem.StockItemDeleteView.as_view(), name='stock_item_delete'),

    path('<int:pk>/update/',
         stockItem.StockItemUpdateView.as_view(), name='stock_item_update'),

]
