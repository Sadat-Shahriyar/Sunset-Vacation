from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.authtoken.models import Token
from .models import User
from .serializers import UserRegistrationSerializer
from rest_framework import status


# Create your views here.
@api_view(['POST'])
def signup(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({"message": serializer.error_messages, "success": False},
                        status=status.HTTP_201_CREATED)
    user = serializer.save()
    request.user = user
    request.auth = 123
    return Response({"user": request.user.id, "token": request.auth, "success": True}, status=status.HTTP_201_CREATED)

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
