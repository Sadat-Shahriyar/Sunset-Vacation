from django.shortcuts import render
from .models import Booking, Payment
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
# Create your views here.

stripe.api_key = "sk_test_51LVZhXCVpdZK1diloh5K4b3nAIcYc1QLkR0TFOabMF52sO1TNOoKSjOWJcVMepQDJZKLH47uPD4qSAcGyYPRfyi4004jbVNz66"

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

    ads = []

    if propertyInfo["entirePrivateOrShared"] == "An entire place":
        ads.append({"Title": "Get the whole place to yourself", "Description": ""})
    if propertyInfo["entirePrivateOrShared"] == "A private room":
        ads.append({"Title": "Get a private room to yourself", "Description": ""})
    if propertyInfo["entirePrivateOrShared"] == "An shared place":
        ads.append({"Title": "Get a shared room to yourself", "Description": ""})


    for fac in facilities:
        if fac["facility_name_id"] == "Pool":
            ads.append({"Title": "Dive right in", "Description": "This is one of the few places in the area with a pool."})
        elif fac["facility_name_id"] == "Kitchen":
            ads.append({"Title": "Cook your own meal", "Description": "Weekend with family members in a homely environment"})
        elif fac["facility_name_id"] == "Sea view":
            ads.append({"Title": "Enjoy the see", "Description": "Has see view to make your stay more deliightfull"})
        elif fac["facility_name_id"] == "Free parking on premises":
            ads.append({"Title": "Free parking", "Description": "Can park your car right on the premises"})
        elif fac["facility_name_id"] == "Free street parking":
            ads.append({"Title": "Free parking", "Description": "Can park your car right in front"})

    owner_id = propertyInfo["owner_id"]
    owner = User.objects.get(id=owner_id)
    properties_under_same_owner = Property.objects.filter(owner_id_id = owner)

    rating_count = 0
    rating_sum = 0
    review_count = 0
    for prop in properties_under_same_owner:
        temp_rat = Ratings.objects.filter(propertyID_id = prop).values()
        for rat in temp_rat:
            rating_sum = rating_sum + rat['rating']
        rating_count = rating_count + len(temp_rat)
        temp_rev = Reviews.objects.filter(propertyID_id = prop).values()
        review_count = review_count + len(temp_rev)
    
    name = ownername[0]["name"]
    if review_count > 0:
        ads.append({"Title": "Experienced host", "Description": f"{name} has a total of {review_count} reviews"})

    # print(rating_sum, rating_count)


    if rating_count > 0:
        ads.append({"Title": "Everyone's choice", "Description": f"{name} has an average rating of {rating_sum/rating_count}"})

    max_days_refund = propertyInfo["maxDaysRefund"]
    if max_days_refund > 0:
        ads.append({"Title": f"Free cancellation before {max_days_refund} days of arrival"})
    
    ratings = Ratings.objects.filter(propertyID=property).values()
    reviews = Reviews.objects.filter(propertyID=property).values()

    for review in reviews:
        user = User.objects.get(id=review["user_id_id"])
        uSerializer = UserSerializer(user).data
        review["username"] = uSerializer["name"]

    photos = PropertyPhotos.objects.filter(property_id_id = property_id).values()

    offers = Offer.objects.filter(propertyID_id=property).values()


    return Response({"facilities":facilities, "faqs":faqs, "dos":dos, "donts":donts,"property":propertyInfo, 
                    "ratings":ratings,"reviews":reviews,"photos":photos, "offers": offers, "ads": ads },status=status.HTTP_200_OK)



@api_view(['POST'])
def checkAvailabilityOfDate(request):
    data = request.data
    property_id = data['property_id']
    checkInDate = data['checkInDate']
    checkOutDate = data['checkOutDate']
    noOfGuest = data['noOfGuest']

    propertyToBeBooked = Property.objects.get(propertyID=property_id)

    # bookedDatesBasedOnCheckIn = Booking.objects.filter(property_id=propertyToBeBooked, 
    #                                                    checkin_date__range=[checkInDate, checkOutDate]).values()

    # bookedDatesBasedOnCheckOut = Booking.objects.filter(property_id=propertyToBeBooked, 
    #                                                     checkout_date__range=[checkInDate, checkOutDate]).values()
    
    # bookedDates = Booking.objects.filter(property_id=propertyToBeBooked).filter(Q(checkout_date__range=[checkInDate, checkOutDate]) | Q(checkin_date__range=[checkInDate, checkOutDate])).values()
    bookedDates = Booking.objects.filter(property_id=propertyToBeBooked).filter(Q(checkin_date__lte=checkInDate) & Q(checkout_date__gte=checkInDate) | 
                                                                                Q(checkin_date__gte=checkInDate) & Q(checkout_date__lte=checkOutDate)|
                                                                                Q(checkin_date__lte=checkOutDate) & Q(checkout_date__gte=checkOutDate)|
                                                                                Q(checkin_date__lte=checkInDate) & Q(checkout_date__gte=checkOutDate)).values()


    # print(property_id, checkInDate,checkOutDate,noOfGuest)
    # print("1")
    # print(bookedDatesBasedOnCheckIn)
    # print(2)
    # print(bookedDatesBasedOnCheckOut)
    # print(3)
    print(len(bookedDates))

    propertyData = PropertySerializer(propertyToBeBooked).data
    # print(propertyData)

    date1 = datetime.strptime("2022-08-08", '%Y-%m-%d')
    date2 = datetime.strptime("2022-08-09", '%Y-%m-%d')

    print(date1)
    print(date1 < date2)

    if propertyData['entirePrivateOrShared'] == 'An entire place':
        if len(bookedDates) > 0:
            return Response({'available': False}, status=status.HTTP_200_OK)
        
        return Response({'available': True}, status=status.HTTP_200_OK)
    
    elif propertyData['entirePrivateOrShared'] == "A private room":
        checkInDateTimeObject = datetime.strptime(checkInDate, '%Y-%m-%d')
        checkOutDateTimeObject = datetime.strptime(checkOutDate, '%Y-%m-%d')

        while checkInDateTimeObject <= checkOutDateTimeObject:
            guestCount = 0
            for booking in bookedDates:
                if datetime.strptime(booking['checkin_date'].strftime('%Y-%m-%d'),'%Y-%m-%d').timestamp() <= checkInDateTimeObject.timestamp() and checkInDateTimeObject.timestamp() <= datetime.strptime(booking['checkout_date'].strftime('%Y-%m-%d'),'%Y-%m-%d').timestamp():
                    # print(booking['booking_id'])
                    guestCount += booking['noOfGuests']
            
            print(guestCount)
            if guestCount+noOfGuest > propertyData['noOfBedrooms']:
                return Response({'available': False}, status=status.HTTP_200_OK)

            checkInDateTimeObject += timedelta(days=1)

        
        return Response({'available': True}, status=status.HTTP_200_OK)

    elif propertyData['entirePrivateOrShared'] == "A shared room":
        checkInDateTimeObject = datetime.strptime(checkInDate, '%Y-%m-%d')
        checkOutDateTimeObject = datetime.strptime(checkOutDate, '%Y-%m-%d')

        while checkInDateTimeObject <= checkOutDateTimeObject:
            guestCount = 0
            for booking in bookedDates:
                if datetime.strptime(booking['checkin_date'].strftime('%Y-%m-%d'),'%Y-%m-%d').timestamp() <= checkInDateTimeObject.timestamp() and checkInDateTimeObject.timestamp() <= datetime.strptime(booking['checkout_date'].strftime('%Y-%m-%d'),'%Y-%m-%d').timestamp():
                    guestCount += booking['noOfGuests']
            
            print(guestCount)
            if guestCount+noOfGuest > propertyData['noOfBeds']:
                return Response({'available': False}, status=status.HTTP_200_OK)
                
            checkInDateTimeObject += timedelta(days=1)

        
        return Response({'available': True}, status=status.HTTP_200_OK)


    return Response({'available': False}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve(request):
    print(request.user)
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    data = request.data
    print(data['email'],data['payment_method_id'],data['amount'], data['discount'], data['checkInDate'], data['checkOutDate'], data['noOfGuests'], data['propertyID'],data['payment_method_id'],data['name_on_card'])
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = '' # add new variable to response message  # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data   
    
    # if the array is empty it means the email has not been used yet  
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
        email=email, payment_method=payment_method_id, name=data['name_on_card'])  
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed." 
    
    intent = stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='USD', # you can provide any currency you want
        amount=data['amount']*100,
        confirm=True
    )    

    # print(intent)
    # print(intent.charges.data[0].receipt_url)

    propertyToBeBooked = Property.objects.get(propertyID= data['propertyID'])

    newPayment = Payment.objects.create(
        amount=data['amount'],
        method='card',
        receipt_url=intent.charges.data[0].receipt_url
    )

    checkInDate =  datetime.strptime(data['checkInDate'],'%Y-%m-%dT%H:%M:%SZ')
    checkOutDate = datetime.strptime(data['checkOutDate'],'%Y-%m-%dT%H:%M:%SZ')

    newBooking = Booking.objects.create(
        user_id=user,
        property_id=propertyToBeBooked,
        payment_id=newPayment,
        checkin_date=checkInDate,
        checkout_date=checkOutDate,
        noOfGuests=data['noOfGuests']
    )

    return Response(status=status.HTTP_200_OK, 
        data={'success':True,'receipt':intent.charges.data[0].receipt_url, 'data': {
        'customer_id': customer.id, 'extra_msg': extra_msg}
    })