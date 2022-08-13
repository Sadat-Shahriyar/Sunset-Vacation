from django.urls import path
from . import views


urlpatterns = [
    path('getAllQuestions/',views.getAllQuestions),
]
