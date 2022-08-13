from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from Hosting.models import *
from Hosting.serializer import *
from Authentication.models import *
from Authentication.serializers import *
import stripe
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from datetime import timedelta
from django.contrib.postgres.search import  SearchQuery, SearchRank, SearchVector,TrigramSimilarity
from psycopg2.extras import NumericRange
# Create your views here.

def getAllQuestions(request):
    return Response({"Hello": "hello"})


@api_view(["GET"])
def getQAproperty(request,title):
    vector=(
        TrigramSimilarity('title',title)
    )
    s=Property.objects.filter(title__search=title)
    # s=Property.objects.annotate( similarity=vector).filter(similarity__gt=0.5).order_by('-similarity')
    p =PropertySerializer(s, many=True)
    print(len(p.data))
    propertyList=[]
    for property in p.data:
        photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        property['images'] = photoSerializer.data
        propertyList.append(property)

    return Response({'propertyList': propertyList},status=status.HTTP_200_OK)