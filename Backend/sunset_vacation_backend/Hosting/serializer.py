from .models import Property
from rest_framework import serializers

class PropertySerializer(serializers.ModelSerializer):
    title=serializers.CharField(max_length=100,required=False)
    description=serializers.CharField(max_length=500,required=False)
    catagory=serializers.CharField(max_length=100,required=False)
    perNightCost=serializers.IntegerField(required=False)
    noOfBathrooms=serializers.IntegerField(required=False)
    noOfBeds=serializers.IntegerField(required=False)
    noOfGuests=serializers.IntegerField(required=False)
    maxDaysRefund=serializers.IntegerField(required=False)
    latitude=serializers.CharField(max_length=100,required=False)
    longitude=serializers.CharField(max_length=100,required=False)
    address=serializers.CharField(max_length=500,required=False)
    checkInTime=serializers.DateTimeField(required=False)
    checkOutTime=serializers.DateTimeField(required=False)
    maxDaysRefund=serializers.IntegerField(required=False)


    # def create(self,data):
    #     return Property.objects.create(
    #         title=data.get('title')
    #         description=data.get('description')
    #         catagory=data.get('catagory')
    #         perNightCost=data.get('perNightCost')
    #         noOfBathrooms=data.get('noOfBathrooms')
    #         noOfBeds=data.get('noOfBeds')
    #         noOfGuests=data.get('noOfGuests')
    #         maxDaysRefund=data.get('maxDaysRefund')
    #         latitude=data.get('latitude')
    #         longitude=data.get('longitude')
    #         address=data.get('address')
    #         checkInTime=data.get('checkInTime')
    #         checkOutTime=data.get('checkOutTime')
    #         maxDaysRefund=data.get('maxDaysRefund')
    #     )

    class Meta:
        model=Property
        fields = '__all__'