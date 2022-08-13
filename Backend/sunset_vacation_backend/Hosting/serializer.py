from .models import *
from rest_framework import serializers


class FacilityCategorySerializer(serializers.ModelSerializer):
    category=serializers.CharField(
       max_length=100,
       required=False
    )

    class Meta:
        model=FacilityCategory
        fields = '__all__'


class FacilitySubcategorySerializer(serializers.ModelSerializer):
    subcategory=serializers.CharField(
       max_length=100,
       required=False
    )

    class Meta:
        model=FacilitySubcategory
        fields = '__all__'


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
    # checkInTime=serializers.DateTimeField(required=False)
    # checkOutTime=serializers.DateTimeField(required=False)
    maxDaysRefund=serializers.IntegerField(required=False)
    published=serializers.BooleanField(required=False)
    owner_id=serializers.PrimaryKeyRelatedField(read_only=True)
    approved=serializers.BooleanField(required=False)

    def create(self,validate_data):
        return Property.objects.create(
            title=validate_data.get('title'),
            description=validate_data.get('description'),
            catagory=validate_data.get('catagory'),
            perNightCost=validate_data.get('perNightCost'),
            noOfBathrooms=validate_data.get('noOfBathrooms'),
            noOfBeds=validate_data.get('noOfBeds'),
            noOfGuests=validate_data.get('noOfGuests'),
            maxDaysRefund=validate_data.get('maxDaysRefund'),
            latitude=validate_data.get('latitude'),
            longitude=validate_data.get('longitude'),
            address=validate_data.get('address'),
            # checkInTime=validate_data.get('checkInTime'),
            # checkOutTime=validate_data.get('checkOutTime'),
        )

    class Meta:
        model=Property
        fields = '__all__'


class CatagorySerializer(serializers.ModelSerializer):
    description=serializers.CharField(max_length=100,required=False)

    class Meta:
        model=Catagory
        fields = '__all__'

class OfferSerializer(serializers.ModelSerializer):
    startDate=serializers.DateTimeField(
        required=False
    )
    endDate=serializers.DateTimeField(
        required=False
    )
    amount=serializers.FloatField(
        required=False
    )
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model=Offer
        fields = '__all__'

class House_RulesSerializer(serializers.ModelSerializer):
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    do_dont_flag=serializers.IntegerField(required=False)
    rule=serializers.CharField(max_length=100,required=False)

    class Meta:
        model=House_Rules
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    question=serializers.CharField(max_length=100,required=False)
    answer=serializers.CharField(max_length=100,required=False)

    class Meta:
        model=FAQ
        fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):
    catagory=serializers.CharField(
        max_length=100,
       required=False
    )
    subcatagory=serializers.CharField(
        max_length=100,
       required=False
    )

    class Meta:
        model=Facility
        fields = '__all__'

class PropertyFacilitiesSerializer(serializers.ModelSerializer):
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    facility_name=serializers.PrimaryKeyRelatedField(read_only=True)
    description=serializers.CharField(
        max_length=100,
        required=False
    )

    class Meta:
        model=PropertyFacilities
        fields = '__all__'

class RatingsSerializer(serializers.ModelSerializer):
    user_id=serializers.PrimaryKeyRelatedField(read_only=True)
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    rating=serializers.FloatField(required=False)

    class Meta:
        model=Ratings
        fields = '__all__'

class ReviewsSerializer(serializers.ModelSerializer):
    user_id=serializers.PrimaryKeyRelatedField(read_only=True)
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    review=serializers.CharField(max_length=100,required=False)

    class Meta:
        model=Reviews
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    user_id=serializers.PrimaryKeyRelatedField(read_only=True)
    title = serializers.CharField(
        max_length=100,
       required=False
    )
    text=serializers.CharField(
        max_length=100,
       required=False
    )
    link=serializers.CharField(
        max_length=100,
        required=False
    )
    marked=serializers.BooleanField(required=False)

    class Meta:
        model=Notification
        fields = '__all__'

class MessagingSerializer(serializers.ModelSerializer):
    sender_id=serializers.PrimaryKeyRelatedField(read_only=True)
    receiver_id=serializers.PrimaryKeyRelatedField(read_only=True)
    message=serializers.CharField(
        max_length=100,
        required=False
    )
    time=serializers.DateTimeField(
        required=False
    )
    class Meta:
        model=Messaging
        fields = '__all__'

class GiftCardSerializer(serializers.ModelSerializer):
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    type=serializers.CharField(
        max_length=100,
        required=False
    )
    discount=serializers.FloatField(required=False)
    expiry_date=serializers.DateTimeField(required=False)
    customMsg=serializers.CharField(
        max_length=500,
        required=False
    )

    class Meta:
        model=GiftCard
        fields = '__all__'

class UserGiftCardListSerializer(serializers.ModelSerializer):
    user_id=serializers.PrimaryKeyRelatedField(read_only=True)
    giftcard_id=serializers.PrimaryKeyRelatedField(read_only=True)
    used_flag=serializers.BooleanField(required=False)


    class Meta:
        model=UserGiftCardList
        fields = '__all__'




class PropertyPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyPhotos
        fields = '__all__'
    
class PropertyPhotoUploadHelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyPhotoUploadHelper
        fields = '__all__'

