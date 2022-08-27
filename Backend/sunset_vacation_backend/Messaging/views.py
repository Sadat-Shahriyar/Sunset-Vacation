from email import message
from os import stat
from sqlite3 import DateFromTicks
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from Hosting.models import *
from Hosting.serializer import *
from Authentication.models import *
from Authentication.serializers import *
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from datetime import timedelta

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def senMessage(request):

    data = request.data
    sender = UserSerializer(request.user).data
    sender = User.objects.get(id=sender['id'])

    receiver = User.objects.get(id=data['receiver_id'])

    message = Messaging.objects.create(
        sender_id=sender,
        receiver_id=receiver,
        message=data['message']
    )

    print(MessagingSerializer(message).data)

    return Response({"success":True}, status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMessages(request):
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    # message_objects = Messaging.objects.filter(Q(sender_id=user) | Q(receiver_id=user))
    message_objects = Messaging.objects.filter(receiver_id=user)
    messageSerializer = MessagingSerializer(message_objects, many=True)
    messages=sorted(messageSerializer.data, key=lambda d:d['time'],reverse=True)

    allmessages = []

    for message in messages:
        m = Messaging.objects.filter(msg_id=message['msg_id'])[0]
        ms = MessagingSerializer(m).data
        sender = User.objects.get(id=ms['sender_id'])
        sender_serializer = UserSerializer(sender).data

        allmessages.append({"sender_id": ms['sender_id'],"message": ms['message'], "sender_name": sender_serializer['name'], "message_id": ms['msg_id'] })
    # sender_values = message_objects.values('sender_id').distinct()
    # receiver_values = message_objects.values('receiver_id').distinct()

    # print(allmessages)
    # print(sender_values)
    # print(receiver_values)

    return Response({"messages": allmessages}, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getNotification(request):
    user = UserSerializer(request.user).data
    #user=User.objects.get(id=user['id'])
    
   
    new=[]
    read=[]
    notification=Notification.objects.filter(user_id=user['id'])
    notification=NotificationSerializer(notification,many=True)    
    for n in notification.data:
        if n['marked'] == True :
            read.append(n)
        else:
            new.append(n)
    # print(new)
    # print(read)
    dict={'new':new,'read':read}
    l=len(new)
    return Response({'notifications':dict,'len':l},status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserInfo(request):
    user = UserSerializer(request.user).data

    # user=User.objects.filter(id=user[id])
    userdetails=user
    # print(userdetails)
    return Response({'user':userdetails},status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getGiftcards(request):
    user = UserSerializer(request.user).data 
    giftcardList= UserGiftCardList.objects.filter(user_id=user['id'])
    giftcardList=UserGiftCardListSerializer(giftcardList,many=True)
    giftcardLists=[]
    for giftcard in giftcardList.data:
        g=GiftCard.objects.get(giftcard_id=giftcard['giftcard_id'])
        g=GiftCardSerializer(g).data       
        
        property=Property.objects.get(propertyID=g['propertyID'])
        property = PropertySerializer(property).data
        photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        property['images'] = photoSerializer.data

        property['discount']=g['discount']
        property['type']=g['type']
        property['expiryDate']=g['expiry_date'][0:10]
        property['customMsg']=g['customMsg']
        property['id']=g['giftcard_id']
        giftcardLists.append(property)
    return Response({'giftcards':giftcardLists},status=status.HTTP_200_OK)
        
