from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.mixins import UpdateModelMixin,DestroyModelMixin
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from Authentication.models import *
from Authentication.serializers import *
from rest_framework.decorators import api_view
# Create your views here.

@api_view(["GET"])
def getProperties(request):
    try:
        
        user=User.objects.get(id=1)
        
        property=Property.objects.filter(owner_id_id=user)

       
        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property, many=True)
        #print(propertySerializer.data)
        return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getPropertyDetails(request,property_id):
    try:
        
        property=Property.objects.get(property_id=property_id)

       
        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property)
        
        photos = PropertyPhotos.objects.filter(property_id=property)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)



        return Response({"property": propertySerializer.data, "photos": photoSerializer.data}, status= status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getProperty(request,property_id):
    try:
        propertyInfo=Property.objects.get(propertyID=property_id)
        propertySerializer=PropertySerializer(propertyInfo)
        photos = PropertyPhotos.objects.filter(property_id=propertyInfo)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        return Response({"property": propertySerializer.data, "photos": photoSerializer.data}, status= status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
@api_view(["PUT"])
def updatePropertyDetails(request,property_id):
    propertyInfo=Property.objects.get(propertyID=property_id)
    serializer = PropertySerializer(propertyInfo,request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error":"error 404"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def deleteProperty(request,property_id):
    propertyInfo=Property.objects.get(propertyID=property_id)
    propertyInfo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])   
def getFaqs(request,property_id):
    try:
        
        property=Property.objects.get(propertyID=property_id)
        
        faq=FAQ.objects.filter(propertyID_id=property)

        faqSerializer =FAQSerializer(faq, many=True)
        
        return Response({"faqs": faqSerializer.data,"propertyTitle":property.title}, status= status.HTTP_200_OK)
        
    except FAQ.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
def deleteFaq(request,faq_id):
    faq=FAQ.objects.get(faq_id=faq_id)
    faq.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["GET"])   
def getFacilities(request):
    try:
        
        facilities=Facility.objects.all()
        facilitySerializer = FacilitySerializer(facility, many=True)
            
        return Response({"facilities": facilitySerializer.data}, status= status.HTTP_200_OK)
            
    except Facility.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getPropertyFacilities(request,property_id):
    try:
        property=Property.objects.get(propertyID=property_id)
        propertyFacilities=PropertyFacilities.objects.filter(propertyID_id=property)
        propertyFacilitiesSerializer =PropertyFacilitiesSerializer(propertyFacilities, many=True)
        fac=[]
        for p in propertyFacilitiesSerializer.data:
            facility=Facility.objects.get(facility_name=p["facility_name"])
            facilitySerializer=FacilitySerializer(facility)
            p["catagory"]=facilitySerializer.data["catagory"]
            fac.append(p)
        
        catagories=Facility.objects.values('catagory').distinct().order_by()
        catagorySerializer = FacilitySerializer(catagories,many=True)
        
        pfacilities=[]
        for f in catagorySerializer.data:
            l=0
            catagoryBasedfacilityList=[]
            emptyCatagory=[]
            for p in fac:
                if p["catagory"] == f["catagory"]:
                    catagoryBasedfacilityList.append(p)
                    l=l+1
                
            list={"catagory":f["catagory"],"list":catagoryBasedfacilityList,"length":l}
            pfacilities.append(list) 
            
           
        
        return Response({"pfacilities": pfacilities},status=status.HTTP_200_OK)
    except PropertyFacilities.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["POST"])
def insertFaq(request):
    print(request.data)
    
    
    serializer = FAQSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(["PUT"])
def updateFaq(request,faq_id):
    faq=FAQ.objects.get(faq_id=faq_id)
    serializer = FAQSerializer(faq,request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error":"error 404"}, status=status.HTTP_404_NOT_FOUND)