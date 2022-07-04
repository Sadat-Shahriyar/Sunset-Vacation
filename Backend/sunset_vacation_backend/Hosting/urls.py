from django.urls import path
from . import views


urlpatterns = [
    path('<int:user_id>/', views.getProperties),
    path('property/<int:property_id>/', views.getPropertyDetails),
]
