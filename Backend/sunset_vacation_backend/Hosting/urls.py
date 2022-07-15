from django.urls import path
from . import views


urlpatterns = [
    #path('<int:user_id>/', views.getProperties),
    path('propertylist/',views.getProperties),
    path('facilitylist/',views.getFacilities),
    path('updateProperty/<int:property_id>',views.updatePropertyDetails),
    path('deleteProperty/<int:property_id>',views.deleteProperty),
    path('photos/<int:photo_id>', views.deletePropertyPhoto),
    path('getPropertyPhoto/<int:property_id>', views.getPropertyPhoto, name="getPropertyPhoto"),
    path('deleteFaq/<int:faq_id>',views.deleteFaq),
    path('getProperty/<int:property_id>',views.getProperty),
    path('getFaqs/<int:property_id>',views.getFaqs),
    path('insertFaq/',views.insertFaq),
    path('getPropertyFacilities/<int:property_id>',views.getPropertyFacilities),
    path('getallcategory/', views.getCategoryList, name="getcategorylist"),
    path('getfacilities/',views.getFacilityList, name="getfacilitylist" ),
    path('property/publish/', views.publishProperty, name="publishProperty"),
    path('photouploadhelper/', views.photoUpload, name="photouploadhelper"),
    # path('getsafetyitems/', views.getSafetyItemList, name="getsafetyitemlist"),
    # path('propertylist/', views.getPropertyDetails),
]
