from .models import *
from rest_framework import serializers

class MessagingSerializer(serializers.ModelSerializer):
    sender_id=serializers.PrimaryKeyRelatedField(read_only=True)
    receiver_id=serializers.PrimaryKeyRelatedField(read_only=True)
    message=serializers.CharField(
        max_length=200,
        required=False
    )
    marked = serializers.BooleanField(
        required=False
    )
    class Meta:
        model=Messaging
        fields = '__all__'