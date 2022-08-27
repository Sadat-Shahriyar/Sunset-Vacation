from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

urlpatterns = [
    path('signup/', views.signup, name="signup"),
    path('login/', views.login, name="login"),
    path('adminlogin/', views.adminLogin, name="login"),
    path('logout/', views.logout, name="logout"),
    path('verify/', views.verifyToken, name="verifyToken"),
    path('getProfileInfo/', views.getProfileInfo),
    path('getGiftCardList/', views.getGiftCardList),
    path('hello/', views.hello, name="hello")
]
