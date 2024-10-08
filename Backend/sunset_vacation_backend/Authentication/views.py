from distutils.command import check
from lib2to3.pgen2 import token
from os import stat
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
import hashlib
import datetime
from datetime import timedelta
from django.utils import timezone
from django.conf import settings
from Hosting.models import *
from Hosting.serializer import *
from Booking.models import *
from Booking.serializers import *


@api_view(['POST'])
def signup(request):
    # print(request.data)
    request.data['password'] = hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
    # print(request.data)
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"message": serializer.errors, "success": False},
                        status=status.HTTP_201_CREATED)
    user = serializer.save()

    userValue = UserSerializer(user).data
    userData = User.objects.get(id=userValue['id'])
    userData.photo =  request.data['image']
    userData.save()
    
    token = str(Token.objects.get_or_create(user=user)[0])
    return Response({"email": serializer.data['email'], "token": token, "success": True}, status=status.HTTP_201_CREATED)
    # return Response({"success": True}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Return a message"""
    print(request.data)
    email = request.data["email"]
    password =hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
    print(password)
    # email = request.POST.get('email', '')
    # password = hashlib.sha256(request.POST.get('password', '').encode('utf-8')).hexdigest()
    # print(request.POST)
    # print(email)
    # password = request.data['password']
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "No user exists with provided user email"}, status=status.HTTP_404_NOT_FOUND)
    if user.password != password:
        return Response({"error": "Password did not match"}, status=status.HTTP_401_UNAUTHORIZED)
    # token = str(Token.objects.get_or_create(user=user)[0])
    # print(token)
    token,_ = Token.objects.get_or_create(user=user)
    # print(token.created)
    if is_token_expired(token):
        token.delete()
        token = Token.objects.create(user=user)
    
    returnToken = str(token)
    user = UserSerializer(user).data
    return Response({"email": email, "token":returnToken, "isAdmin":user["isAdmin"], "success": True}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([AllowAny])
def adminLogin(request):
    """Return a message"""
    print(request.data)
    email = request.data["email"]
    password =hashlib.sha256(request.data['password'].encode('utf-8')).hexdigest()
    print(password)
    # email = request.POST.get('email', '')
    # password = hashlib.sha256(request.POST.get('password', '').encode('utf-8')).hexdigest()
    # print(request.POST)
    # print(email)
    # password = request.data['password']
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "No user exists with provided user email"}, status=status.HTTP_404_NOT_FOUND)
    if user.password != password:
        return Response({"error": "Password did not match"}, status=status.HTTP_401_UNAUTHORIZED)
    # token = str(Token.objects.get_or_create(user=user)[0])
    # print(token)
    token,_ = Token.objects.get_or_create(user=user)
    # print(token.created)
    if is_token_expired(token):
        token.delete()
        token = Token.objects.create(user=user)
    
    returnToken = str(token)
    user = UserSerializer(user).data
    if user["isAdmin"]:
        return Response({"email": email, "token":returnToken, "isAdmin":user["isAdmin"], "success": True}, status=status.HTTP_200_OK)
    else:
        return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def hello(request):
    print(request.user)
    user = UserSerializer(request.user).data
    token = request.auth
    if not token_creation_time_valid(token):
        return Response({"error": "Invalid credentials"},  status=status.HTTP_401_UNAUTHORIZED)
    return Response({"user": user,"email": user['email'] , "token": str(token), "success": True}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout(request):
    token = request.user.auth_token
    
    if Token.objects.filter(key=token).exists():
        token.delete()

    return Response({'message': 'User Logged out successfully', 'success': True}, status=status.HTTP_200_OK)


#this return left time
def expires_in(token):
    time_elapsed = timezone.now() - token.created
    left_time = timedelta(seconds = settings.TOKEN_EXPIRED_AFTER_SECONDS) - time_elapsed
    return left_time

# token checker if token expired or not
def is_token_expired(token):
    return expires_in(token) < timedelta(seconds = 0)

#checking token. if token creation time exceeds 1 hour then deletes it and makes entry unauthorized
def token_creation_time_valid(token):
    if is_token_expired(token):
        token.delete()
        return False
    else:
        return True


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verifyToken(request):
    user = UserSerializer(request.user).data
    token = request.user.auth_token
    if token_creation_time_valid(token):
        return Response({"token": str(token), "valid": True, "id":user["id"]}, status=status.HTTP_200_OK)
    else:
        return Response({"token": "", "valid": False}, status=status.HTTP_401_UNAUTHORIZED)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getProfileInfo(request):
    user = UserSerializer(request.user).data
    # print(user)
    if user['photo'] == None:
        user['photo'] = "http://localhost:8000/media/defaultprofileimage/defaultprofileimage.png"
    return Response(data=user, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getGiftCardList(request):
    print(request.user)
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    userGiftCardList = UserGiftCardList.objects.filter(user_id_id=user).select_related().values()
    print(userGiftCardList)
    return Response({"hello"})