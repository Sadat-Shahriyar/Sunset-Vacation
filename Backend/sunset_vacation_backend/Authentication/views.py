from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer, TokenSerializer
from rest_framework import status
from django.core import serializers


# Create your views here.
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"message": serializer.errors, "success": False},
                        status=status.HTTP_201_CREATED)
    user = serializer.save()
    request.user = UserSerializer(user).data
    request.auth = str(Token.objects.get_or_create(user=user)[0])
    return Response({"user": request.user, "token": request.auth, "success": True}, status=status.HTTP_201_CREATED)

# @api_view(['POST'])
# def login(request):
#     """Return a message"""
#     print("hello")
#     email = request.data["email"]
#     password = request.data["password"]
#     try:
#         user = User.objects.get(email=email)
#     except User.DoesNotExist:
#         return Response({"error": "No user exists with provided user email"}, status=status.HTTP_404_NOT_FOUND)
#     if user.password != password:
#         return Response({"error": "Password did not match"}, status=status.HTTP_401_UNAUTHORIZED)
#     request.user = user
#     request.auth = Token.objects.create(user=user)
#     return Response({"user": request.user.user_id, "token": request.auth, "success": True}, status=status.HTTP_200_OK)
#
#
# @api_view(['GET'])
# def hello(request):
#     from rest_framework.authtoken.models import Token
#     user = User.objects.get(email="taaha@gmail.com")
#     print(user.name)
#     token = Token.objects.create(username=user.name)
#     print(token.key)
#     return Response({"message": "hello world", "success": True}, status=status.HTTP_200_OK)
