from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    path('propertydetails/<int:property_id>/',views.getPropertyDetails),
    path('reserve/', views.reserve),
    path('checkAvailabilityOfDate/', views.checkAvailabilityOfDate),
    path('getbookinglist/', views.getBookingList),
    path('getbookinglistusingpropertyid/<int:property_id>/',views.getbookinglistusingpropertyid ),
    path('getbookingdetails/<int:booking_id>/', views.getbookingdetails),
    path('cancelreservation/<int:booking_id>/', views.cancelReservation),
    path('getPreviousReservations/', views.getPreviousReservations),
    path('getCurrentReservations/', views.getCurrentReservations),
    path('getNextSevenDaysReservations/', views.getNextSevenDaysReservations),
    path('getAllFutureReservations/', views.getAllFutureReservations),
]
