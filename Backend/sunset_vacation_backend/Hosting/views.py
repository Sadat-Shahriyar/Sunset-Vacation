from unicodedata import category
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from Authentication.models import *
from Authentication.serializers import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.postgres.search import  SearchQuery, SearchRank, SearchVector,TrigramSimilarity
from psycopg2.extras import NumericRange
import datetime
from django.db.models import Q

@api_view(["POST"])
def addCategory(request):
    try:
        # change delete this portion
        #spelling mistake
        category = Catagory.objects.create(
            description=request.data["category"]
        )
        return Response({"message": "category added"}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
def addFacility(request):
    try:
        # change delete this portion
        facility = Facility.objects.create(
            catagory=request.data["category"],
            subcatagory=request.data["subcategory"],
            facility_name=request.data["facility"]
        )
        # change add code for fetching booking here by user
        return Response({"message":"ok"},status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


# Create your views here.
@api_view(["GET"])
def getPendingProperties(request):
    try:
        # change delete this portion
        property = Property.objects.filter(published=True,approved=False)
        propertySerializer = PropertySerializer(property, many=True)
        print(propertySerializer.data)
        # change add code for fetching booking here by user
        return Response({"properties": propertySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "405 not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(["PUT"])
def approveProperty(request, propertyId):
    try:
        # change delete this portion
        property = Property.objects.get(propertyID=propertyId)
        property.approved = True
        property.save()
        print(request.data)
        user = User.objects.get(id=property.owner_id_id)
        notification = Notification.objects.create(
            user_id=user,
            title="Published property with title- " + property.title,
            text=request.data["message"]
        )
        property = Property.objects.filter(published=True).filter(approved=False)
        propertySerializer = PropertySerializer(property, many=True)
        # change add code for fetching booking here by user
        return Response({"properties": propertySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 Bad request"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
def rejectProperty(request, propertyId):
    try:
        # change delete this portion
        property = Property.objects.get(propertyID=propertyId)
        property.published = False
        property.save()
        print(request.data)
        user = User.objects.get(id=property.owner_id_id)
        notification = Notification.objects.create(
            user_id=user,
            title=" Changes needed for property title- " + property.title,
            text=request.data["message"]
        )
        property = Property.objects.filter(published=True).filter(approved=False)
        propertySerializer = PropertySerializer(property, many=True)
        # change add code for fetching booking here by user
        return Response({"properties": propertySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "405 not found"}, status=status.HTTP_404_NOT_FOUND)

# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotification(request):
    try:
        print(request.user)
        user = UserSerializer(request.user).data
        user = User.objects.get(id=user['id'])
        # change delete this portion
        notification = Notification.objects.filter(user_id_id=user, marked=False)
        notificationSerializer = NotificationSerializer(notification, many=True)
        # change add code for fetching booking here by user
        return Response({"notifications": notificationSerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotificationId(request, notification_id):
    try:
        print(request.user)
        user = UserSerializer(request.user).data
        user = User.objects.get(id=user['id'])
        # change delete this portion
        notification = Notification.objects.get(id=notification_id)
        notificationSerializer = NotificationSerializer(notification)
        print(notification)
        # change add code for fetching specific booking by id here
        return Response({"notification": notificationSerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
def deleteNotification(request, notification_id):
    notification = Notification.objects.get(id=notification_id)
    notification.marked=True
    notification.save()
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])
    # change delete this portion
    notification = Notification.objects.filter(user_id_id=user, marked=False)
    notificationSerializer = NotificationSerializer(notification, many=True)
    # change add code for fetching booking here by user
    return Response({"notifications": notificationSerializer.data}, status=status.HTTP_200_OK)


@api_view(["GET"])
def getFacilityCategories(request):
    try:
        # change delete this portion
        print("hi1")
        categories = FacilityCategory.objects.all()
        print("hi")
        categorySerializer = FacilityCategorySerializer(categories, many=True)
        # change add code for fetching booking here by user
        return Response({"categories": categorySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getFacilitySubcategories(request):
    try:
        # change delete this portion
        subcategories = FacilitySubcategory.objects.all()
        subcategorySerializer = FacilitySubcategorySerializer(subcategories, many=True)
        # change add code for fetching booking here by user
        return Response({"subcategories": subcategorySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
#@permission_classes([IsAuthenticated])
def getPropertyPhoto(request, property_id):
    photos = PropertyPhotos.objects.filter(property_id=property_id)
    print(photos)
    photoSerializer = PropertyPhotoSerializer(photos, many=True)
    print(photoSerializer.data)
    return Response({"photos": photoSerializer.data, "success": True}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def deletePropertyPhoto(request, photo_id):
    photo = PropertyPhotos.objects.filter(id=photo_id)
    photo.delete()
    return Response({"success": True}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getProperties(request):
    try:
        user = UserSerializer(request.user).data
        user = User.objects.get(id=user['id'])
        property = Property.objects.filter(owner_id_id=user)
        propertySerializer = PropertySerializer(property, many=True)
        
        return Response({"properties": propertySerializer.data}, status=status.HTTP_200_OK)
       
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getPropertyDetails(request, property_id):
    try:

        property = Property.objects.get(property_id=property_id)

        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property)

        photos = PropertyPhotos.objects.filter(property_id=property)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)

        return Response({"property": propertySerializer.data, "photos": photoSerializer.data},
                        status=status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getProperty(request, property_id):
    try:
        propertyInfo = Property.objects.get(propertyID=property_id)
        propertySerializer = PropertySerializer(propertyInfo)
        photos = PropertyPhotos.objects.filter(property_id=propertyInfo)
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        return Response({"property": propertySerializer.data, "photos": photoSerializer.data},
                        status=status.HTTP_200_OK)
    except Property.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
def updatePropertyDetails(request, property_id):
    print("hello")
    propertyInfo = Property.objects.get(propertyID=property_id)
    serializer = PropertySerializer(propertyInfo, request.data)

    if serializer.is_valid():
        serializer.save()
        print("hello2")
        return Response({"success": True}, status=status.HTTP_200_OK)

    print(serializer.errors)
    return Response({"error": serializer.errors}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteProperty(request, property_id):
    propertyInfo = Property.objects.get(propertyID=property_id)
    propertyInfo.delete()
    return Response({"msg", "deleted facility successfully"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteFacility(request, fac_id):
    facility = PropertyFacilities.objects.get(id=fac_id)
    facility.delete()
    return Response({"msg": "deleted facility successfully"}, status=status.HTTP_200_OK)


@api_view(["GET"])
def getFaqs(request, property_id):
    try:

        property = Property.objects.get(propertyID=property_id)

        faq = FAQ.objects.filter(propertyID_id=property)

        faqSerializer = FAQSerializer(faq, many=True)

        return Response({"faqs": faqSerializer.data, "propertyTitle": property.title}, status=status.HTTP_200_OK)

    except FAQ.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteFaq(request, faq_id):
    faq = FAQ.objects.get(faq_id=faq_id)
    faq.delete()
    return Response({"msg": "successfully deleted faq"}, status=status.HTTP_200_OK)


@api_view(["GET"])
def getFacilities(request):
    try:

        facilities = Facility.objects.all()
        facilitySerializer = FacilitySerializer(facilities, many=True)

        return Response({"facilities": facilitySerializer.data}, status=status.HTTP_200_OK)

    except Facility.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPropertyFacilities(request, property_id):
    try:
        property = Property.objects.get(propertyID=property_id)
        propertyFacilities = PropertyFacilities.objects.filter(propertyID_id=property)
        propertyFacilitiesSerializer = PropertyFacilitiesSerializer(propertyFacilities, many=True)
        fac = []
        for p in propertyFacilitiesSerializer.data:
            facility = Facility.objects.get(facility_name=p["facility_name"])
            facilitySerializer = FacilitySerializer(facility)
            p["subcatagory"] = facilitySerializer.data["subcatagory"]
            fac.append(p)

        catagories = Facility.objects.values('subcatagory').distinct().order_by()
        catagorySerializer = FacilitySerializer(catagories, many=True)

        pfacilities = []

        for f in catagorySerializer.data:
            l = 0
            catagoryBasedfacilityList = []

            for i in range(len(fac)):
                if fac[i]["subcatagory"] == f["subcatagory"]:
                    catagoryBasedfacilityList.append(propertyFacilitiesSerializer.data[i])
                    l = l + 1

            if l != 0:
                list = {"catagory": f["subcatagory"], "list": catagoryBasedfacilityList}
                pfacilities.append(list)

        print(pfacilities)
        return Response({"pfacilities": pfacilities}, status=status.HTTP_200_OK)
    except PropertyFacilities.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAddFacilityList(request, property_id):
    amenities = Facility.objects.filter(catagory="amenity").values_list("facility_name")
    guestsFavourite = Facility.objects.filter(catagory="guestFav").values_list("facility_name")
    safetyItems = Facility.objects.filter(catagory="safety").values_list("facility_name")
    property = Property.objects.get(propertyID=property_id)
    propertyFacilities = PropertyFacilities.objects.filter(propertyID_id=property)
    propertyFacilitiesSerializer = PropertyFacilitiesSerializer(propertyFacilities, many=True)
    amenityList = []
    guestFavList = []
    safetyList = []
    facilities = []
    for f in propertyFacilitiesSerializer.data:
        facilities.append(f["facility_name"])
    for a in amenities:
        if not a[0] in facilities:
            amenityList.append(a)
    for a in guestsFavourite:
        if not a[0] in facilities:
            guestFavList.append(a)
    for a in safetyItems:
        if not a[0] in facilities:
            safetyList.append(a)


    if "Whats new" not in guestFavList:
        guestFavList.append(["Whats new"],)
    

    if amenities.exists() and guestsFavourite.exists() and safetyItems.exists():
        return Response(
            {"amenities": amenityList, "guestsFavourite": guestFavList, "safetyItems": safetyList, "success": True},
            status=status.HTTP_200_OK)

    else:
        return Response({"success": False, "error": "error 404 OT FOUND"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertFaq(request, property_id):
    propertyInfo = Property.objects.get(propertyID=property_id)
    newfaq = FAQ.objects.create(
        propertyID=propertyInfo,
        question=request.data["question"],
        answer=request.data["answer"]
    )
    return Response({"msg": "faq inserted"}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPropertyFacilityDetails(request, fid):
    print(fid)
    propertyFacilities = PropertyFacilities.objects.filter(id=fid)
    propertyFacilitiesSerializer = PropertyFacilitiesSerializer(propertyFacilities, many=True)
    print(propertyFacilitiesSerializer.data)
    return Response({"facility": propertyFacilitiesSerializer.data}, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updatePropertyFacility(request, fac_id):
    propertyFacility = PropertyFacilities.objects.get(id=fac_id)
    serializer = PropertyFacilitiesSerializer(propertyFacility, request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error": "error 404"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
def updateFaq(request, faq_id):
    faq = FAQ.objects.get(faq_id=faq_id)
    serializer = FAQSerializer(faq, request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error": "error 404"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getCategoryList(request):
    allCategories = Catagory.objects.values_list("description")
    categorySerializer = CatagorySerializer(allCategories)
    print(allCategories)
    return Response({"categories": allCategories, "success": True}, status=status.HTTP_200_OK)


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def getFacilityList(request):
    amenities = Facility.objects.filter(catagory="amenity").values_list("facility_name")
    guestsFavourite = Facility.objects.filter(catagory="guestFav").values_list("facility_name")
    safetyItems = Facility.objects.filter(catagory="safety").values_list("facility_name")
   
    # print(amenities)
    # print(guestsFavourite)
    # print(safetyItems)
    if amenities.exists() and guestsFavourite.exists() and safetyItems.exists():
        return Response(
            {"amenities": amenities, "guestsFavourite": guestsFavourite, "safetyItems": safetyItems, "success": True},
            status=status.HTTP_200_OK)

    else:
        return Response({"success": False, "error": "error 404 OT FOUND"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def publishProperty(request):
    user = UserSerializer(request.user).data
    print(user)
    print(request.data["images"])
    user = User.objects.get(id=user['id'])
    newProperty = Property.objects.create(
        owner_id=user,
        title=request.data['title'],
        catagory=request.data['catagory'],
        description=request.data['description'],
        perNightCost=request.data['perNightCost'],
        maxDaysRefund=request.data['maxDaysRefund'],
        noOfGuests=request.data['noOfGuests'],
        noOfBeds=request.data['noOfBeds'],
        noOfBedrooms=request.data['noOfBedrooms'],
        noOfBathrooms=request.data['noOfBathrooms'],
        address=request.data['address'],
        latitude=request.data['latitude'],
        longitude=request.data['longitude'],
        entirePrivateOrShared=request.data['entirePrivateOrshared'],
        published=True
    )

    images = request.data['images'].strip().split(",")

    for image in images:
        # photo_serializer = PropertyPhotoSerializer(data={"property_id": newProperty, "photo_url": image})
        # if photo_serializer.is_valid():
        #     photo_serializer.save()
        PropertyPhotos.objects.create(
            property_id=newProperty,
            photo_url=image
        )

    doss = request.data['dos'].strip().split(",")
    for dos in doss:
        House_Rules.objects.create(
            propertyID=newProperty,
            do_dont_flag=1,
            rule=dos
        )

    dontss = request.data['donts'].strip().split(",")
    for donts in dontss:
        House_Rules.objects.create(
            propertyID=newProperty,
            do_dont_flag=0,
            rule=donts
        )

    # dos = request.data['dos']
    # House_Rules.objects.create(
    #     propertyID=newProperty,
    #     do_dont_flag=1,
    #     rule=dos
    # )
    # donts = request.data['donts']
    # House_Rules.objects.create(
    #     propertyID=newProperty,
    #     do_dont_flag=0,
    #     rule=donts
    # )

    amenityList = request.data['amenityList'].strip().split(",")

   
    if(amenityList[0]!= '' and len(amenityList) >0):

        for amenity in amenityList:
            facility = Facility.objects.get(facility_name=amenity)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description=''
            )

    
   
    guestFavs = request.data['guestFavs'].strip().split(",")
    
    if(guestFavs[0] !='' and len(guestFavs) >0):
     
        print("print:", len(guestFavs))

        for fav in guestFavs:
            facility = Facility.objects.get(facility_name=fav)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description=''
            )

    safetyItems = request.data['safetyItems'].strip().split(",")

    
    if(safetyItems[0]!='' and len(safetyItems) >0 ):

        for item in safetyItems:
            facility = Facility.objects.get(facility_name=item)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description=''
            )

    return Response({"property": PropertySerializer(newProperty).data, "success": True}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addNewFacility(request, property_id):
    print(request.data)
    propertyinfo = Property.objects.get(propertyID=property_id)
    facilityList = request.data['facilities']  # .strip().split(",")

    for f in facilityList:
        facility = Facility.objects.get(facility_name=f["facility_name"])
        PropertyFacilities.objects.create(
            propertyID=propertyinfo,
            facility_name=facility,
            description=f["description"]
        )

    return Response({"msg": "inserted facilities successfully"}, status=status.HTTP_201_CREATED)


# @api_view(['POST'])
# def photoUpload(request):
#     print("hello")
#     print(request)
#     photos_serializer = PropertyPhotoUploadHelperSerializer(data=request.data)
#     if photos_serializer.is_valid():
#         photos_serializer.save()
#         print("hello")
#         propertyinfo = Property.objects.get(propertyID=request.data["property_id"])
#         photo = PropertyPhotos(property_id_id=propertyinfo, photo_url=photos_serializer.data["image"])
#         photo.save()
#         photos_serializer = PropertyPhotoSerializer(photo)

#         return Response({"uploaded_photo": photos_serializer, "success": True}, status=status.HTTP_201_CREATED)
#     else:
#         print('error', photos_serializer.errors)
#         return Response({"error": photos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getSafetyItemList(request):
#     safetyItems = Facility.objects.filter(category="safetyitem").values_list("facility_name")
#     print(safetyItems)
#     return Response({ "safetyItems": safetyItems, "success": True}, status=status.HTTP_200_OK)

@api_view(['POST'])
def photoUpload(request):
    # print(request.data)
    photos_serializer = PropertyPhotoUploadHelperSerializer(data=request.data)
    if photos_serializer.is_valid():
        photos_serializer.save()
        return Response({"uploaded_photo": photos_serializer.data, "success": True}, status=status.HTTP_201_CREATED)
    else:
        print('error', photos_serializer.errors)
        return Response({"error": photos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getAllPropertiesForHomePage(request):
    properites = Property.objects.filter(published=True,approved=True)
    propertySerializer = PropertySerializer(properites, many=True)
    # print(propertySerializer.data)
    propertyData = propertySerializer.data

    for property in propertyData:
        photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        property['images'] = photoSerializer.data

        dos = House_Rules.objects.filter(propertyID=property['propertyID']).filter(do_dont_flag=1)
        dos = House_RulesSerializer(dos, many=True).data
        property['dos'] = dos

        donts = House_Rules.objects.filter(propertyID=property['propertyID']).filter(do_dont_flag=0)
        donts = House_RulesSerializer(donts, many=True).data
        property['donts'] = donts

        faqs = FAQ.objects.filter(propertyID=property['propertyID'])
        faqSerializer = FAQSerializer(faqs, many=True)
        property['faqs'] = faqSerializer.data

        # TODO need to implement facilities

    return Response({"data": propertyData}, status=status.HTTP_200_OK)


@api_view(['POST'])
def updatePhotoUploadHelper(request):
    print("hello")
    print(request)
    photos_serializer = PropertyPhotoUploadHelperSerializer(data=request.data)
    if photos_serializer.is_valid():
        photos_serializer.save()
        # photos_serializer.data["image"] = "http://127.0.0.1" + photos_serializer.data["image"]
        url = "http://127.0.0.1:8000" + photos_serializer.data["image"]
        print("hello")
        property = Property.objects.get(propertyID=int(request.data["property_id"]))
        photo = PropertyPhotos(property_id=property, photo_url=url)
        photo.save()
        photos_serializer = PropertyPhotoSerializer(photo)
        return Response({"uploaded_photo": photos_serializer.data, "success": True}, status=status.HTTP_201_CREATED)
    else:
        #print('error', photos_serializer.errors)
        return Response({"error": photos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addReview(request):
    user = UserSerializer(request.user).data
    print(user)
    print(request.data["review"])
    print(user['id'])
    user = User.objects.get(id=user['id'])
    prop = Property.objects.get(propertyID=int(request.data["property_id"][0]))
    newReview = Reviews.objects.create(
        user_id=user,
        review=request.data["review"],
        propertyID=prop
    )

    reviewsSerializer = ReviewsSerializer(newReview)
    print(reviewsSerializer.data)

    return Response({"hello": "hellow"}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRating(request):
    print(request.user)
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    data = request.data
    print(data)
    
    property = Property.objects.get(propertyID=data['propertyID'])

    rating = Ratings.objects.filter(user_id_id=user, propertyID_id=property).values()

    if len(rating) == 0:
        
        newRating = Ratings.objects.create(
            user_id=user,
            propertyID=property,
            rating=data['rating']
        )
    else:
        newRating = Ratings.objects.filter(user_id_id=user,propertyID_id=property)[0]
        newRating.rating = data['rating']
        newRating.save()

    ratingData = RatingsSerializer(newRating).data['rating'];
    print(ratingData)
    
    return Response(status=status.HTTP_200_OK, data={"newRating": ratingData})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertOffer(request):
    #print(request.data)
    propertyInfo = Property.objects.get(propertyID=request.data["property_id"]);
    
    print(request.data)
    offer = Offer.objects.create(
        startDate=request.data["startDate"],
        endDate=request.data["endDate"],
        amount=float(request.data["amount"]),
        propertyID=propertyInfo
    )

    return Response({"data": "sent"}, status=status.HTTP_200_OK)

def calculateRating():
    properties=Property.objects.filter()
    propertySerializer = PropertySerializer(properties, many=True)
    propertyRating=[]
    for property in propertySerializer.data:
        ratings=Ratings.objects.filter(propertyID=property['propertyID'])
        ratings=RatingsSerializer(ratings,many=True)
        total=0
        count=len(ratings.data)        
        for r in ratings.data:
            total=total+r['rating']
        if count == 0:
            rating = 0
        else:
            rating=total/count
            rating=float(f'{rating:.2f}')
        dict={"propertyID":property['propertyID'],"rating":rating}
        propertyRating.append(dict)
    
    return propertyRating



@api_view(["GET"])
def Recommendations(request):
    
    propertyRating=calculateRating()
    print(propertyRating)
    
    propertyList=[]

     #-----------rating--------------
    rating=Ratings.objects.all()
    ratingSerializer=RatingsSerializer(rating,many=True)
    ratings=sorted(ratingSerializer.data, key=lambda d: d['rating'],reverse=True)
    ratingList=[]
    for r in ratings:
        properties=Property.objects.filter(propertyID=r["propertyID"],approved=True)
        propertySerializer = PropertySerializer(properties, many=True)
        for property in propertySerializer.data:
            photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
            photoSerializer = PropertyPhotoSerializer(photos, many=True)
            property['images'] = photoSerializer.data
            idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
            property['rating']=propertyRating[idx]['rating']
            if property not in ratingList:
                ratingList.append(property)
    dict={"title":"rating","list": ratingList,"description":"Checkout the Best Rated Properties"}
    propertyList.append(dict)

    #------------offer--------------
    offers=Offer.objects.all()
    offerSerializer=OfferSerializer(offers,many=True)
    offers=sorted(offerSerializer.data, key=lambda d:d['amount'],reverse=True)
    offerList=[]
    for offer in offers:
        properties=Property.objects.filter(propertyID=offer["propertyID"],approved=True)
        propertySerializer = PropertySerializer(properties, many=True)
    
        for property in propertySerializer.data:
            if property['published'] == True:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                property['rating']=propertyRating[idx]['rating']
                if property not in offerList:
                    offerList.append(property)
    
    dict={"title": "offer","list": offerList,"description": "Grab the Best Offer",}
    propertyList.append(dict)

    #-----------facility==pool---------------
    vector=(
        TrigramSimilarity('description','pool')
        +TrigramSimilarity('facility_name','pool')
    )
    poolList=[]
    s=PropertyFacilities.objects.annotate( similarity=vector).filter(similarity__gt=0.3).order_by('-similarity')
    p =PropertyFacilitiesSerializer(s, many=True)
    for f in p.data:
        properties=Property.objects.filter(propertyID=f["propertyID"],approved=True)
        propertySerializer = PropertySerializer(properties, many=True)
        for property in propertySerializer.data:
            photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
            photoSerializer = PropertyPhotoSerializer(photos, many=True)
            property['images'] = photoSerializer.data
            idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
            property['rating']=propertyRating[idx]['rating']
            if property not in poolList:
                poolList.append(property)
    dict={"title": "pool","list" :poolList,"description":"Splash in the pool"}
    propertyList.append(dict)

    #-----------location based search-------------------
    locations=Property.objects.filter().values_list('address')
    
    countryList=[]
    areaList=[]

    d=['1','2','3','4','5','6','7','8','9','0']
    for location in locations:        
        l=location[0].split(',')
        country=l[len(l)-1].strip()
        if not country in countryList:
            countryList.append(country)
        if len(l) > 1:
            a=l[len(l)-2].strip()
            if not any (x in d for x in a):
                if not a in areaList:
                    areaList.append(a)
            else:
                if len(l) > 2:
                    a=l[len(l)-3].strip()
                    if not a in areaList:
                        areaList.append(a)
    
    for country in countryList:
        list=[]
        # vector=(TrigramSimilarity('address',country))
        # s=Property.objects.annotate( similarity=vector).filter(similarity__gt=0.1).order_by('-similarity')
        s=Property.objects.filter(address__search=country,approved=True)    
        p =PropertySerializer(s, many=True)
        for x in p.data:
            properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
            propertySerializer = PropertySerializer(properties, many=True)
        
            for property in propertySerializer.data:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                property['rating']=propertyRating[idx]['rating']
                if not property in list:
                    list.append(property)
        title='Explore '+country
        dict={'title':'location',"list":list,'description': title}
        propertyList.append(dict)
    
    for country in areaList:
        list=[]
        # vector=(TrigramSimilarity('address',country))
        # s=Property.objects.annotate( similarity=vector).filter(similarity__gt=0.4).order_by('-similarity')   
        s=Property.objects.filter(address__search=country,approved=True) 
        p =PropertySerializer(s, many=True)
        for x in p.data:
            properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
            propertySerializer = PropertySerializer(properties, many=True)
        
            for property in propertySerializer.data:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                property['rating']=propertyRating[idx]['rating']
                if not property in list:
                    list.append(property)
        title='Explore '+country
        dict={'title':'location',"list":list,'description': title}
        propertyList.append(dict)
        

    return Response({"receommendations": propertyList},status=status.HTTP_200_OK)

def getCatagoryBasedFacilityForSearch(keyword):
    catagory= Facility.objects.filter(subcatagory=keyword).values_list("facility_name")
    
    facilities=''
    
    for tuple in catagory:
        for f in tuple:
            s=f.split(' ')
            if not facilities == '':
                facilities=facilities+' '+s[0]
            else:
                facilities=s[0]
    
    dict={"catagory":keyword,"facilities": facilities}
    return dict

@api_view(["GET"])
def getCatagoryForSearch(request):
    catagoryBasedFacility=[]
    dict=getCatagoryBasedFacilityForSearch("Outdoor")
    catagoryBasedFacility.append(dict)
    dict=getCatagoryBasedFacilityForSearch("Home safety")
    catagoryBasedFacility.append(dict)
    dict=getCatagoryBasedFacilityForSearch("Bathroom")
    catagoryBasedFacility.append(dict)
    dict=getCatagoryBasedFacilityForSearch("Bedroom & Laundry")
    catagoryBasedFacility.append(dict)
    dict=getCatagoryBasedFacilityForSearch("Kitchen and dining")
    catagoryBasedFacility.append(dict)
    
    #print(catagoryBasedFacility)


    return Response({"catagoryBasedFacility":catagoryBasedFacility},status=status.HTTP_200_OK)

@api_view(["GET"])
def getSearchResult(request,searchword):
    propertyRating=calculateRating()
    print(propertyRating)
  
    vector=(
        TrigramSimilarity('description',searchword)
        +TrigramSimilarity('facility_name',searchword)
    )
    s=PropertyFacilities.objects.annotate( similarity=vector).filter(similarity__gt=0.1).order_by('-similarity')
    
    p =PropertyFacilitiesSerializer(s, many=True)
    allRelatedProperties=[]
    for x in p.data:
        properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
        propertySerializer = PropertySerializer(properties, many=True)
    
        for property in propertySerializer.data:
            photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
            photoSerializer = PropertyPhotoSerializer(photos, many=True)
            property['images'] = photoSerializer.data
            print('------------------',property,'---------------------')
            idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
            
            property['rating']=propertyRating[idx]['rating']
            if property not in allRelatedProperties:
                allRelatedProperties.append(property)
                #print(property['title'])
        
           
    
    return Response({"properties":allRelatedProperties},status=status.HTTP_200_OK)
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOfferList(request):
    try:

        user = UserSerializer(request.user).data
        user = User.objects.get(id=user['id'])
        property = Property.objects.filter(owner_id_id=user,approved=True)
        propertySerializer = PropertySerializer(property, many=True)

        offers=[]
        for property in propertySerializer.data:
            offer = Offer.objects.filter(propertyID_id=property["propertyID"])
            offerSerializer = OfferSerializer(offer, many=True)
            for offer in offerSerializer.data:
                sd=offer["startDate"]
                ed=offer["endDate"]
                offer["startDate"]=sd[0:10]
                offer["endDate"]=ed[0:10]
                offer["title"]=property["title"]
                offers.append(offer)

        return Response({"offers": offers}, status=status.HTTP_200_OK)

    except Offer.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getPropertyCatagory(request):
    catagory=Catagory.objects.all()
    catagorySerializer=CatagorySerializer(catagory,many=True)
    catagories=[]
    for c in catagorySerializer.data:
        catagories.append(c["description"])
    
    return Response({"catagories":catagories},status=status.HTTP_200_OK)

@api_view(["POST"])
def getUserStaticSearch(request):
    facility=request.data['facility']
    minprice=float(request.data['minprice'])
    maxprice=float(request.data['maxprice'])+1
    placetypes=request.data['placeType']
    propertytypes=request.data['propertyType']
    

    propertyRating=Ratings.objects.all()
    propertyRating=RatingsSerializer(propertyRating,many=True)
    propertyRating=propertyRating.data
    
    propertyList=[]
    propertyIDList=[]
    for f in facility:
        vector=(
        TrigramSimilarity('description',f)
        +TrigramSimilarity('facility_name',f)
        )
        s=PropertyFacilities.objects.annotate( similarity=vector).filter(similarity__gt=0.3).order_by('-similarity')
        p =PropertyFacilitiesSerializer(s, many=True)
        for x in p.data:
            id=x['propertyID']
            properties=Property.objects.filter(propertyID=id)
            propertySerializer = PropertySerializer(properties,many=True)
            for property in propertySerializer.data:
                if id in propertyIDList:
                    idx=next((index for (index,d) in enumerate(propertyList) if d['propertyID'] == id),None)
                    propertyList[idx]['count']=propertyList[idx]['count']+1
                else:                
                    photos = PropertyPhotos.objects.filter(property_id=id)
                    photoSerializer = PropertyPhotoSerializer(photos, many=True)                
                    property['images'] = photoSerializer.data
                    idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                    if not idx == None :
                        property['rating']=propertyRating[idx]['rating']
                    else:
                        property['rating']=0
                    property['count']=1
                    propertyIDList.append(id)
                    propertyList.append(property)           
      

    for placeType in placetypes:
        place=Property.objects.filter(entirePrivateOrShared=placeType)
        placeSerializer=PropertySerializer(place,many=True)
        for property in placeSerializer.data:
            id=property['propertyID']
            if id in propertyIDList:
                idx=next((index for (index,d) in enumerate(propertyList) if d['propertyID'] == id),None)
                propertyList[idx]['count']=propertyList[idx]['count']+1
            else:                
                photos = PropertyPhotos.objects.filter(property_id=id)
                photoSerializer = PropertyPhotoSerializer(photos, many=True)                
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                if not idx == None :
                    property['rating']=propertyRating[idx]['rating']
                else:
                    property['rating']=0
                property['count']=1
                propertyIDList.append(id)
                propertyList.append(property)   
    
    for propertyType in propertytypes:
        place=Property.objects.filter(catagory=propertyType)
        placeSerializer=PropertySerializer(place,many=True)
        for property in placeSerializer.data:
            id=property['propertyID']
            if id in propertyIDList:
                idx=next((index for (index,d) in enumerate(propertyList) if d['propertyID'] == id),None)
                propertyList[idx]['count']=propertyList[idx]['count']+1
            else:                
                photos = PropertyPhotos.objects.filter(property_id=id)
                photoSerializer = PropertyPhotoSerializer(photos, many=True)                
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                if not idx == None :
                    property['rating']=propertyRating[idx]['rating']
                else:
                    property['rating']=0
                property['count']=1
                propertyIDList.append(id)
                propertyList.append(property)   

    properties=Property.objects.filter(perNightCost__contained_by=NumericRange(minprice,maxprice))
    propertySerailizer=PropertySerializer(properties,many=True)
    # print(propertySerailizer.data)
    for property in propertySerailizer.data:
        id=property['propertyID']
        if id in propertyIDList:
            idx=next((index for (index,d) in enumerate(propertyList) if d['propertyID'] == id),None)
            propertyList[idx]['count']=propertyList[idx]['count']+1
        else:                
            photos = PropertyPhotos.objects.filter(property_id=id)
            photoSerializer = PropertyPhotoSerializer(photos, many=True)                
            property['images'] = photoSerializer.data
            idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == id), None)
           
            if not idx == None :
                property['rating']=propertyRating[idx]['rating']
            else:
                property['rating']=0
            property['count']=1
            propertyIDList.append(id)
            propertyList.append(property) 
    propertyList=sorted(propertyList, key=lambda d: d['count'],reverse=True)       
    

    for f in propertyList:
        print(f['title'],' ',f['count'])  
    
    return Response({"properties":propertyList},status=status.HTTP_200_OK)


@api_view(["POST"])
def getGuestList(request):
    guestList=[]
    data=request.data['body']
    guest=data["guest"]
    property_id=data["property"]

    for g in guest:
        if g == 'All guests':
            print('all')
        elif g == 'Recently visited':
            print('recent')
        elif g == 'Most frequently visted':
            print('most')
        else:
            rating=Ratings.objects.filter(propertyID=property_id)
            rating=RatingsSerializer(rating,many=True)
            rating=sorted(rating.data, key=lambda d: d['rating'],reverse=True)
            list=[]
            tempList=[]
            if len(rating) >10:
                for r in rating[0:10]:
                    user=User.objects.get(id=r['user_id'])
                    user=UserSerializer(user,many=True)
                    user=user.data[0]
                    user['rating']=r['rating']
                    if user['id'] not in tempList:
                        list.append(user)
                        tempList.append(user['id'])                    
                        
            else:
                for r in rating:
                    user=User.objects.filter(id=r['user_id'])
                    user=UserSerializer(user,many=True)
                    user=user.data[0]
                    user['rating']=r['rating']
                    if user['id'] not in tempList:
                        list.append(user)
                        tempList.append(user['id']) 
           
            dict={"guest":g,"list":list}
            guestList.append(dict)
    print(guestList)
            
    
    return Response({"list":guestList},status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertGiftcard(request):
    print(request.data)
    propertyInfo = Property.objects.get(propertyID=request.data["property_id"]);
    
   
    
    for d in request.data['discountList']:

        giftcard = GiftCard.objects.create(
            type=request.data['offerType'],
            discount=float(d['discount']),
            expiry_date=request.data['expiryDate'],
            propertyID = propertyInfo,
            customMsg= request.data['msg']
        )        
        
        for userid in d['list']:
            
            user=User.objects.filter(id=userid)
    
            UserGiftCardList.objects.create(
                user_id= user[0],
                used_flag= False,
                giftcard_id= giftcard
            )


    return Response({"data": "sent"}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getGiftcardList(request):
    try:

        user = UserSerializer(request.user).data
        user = User.objects.get(id=user['id'])
        property = Property.objects.filter(owner_id_id=user,approved=True)
        propertySerializer = PropertySerializer(property, many=True)

        cards=[]
        for property in propertySerializer.data:
            giftcards =GiftCard.objects.filter(propertyID_id=property["propertyID"])
            gSerializer = GiftCardSerializer(giftcards, many=True)
            for offer in gSerializer.data:
                sd=offer["expiry_date"]
                offer["expiry_date"]=sd[0:10]
                offer["title"]=property["title"]
                users=UserGiftCardList.objects.filter(giftcard_id=offer['giftcard_id'])
                users=UserGiftCardListSerializer(users,many=True)
                guestList=users.data
                offer['guestList']=guestList   
                      
                cards.append(offer)

        return Response({"giftcards": cards}, status=status.HTTP_200_OK)

    except GiftCard.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteGiftcard(request, giftcard_id):
    giftcard = GiftCard.objects.get(giftcard_id=giftcard_id)
    giftcard.delete()
    return Response({"msg": "successfully deleted giftcard"}, status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteOffer(request, offer_id):
    offer = Offer.objects.get(offer_id=offer_id)
    offer.delete()
    return Response({"msg": "successfully deleted giftcard"}, status=status.HTTP_200_OK)


@api_view(["GET"])
def getCountryList(request):
    locations=Property.objects.filter(approved=True).values_list('address')    
    countryList=[]    
    for location in locations:        
        l=location[0].split(',')
        country=l[len(l)-1].strip()
        if not country in countryList:
            countryList.append(country)
        
    return Response({'countryList': countryList},status=status.HTTP_200_OK)

@api_view(["GET"])
def getlocationsInCountry(request,country):
    areaList=[]
    locations=Property.objects.filter(address__search=country,approved=True).values_list('address') 
    d=['1','2','3','4','5','6','7','8','9','0']
    for location in locations:        
        l=location[0].split(',')
        if len(l) > 1:
            a=l[len(l)-2].strip()
            if not any (x in d for x in a):
                if not a in areaList:
                    areaList.append(a)
            else:
                if len(l) > 2:
                    a=l[len(l)-3].strip()
                    if not a in areaList:
                        areaList.append(a)
    
    return Response({'areaList': areaList},status=status.HTTP_200_OK)

@api_view(["POST"])
def getHomepagesearchResult(request):
    location=request.data['location']
    checkInDate=request.data['startDate']
    checkOutDate=request.data['EndDate']
    guest=request.data['guest']
    propertyList=[]
    propertyRating=calculateRating()
    
    if  location != '' and guest > 0 :   
        print('both:',location,' ',guest)     
        s=Property.objects.filter(Q(address__search=location) & Q(noOfGuests__gte=guest) & Q(approved=True) )   
        p =PropertySerializer(s, many=True)
        for x in p.data:
            properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
            propertySerializer = PropertySerializer(properties, many=True)
            for property in propertySerializer.data:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                if not property in propertyList:
                    propertyList.append(property)
    elif location == '' and guest >0:
        print('guest:',guest)
        s=Property.objects.filter(noOfGuests>=guest,approved=True)
        p =PropertySerializer(s, many=True)
        for x in p.data:
            properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
            propertySerializer = PropertySerializer(properties, many=True)
            for property in propertySerializer.data:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                if not property in propertyList:
                    propertyList.append(property)
    elif location != '' and guest==0:
        print('location: ',location )
        s=Property.objects.filter(address__search=location ,approved=True)
        p =PropertySerializer(s, many=True)
        for x in p.data:
            properties=Property.objects.filter(propertyID=x["propertyID"],approved=True)
            propertySerializer = PropertySerializer(properties, many=True)

            for property in propertySerializer.data:
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                idx= next((index for (index, d) in enumerate(propertyRating) if d['propertyID'] == property['propertyID']), None)
                property['rating']=propertyRating[idx]['rating']
                if not property in propertyList:
                    propertyList.append(property)

    # if checkInDate != None and endDate != None:
    #     s=Booking.objects.filter(Q(checkin_date__lte!=checkInDate) & Q(checkout_date__gte!=checkInDate) | 
    #                                                                             Q(checkin_date__gte=checkInDate) & Q(checkout_date__lte=checkOutDate)|
    #                                                                             Q(checkin_date__lte=checkOutDate) & Q(checkout_date__gte=checkOutDate)|
    #                                                                             Q(checkin_date__lte=checkInDate) & Q(checkout_date__gte=checkOutDate)).values()
    #     if len(s) == 0:



    return Response({"propertyList":propertyList},status=status.HTTP_200_OK)

    

        
    


