from django.urls import path
from . import views


urlpatterns = [
    path('getAllQuestions/',views.getAllQuestions),
    path('getQAproperty/<str:title>',views.getQAproperty),
]
