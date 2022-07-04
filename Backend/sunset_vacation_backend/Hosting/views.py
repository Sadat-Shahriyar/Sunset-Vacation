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
def getProperties(request,user_id):
    try:
        user=User.objects.get(id=user_id)
        property=Property.objects.filter(owner_id=user)

       
        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property, many=True)
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

# class Property(
#     APIView,
#     UpdateModelMixin,
#     DestroyModelMixin,
# ):
#     def get(self,request):
#         try:
#             print("hello1")
#             property=Property.objects.all()

#             propertySerializer = PropertySerializer(property, many=True)

#             if propertySerializer.is_valid():
#                 return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
#             else:
#                 return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
#         except Property.DoesNotExist:
#             return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
