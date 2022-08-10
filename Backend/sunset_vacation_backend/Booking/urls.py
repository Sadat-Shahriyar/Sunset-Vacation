from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    path('propertydetails/<int:property_id>/',views.getPropertyDetails),
]
