from django.conf.urls import url
from payments import views

urlpatterns = [
    url('test-payment/', views.test_payment),
]
