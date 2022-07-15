from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    path('propertylist/',views.getProperties),
    path('updateProperty/<int:property_id>',views.updatePropertyDetails),
    path('deleteProperty/<int:property_id>',views.deleteProperty),
    path('getProperty/<int:property_id>',views.getProperty),
    path('getallcategory/', views.getCategoryList, name="getcategorylist"),
    path('getfacilities/',views.getFacilityList, name="getfacilitylist" ),
    path('property/publish/', views.publishProperty, name="publishProperty"),
    path('photouploadhelper/', views.photoUpload, name="photouploadhelper"),
    # path('getsafetyitems/', views.getSafetyItemList, name="getsafetyitemlist"),
    # path('propertylist/', views.getPropertyDetails),
]
