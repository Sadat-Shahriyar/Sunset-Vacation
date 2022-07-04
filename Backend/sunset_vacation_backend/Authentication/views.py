from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


@api_view(['POST'])
def signup(request):
    print(request.data)
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"message": serializer.errors, "success": False},
                        status=status.HTTP_201_CREATED)
    user = serializer.save()
    token = str(Token.objects.get_or_create(user=user)[0])
    return Response({"user": user, "token": token, "success": True}, status=status.HTTP_201_CREATED)


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
    token = str(Token.objects.get_or_create(user=user)[0])
    user = UserSerializer(user).data
    return Response({"user": user, "token": token, "success": True}, status=status.HTTP_200_OK)


@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def hello(request):
    user = UserSerializer(request.user).data
    token = str(request.auth)
    return Response({"user": user, "token": token, "success": True}, status=status.HTTP_200_OK)