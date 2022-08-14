from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    path('sendmessage/',views.senMessage),
    path('getmessages/', views.getMessages),
]
