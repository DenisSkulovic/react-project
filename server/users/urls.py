from django.urls import path, include
from users.api import forUsers, forAdmins
from knox import views as knox_views

urlpatterns = [
    # user endpoints
    path("auth/", include('knox.urls')),
    # login and logout are overriden below, so the above only provides logoutall, which is not very useful
    path('auth/register', forUsers.UserRegister.as_view(), name="user_register"),
    path('auth/login', forUsers.UserLogin.as_view(), name="user_login"),
    path('auth/user', forUsers.UserAPI.as_view(), name="user_api"),
    path('auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),
    path('auth/session/', forUsers.UserSession.as_view(), name="user_session"),


    #     path('account/', forUsers.UserAccount.as_view(), name="user_account"),
    path('account/change_password/', forUsers.ChangePassword.as_view(),
         name="user_change_password"),

    # admin endpoints
    path('account/<int:pk>/', forAdmins.UserDetail.as_view(), name="account_detail"),
    path('account/<int:pk>/all', forAdmins.UserList.as_view(), name="account_list"),
    path('account/<int:pk>/delete',
         forAdmins.UserDetail.as_view(), name="account_delete"),
    path('account/<int:pk>/update',
         forAdmins.UserDetail.as_view(), name="account_update"),

    path('account/<int:user_id>/full', forAdmins.UserFullDetailView.as_view(),
         name="account_full_view"),
]
