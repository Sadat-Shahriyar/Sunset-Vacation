from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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