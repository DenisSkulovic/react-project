from django.urls import path
from products.api import purchase

urlpatterns = [

    path('all/', purchase.PurchaseListView.as_view(), name='purchase_list'),

    path('<int:purchase_id>/',
         purchase.PurchaseDetailView.as_view(), name='purchase_detail'),

    path('<create/',
         purchase.PurchaseCreateView.as_view(), name='purchase_create'),

    path('<int:purchase_id>/delete/',
         purchase.PurchaseDeleteView.as_view(), name='purchase_delete'),

    path('<int:purchase_id>/update/',
         purchase.PurchaseDeleteView.as_view(), name='purchase_update'),

]
