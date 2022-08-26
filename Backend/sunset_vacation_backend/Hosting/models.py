from distutils.command.upload import upload
from django.db import models
from Authentication.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime    


# Create your models here.


class Property(models.Model):
    propertyID=models.AutoField(
        primary_key=True
    )

    owner_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None)

    title=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )

    catagory=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
    description=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    perNightCost=models.FloatField(
        default=None,
        null=True
    )

    checkInTime=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )

    checkOutTime=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )
    maxDaysRefund = models.IntegerField(
        default=None,
        null=True
    )
    noOfGuests=models.IntegerField(
        default=None,
        null=True
    )
    noOfBeds=models.IntegerField(
        default=None,
        null=True
    )
    noOfBedrooms=models.IntegerField(
        default=1,
        null=True
    )
    noOfBathrooms=models.IntegerField(
        default=None,
        null=True
    )
    address=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    conciseType = models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    entirePrivateOrShared = models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    latitude=models.CharField(
         max_length=500,
        default=None,
        blank=False,
        null=True
    )
    longitude=models.CharField(
         max_length=500,
        default=None,
        blank=False,
        null=True
    )

    published = models.BooleanField(default=False)

    approved = models.BooleanField(default=False)


# class FacilityCategory(models.Model):
#     id = models.AutoField(
#         primary_key=True
#     )
#     category = models.CharField(
#         max_length=100,
#         default=None,
#         blank=False,
#         null=True
#     )
#
#
# class FacilitySubcategory(models.Model):
#     id = models.AutoField(
#         primary_key=True
#     )
#     subcategory = models.CharField(
#         max_length=100,
#         default=None,
#         blank=False,
#         null=True
#     )



class Catagory(models.Model):
    catagory_id=models.AutoField(
        primary_key=True
    )
    description=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )

class Offer(models.Model):
    offer_id=models.AutoField(
        primary_key=True
    )
    startDate=models.DateTimeField(
        default=None
    )
    endDate=models.DateTimeField(
        default=None
    )
    amount=models.FloatField(
        default=None
    )
    propertyID=models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        null=False
    )
class House_Rules(models.Model):
    rule_id=models.AutoField(primary_key=True)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    do_dont_flag=models.IntegerField(default=None,null=True)
    rule=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )

class FAQ(models.Model):
    faq_id=models.AutoField(primary_key=True)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    question=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
    answer=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
class Facility(models.Model):
    facility_name=models.CharField(
        primary_key=True, 
        max_length=100,
        default=None,
        blank=False)
    #spelling mistake
    catagory=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
    subcatagory=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
class PropertyFacilities(models.Model):
   
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    facility_name=models.ForeignKey(Facility,on_delete=models.CASCADE)
    description=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
class Ratings(models.Model):
    user_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    rating=models.FloatField(default=None,null=True)

class Reviews(models.Model):
    user_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    review=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
class Notification(models.Model):

    user_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    title = models.CharField(
        max_length=200,
        default=None,
        blank=True,
        null=True
    )
    text=models.CharField(
        max_length=200,
        default=None,
        blank=True,
        null=True
    )
    link=models.CharField(
        max_length=100,
        default=None,
        blank=True,
        null=True
    )
    time=models.DateTimeField(
        default=datetime.now,
        null=True
    )
    marked=models.BooleanField(default=False)

class Messaging(models.Model):
    msg_id=models.AutoField(primary_key=True)
    sender_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,related_name="sender")
    receiver_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,related_name="receiver")
    message=models.CharField(
        max_length=200,
        default=None,
        blank=False,
        null=True
    )
    time=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )
    marked=models.BooleanField(
      default=False
    )

class GiftCard(models.Model):
    giftcard_id=models.AutoField(primary_key=True)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE)
    type=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )
    discount=models.FloatField(default=None,null=True)
    expiry_date=models.DateTimeField(default=None,null=True)
    customMsg=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

class UserGiftCardList(models.Model):
    user_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    giftcard_id=models.ForeignKey(GiftCard,on_delete=models.CASCADE)
    used_flag=models.BooleanField(default=False)



class PropertyPhotos(models.Model):
    property_id = models.ForeignKey(
        Property,
        on_delete=models.CASCADE
    )

    photo_url=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )




class PropertyPhotoUploadHelper(models.Model):
    image = models.ImageField(upload_to='property')
    
    def __str__(self):
        return self.title