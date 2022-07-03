from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from .models import User
from rest_framework import status


# Create your views here.

@api_view(['POST'])
def login(request):
    """Return a message"""
    email = request.data["email"]
    password = request.data["password"]
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "No user exists with provided user email"}, status=status.HTTP_404_NOT_FOUND)
    if user.password != password:
        return Response({"error": "Password did not match"}, status=status.HTTP_401_UNAUTHORIZED)
    request.user = user
    return Response({"user": request.user.user_id, "success": True}, status=status.HTTP_200_OK)


@api_view(['GET'])
def hello(request):
    return Response({"message": "hello world", "success": True}, status=status.HTTP_200_OK)
