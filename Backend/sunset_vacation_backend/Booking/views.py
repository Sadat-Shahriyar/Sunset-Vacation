from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from Hosting.models import *
from Hosting.serializer import *
from Authentication.models import *
from Authentication.serializers import *
# Create your views here.


@api_view(["GET"])
def getPropertyDetails(request, property_id):
    property = Property.objects.get(propertyID=property_id)
    propertySerializer = PropertySerializer(property)
    propertyInfo = propertySerializer.data;
    ownername = User.objects.filter(id=propertyInfo["owner_id"]).values("name")
    propertyInfo["ownerName"] = ownername[0]["name"]
    dos = House_Rules.objects.filter(propertyID=property).filter(do_dont_flag=1).values_list('rule')

    donts = House_Rules.objects.filter(propertyID=property).filter(do_dont_flag=0).values_list('rule')
    faqs = FAQ.objects.filter(propertyID=property).values()

    facilities = PropertyFacilities.objects.filter(propertyID=property).values()

    ratings = Ratings.objects.filter(propertyID=property).values()
    reviews = Reviews.objects.filter(propertyID=property).values()

    for review in reviews:
        user = User.objects.get(id=review["user_id_id"])
        uSerializer = UserSerializer(user).data
        review["username"] = uSerializer["name"]

    photos = PropertyPhotos.objects.filter(property_id_id = property_id).values()

    return Response({"facilities":facilities, "faqs":faqs, "dos":dos, "donts":donts,"property":propertyInfo, 
                    "ratings":ratings,"reviews":reviews,"photos":photos },status=status.HTTP_200_OK)
