from django.urls import path
from products.api import purchase, userActions

urlpatterns = [

    path('all/', purchase.PurchaseListView.as_view(), name='purchase_list'),

    path('<int:purchase_id>/',
         purchase.PurchaseDetailView.as_view(), name='purchase_detail'),

    path('<create/',
         purchase.PurchaseCreateView.as_view(), name='purchase_create'),

    path('<int:pk>/delete/',
         purchase.PurchaseDeleteView.as_view(), name='purchase_delete'),

    path('<int:pk>/update/',
         purchase.PurchaseUpdateView.as_view(), name='purchase_update'),


    # user interactions
    path('history/', userActions.GetPurchases.as_view(),
         name='my_purchase_history')


]
