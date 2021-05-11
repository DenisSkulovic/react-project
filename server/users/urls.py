from django.urls import path
from . import views

urlpatterns = [
    # user endpoints
    path('register/', views.UserCreate.as_view(), name="register"),
    path('account/', views.UserAccount.as_view(), name="user_account"),
    path('account/change_password/', views.ChangePassword.as_view(),
         name="user_change_password"),

    # admin endpoints
    path('account/<int:pk>/', views.UserDetail.as_view(), name="account_detail"),
    path('account/<int:pk>/all', views.UserList.as_view(), name="account_list"),
    path('account/<int:pk>/delete',
         views.UserDetail.as_view(), name="account_delete"),
    path('account/<int:pk>/update',
         views.UserDetail.as_view(), name="account_update"),

    path('account/<int:user_id>/full', views.UserFullDetailView.as_view(),
         name="account_full_view"),
]
