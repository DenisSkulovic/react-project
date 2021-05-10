from django.urls import path
from products.api import purchaseItem


urlpatterns = [

    path('all/', purchaseItem.PurchaseItemListView.as_view(),
         name='purchase_item_list'),

    path('<int:purchaseItem_id>/',
         purchaseItem.PurchaseItemDetailView.as_view(), name='purchase_item_detail'),

    path('create/',
         purchaseItem.PurchaseItemCreateView.as_view(), name='purchase_item_create'),

    path('<int:pk>/delete/',
         purchaseItem.PurchaseItemDeleteView.as_view(), name='purchase_item_delete'),

    path('<int:pk>/update/',
         purchaseItem.PurchaseItemUpdateView.as_view(), name='purchase_item_update'),

]
