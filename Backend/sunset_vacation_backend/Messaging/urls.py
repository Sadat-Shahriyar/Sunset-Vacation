from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    # path('markMessage/<int:messageId>', views.markMessage),
    path('getMessages/<int:userId>', views.getMessagesById),
    path('getMessages/', views.getMessages),
    # path('sendmessage/',views.senMessage),
    # path('getmessages/', views.getMessages),
]
