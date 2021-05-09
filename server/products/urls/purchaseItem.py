from django.urls import path
from products.api import purchaseItem


urlpatterns = [

    path('all/', purchaseItem.PurchaseItemListView.as_view(),
         name='purchase_item_list'),

    path('<int:purchaseItem_id>/',
         purchaseItem.PurchaseItemDetailView.as_view(), name='purchase_item_detail'),

    path('create/',
         purchaseItem.PurchaseItemCreateView.as_view(), name='purchase_item_create'),

    path('<int:purchaseItem_id>/delete/',
         purchaseItem.PurchaseItemDeleteView.as_view(), name='purchase_item_delete'),

    path('<int:purchaseItem_id>/update/',
         purchaseItem.PurchaseItemDeleteView.as_view(), name='purchase_item_update'),

]
