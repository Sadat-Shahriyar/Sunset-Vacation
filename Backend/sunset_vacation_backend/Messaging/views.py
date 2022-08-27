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


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def markMessage(request,messageId):
    try:
        user = UserSerializer(request.user).data
        print(user["id"])
        message = Messaging.objects.get(msg_id=messageId)
        messageSerializer = MessagingSerializer(message)
        if messageSerializer["sender_id"] != user["id"]:
            message.marked = True
            message.save()
        return Response({"message": "okay"}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMessagesById(request,userId):
    try:
        print(request.user)
        user1 = UserSerializer(request.user).data
        user2 = User.objects.get(id=userId)
        user2 = UserSerializer(user2).data
        print(user1["name"])
        print(user2["name"])
        messages = Messaging.objects.filter(Q(sender_id_id=userId)|Q(receiver_id_id=userId)).filter(Q(sender_id_id=user1['id'])|Q(receiver_id_id=user1['id'])).order_by("time")
        messagesSerializer = MessagingSerializer(messages, many=True)
        return Response({"messages": messagesSerializer.data, "userName": user1["name"], "friendName": user2["name"]}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMessages(request):
    try:
        print('inside get message ----------------------------')
        # print(request.user)
        user = UserSerializer(request.user).data
        userName = user["name"]
        # messages = Messaging.objects.filter(Q(sender_id_id=user['id'])|Q(receiver_id_id=user['id']))
        uniqueSender = Messaging.objects.filter(~Q(sender_id_id=user['id'])).filter(Q(receiver_id_id=user['id'])).values("sender_id_id").distinct()
        # print(uniqueSender)
        uniqueReceiver = Messaging.objects.filter(~Q(receiver_id_id=user['id'])).filter(Q(sender_id_id=user['id'])).values("receiver_id_id").distinct()
        # print(uniqueReceiver)
        # messagesSerializer = MessagingSerializer(messages, many=True)
        uniqueUser = []
        for i in uniqueSender:
            uniqueUser.append(i['sender_id_id'])
        for i in uniqueReceiver:
            uniqueUser.append(i['receiver_id_id'])
        uniqueUser = list(set(uniqueUser))
        uniqueUserName = []
        print(uniqueUser)
        for userId in uniqueUser:
            filteredUser = User.objects.get(id=userId)
            filteredUserSerializer = UserSerializer(filteredUser).data
            uniqueUserName.append(filteredUserSerializer['name'])
        lastMessageArray = []
        # print('before final for loop ----------------------------')
        # print('len unique user ----------------------------'+str(len(uniqueUser)))
        for i in range(len(uniqueUser)):
            lastMessage = Messaging.objects.filter((Q(sender_id_id=uniqueUser[i]) & Q(receiver_id_id=user["id"])) | (Q(receiver_id_id=uniqueUser[i]) & Q(sender_id_id=user["id"]))).order_by("-time")
            lastMessageSerializer = MessagingSerializer(lastMessage[0]).data
            # print(lastMessageSerializer)
            # print(lastMessageSerializer["sender_id"])
            # print(lastMessageSerializer["receiver_id"])
            if lastMessageSerializer["sender_id"] == uniqueUser[i]:
                lastMessageSerializer['name'] = uniqueUserName[i]
                lastMessageSerializer['sender_name'] = ""
            else:
                lastMessageSerializer["name"] = uniqueUserName[i]
                lastMessageSerializer['sender_name'] = "You: "
                lastMessageSerializer['marked'] = True
            lastMessageSerializer["orgMessage"] = lastMessageSerializer["message"]
            if len(lastMessageSerializer["message"]) > 60:
                lastMessageSerializer["message"] = lastMessageSerializer["message"][:60]+"..."
            # print('before  print ----------------------------')
            print(lastMessageSerializer)
            # print('after  print ----------------------------')
            lastMessageArray.append(lastMessageSerializer)
        #     print('after  append i ----------------------------'+str(i))
        # print('after final for loop ----------------------------')
        messages = sorted(lastMessageArray, key=lambda d: d['time'], reverse=True)
        return Response({"messages": messages, "userName":userName}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def senMessage(request):

    data = request.data
    sender = UserSerializer(request.user).data
    sender = User.objects.get(id=sender['id'])
    print("hi")
    receiver = User.objects.get(id=data['receiver_id'])
    print(sender)
    print(receiver)
    print(data)
    message = Messaging.objects.create(
        sender_id=sender,
        receiver_id=receiver,
        message=data['message'],
        marked=False,
    )
    print(message)
    return Response({'success':True},status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getMessages(request):
#     user = UserSerializer(request.user).data
#     user = User.objects.get(id=user['id'])
#
#     # message_objects = Messaging.objects.filter(Q(sender_id=user) | Q(receiver_id=user))
#     message_objects = Messaging.objects.filter(receiver_id=user)
#     messageSerializer = MessagingSerializer(message_objects, many=True)
#     messages=sorted(messageSerializer.data, key=lambda d:d['time'],reverse=True)
#
#     allmessages = []
#
#     for message in messages:
#         m = Messaging.objects.filter(msg_id=message['msg_id'])[0]
#         ms = MessagingSerializer(m).data
#         sender = User.objects.get(id=ms['sender_id'])
#         sender_serializer = UserSerializer(sender).data
#
#         allmessages.append({"sender_id": ms['sender_id'],"message": ms['message'], "sender_name": sender_serializer['name'], "message_id": ms['msg_id'] })
#     # sender_values = message_objects.values('sender_id').distinct()
#     # receiver_values = message_objects.values('receiver_id').distinct()
#
#     # print(allmessages)
#     # print(sender_values)
#     # print(receiver_values)
#
#     return Response({"messages": allmessages}, status=status.HTTP_200_OK)





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
        
