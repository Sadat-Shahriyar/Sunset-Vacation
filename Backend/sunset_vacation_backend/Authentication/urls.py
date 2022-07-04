from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    # path('login/', views.login, name="login"),
    # path('hello/', views.hello, name="hello")
]
