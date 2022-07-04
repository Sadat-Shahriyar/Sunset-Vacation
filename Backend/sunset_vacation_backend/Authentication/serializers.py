from rest_framework import serializers
from .models import User
from rest_framework.authtoken.models import Token


class TokenSerializer:
    class Meta:
        model = Token
        fields = ['token']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'email', 'phone_no', 'password', 'address', 'country', 'city']

    def save(self):
        user = User(
            name=self.validated_data.get('name'),
            email=self.validated_data.get('email'),
            phone_no=self.validated_data.get('phone_no'),
            password=self.validated_data.get('password'),
            address=self.validated_data.get('address'),
            country=self.validated_data.get('country'),
            city=self.validated_data.get('city')
        )

        user.save()
        return user
