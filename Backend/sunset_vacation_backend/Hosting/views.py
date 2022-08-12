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


@api_view(["POST"])
def addCategory(request):
    try:
        # change delete this portion
        category = FacilityCategory.objects.create(
            category=request.data["category"]
        )
        categories = FacilityCategory.objects.all()
        categorySerializer = FacilityCategorySerializer(categories, many=True)
        # change add code for fetching booking here by user
        return Response({"categories": categorySerializer.data}, status=status.HTTP_200_OK)
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
        property = Property.objects.filter(published=True)
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
        user = User.objects.get(id=property.owner_id_id)
        notification = Notification.objects.create(
            user_id=user,
            title="Property title- " + property.title + " needs some change ",
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
        property = Property.objects.filter(owner_id_id=user)
        propertySerializer = PropertySerializer(property, many=True)
        # change add code for fetching booking here by user
        return Response({"notifications": propertySerializer.data}, status=status.HTTP_200_OK)
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
        property = Property.objects.filter(owner_id_id=user, propertyID=notification_id)
        propertySerializer = PropertySerializer(property)
        # change add code for fetching specific booking by id here
        return Response({"notification": propertySerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


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
@permission_classes([IsAuthenticated])
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
        # user=User.objects.get(id=1)
        user = User.objects.get(id=user['id'])
        property = Property.objects.filter(owner_id_id=user)

        # return Response({"hello" : "hello"},status= status.HTTP_200_OK)
        propertySerializer = PropertySerializer(property, many=True)
        # print(propertySerializer.data)
        return Response({"properties": propertySerializer.data}, status=status.HTTP_200_OK)
        # if propertySerializer.is_valid():
        #     return Response({"properties": propertySerializer.data}, status= status.HTTP_200_OK)
        # else:
        #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
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

    if "What's new" not in guestFavList:
        guestFavList.append(["What's new"], )

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
@permission_classes([IsAuthenticated])
def getFacilityList(request):
    amenities = Facility.objects.filter(catagory="amenity").values_list("facility_name")
    guestsFavourite = Facility.objects.filter(catagory="guestFav").values_list("facility_name")
    safetyItems = Facility.objects.filter(catagory="safety").values_list("facility_name")
    print(amenities)
    print(guestsFavourite)
    print(safetyItems)
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

    if (len(amenityList) > 1):
        for amenity in amenityList:
            facility = Facility.objects.get(facility_name=amenity)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description='amenity'
            )

    guestFavs = request.data['guestFavs'].strip().split(",")
    if (len(guestFavs) > 1):
        print("print:", len(guestFavs))
        for fav in guestFavs:
            facility = Facility.objects.get(facility_name=amenity)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description='Guests favourite'
            )

    safetyItems = request.data['safetyItems'].strip().split(",")
    if (len(safetyItems) > 1):
        for item in safetyItems:
            facility = Facility.objects.get(facility_name=item)
            PropertyFacilities.objects.create(
                propertyID=newProperty,
                facility_name=facility,
                description='Safety item'
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
    properites = Property.objects.filter(published=True)
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
        print('error', photos_serializer.errors)
        return Response({"error": photos_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def getSafetyItemList(request):
#     safetyItems = Facility.objects.filter(category="safetyitem").values_list("facility_name")
#     print(safetyItems)
#     return Response({ "safetyItems": safetyItems, "success": True}, status=status.HTTP_200_OK)


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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertOffer(request):
    print(request.data)
    propertyInfo = Property.objects.get(propertyID=request.data["property_id"]);

    offer = Offer.objects.create(
        startDate=request.data["startDate"],
        endDate=request.data["endDate"],
        amount=float(request.data["amount"]),
        propertyID=propertyInfo
    )

    return Response({"data": "sent"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOfferList(request, property_id):
    try:

        property = Property.objects.get(propertyID=property_id)

        offer = Offer.objects.filter(propertyID_id=property)

        offerSerializer = OfferSerializer(offer, many=True)

        return Response({"offers": offerSerializer.data}, status=status.HTTP_200_OK)

    except Offer.DoesNotExist:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)
