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
# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def markMessage(request,messageId):
    # try:
        # print(request.user)
        # user = UserSerializer(request.user).data
        # messages = Messaging.objects.filter(Q(sender_id_id=userId)|Q(receiver_id_id=userId)).filter(Q(sender_id_id=user['id'])|Q(receiver_id_id=user['id'])).order_by("-time")
        # messagesSerializer = MessagingSerializer(messages, many=True)
        # return Response({"messages": messagesSerializer.data}, status=status.HTTP_200_OK)
    # except Exception:
    #     return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMessagesById(request,userId):
    try:
        print(request.user)
        user = UserSerializer(request.user).data
        messages = Messaging.objects.filter(Q(sender_id_id=userId)|Q(receiver_id_id=userId)).filter(Q(sender_id_id=user['id'])|Q(receiver_id_id=user['id'])).order_by("-time")
        messagesSerializer = MessagingSerializer(messages, many=True)
        return Response({"messages": messagesSerializer.data}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMessages(request):
    try:
        print(request.user)
        user = UserSerializer(request.user).data
        # messages = Messaging.objects.filter(Q(sender_id_id=user['id'])|Q(receiver_id_id=user['id']))
        uniqueSender = Messaging.objects.filter(~Q(sender_id_id=user['id'])).values("sender_id_id").distinct()
        print(uniqueSender)
        uniqueReceiver = Messaging.objects.filter(~Q(receiver_id_id=user['id'])).values("receiver_id_id").distinct()
        print(uniqueReceiver)
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
        for i in range(len(uniqueUser)):
            lastMessage = Messaging.objects.filter((Q(sender_id_id=uniqueUser[i]) & Q(receiver_id_id=user["id"])) | (Q(receiver_id_id=uniqueUser[i]) & Q(sender_id_id=user["id"]))).order_by("-time")
            print("hi")
            lastMessageSerializer = MessagingSerializer(lastMessage[0]).data
            print("hi")
            print(lastMessageSerializer)
            print(lastMessageSerializer["sender_id"])
            print(lastMessageSerializer["receiver_id"])
            if lastMessageSerializer["sender_id"] == uniqueUser[i]:
                lastMessageSerializer['name'] = uniqueUserName[i]
                lastMessageSerializer['sender_name'] = ""
            else:
                lastMessageSerializer["name"] = uniqueUserName[i]
                lastMessageSerializer['sender_name'] = "You: "
            lastMessageSerializer["orgMssage"] = lastMessageSerializer["message"]
            if len(lastMessageSerializer["message"]) > 60:
                lastMessageSerializer["message"] = lastMessageSerializer["message"][:60]+"..."
            print(lastMessageSerializer)
            lastMessageArray.append(lastMessageSerializer)
        messages = sorted(lastMessageArray, key=lambda d: d['time'], reverse=True)
        # messagesWithName = []
        # print("hi0")
        # for i in range(len(uniqueUser)):
        #     print("hello")
        #     for message in messages:
        #         print("hi1")
        #         print(message)
        #         if message["sender_id"] == uniqueUser[i]:
        #             print("hi2")
        #             message['sender_name'] = uniqueUserName[i]
        #             print("hi3")
        return Response({"messages": messages}, status=status.HTTP_200_OK)
    except Exception:
        return Response({"error": "404 not found"}, status=status.HTTP_404_NOT_FOUND)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def senMessage(request):
#
#     data = request.data
#     sender = UserSerializer(request.user).data
#     sender = User.objects.get(id=sender['id'])
#
#     receiver = User.objects.get(id=data['receiver_id'])
#
#     message = Messaging.objects.create(
#         sender_id=sender,
#         receiver_id=receiver,
#         message=data['message']
#     )
#
#     print(MessagingSerializer(message).data)
#
#     return Response({"success":True}, status = status.HTTP_200_OK)


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


