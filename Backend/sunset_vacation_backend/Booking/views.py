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

    ratings = Ratings.objects.filter(propertyID=property).values()
    reviews = Reviews.objects.filter(propertyID=property).values()

    for review in reviews:
        user = User.objects.get(id=review["user_id_id"])
        uSerializer = UserSerializer(user).data
        review["username"] = uSerializer["name"]

    photos = PropertyPhotos.objects.filter(property_id_id = property_id).values()

    return Response({"facilities":facilities, "faqs":faqs, "dos":dos, "donts":donts,"property":propertyInfo, 
                    "ratings":ratings,"reviews":reviews,"photos":photos },status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reserve(request):
    print(request.user)
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    data = request.data
    print(data['amount'], data['discount'], data['checkInDate'], data['checkOutDate'], data['noOfGuests'], data['propertyID'])
    email = data['email']
    payment_method_id = data['payment_method_id']
    extra_msg = '' # add new variable to response message  # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data   
    
    # if the array is empty it means the email has not been used yet  
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
        email=email, payment_method=payment_method_id)  
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed." 
    
    intent = stripe.PaymentIntent.create(
        customer=customer, 
        payment_method=payment_method_id,  
        currency='USD', # you can provide any currency you want
        amount=data['amount']*100,
        confirm=True
    )     # it equals 9.99 PLN

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