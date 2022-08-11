from django.db import models
from django.contrib.auth import get_user_model
from Hosting.models import *
from datetime import datetime    

# Create your models here.



class Payment(models.Model):
    payment_id=models.AutoField(primary_key=True)
    
    amount=models.FloatField(default=None,null=True)

    paytime=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )

    method=models.CharField(
        max_length=100,
        default=None,
        blank=False,
        null=True
    )

    discount=models.FloatField(default=0,null=True)

    receipt_url=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )


class Booking(models.Model):
    booking_id=models.AutoField(
        primary_key=True
    )

    user_id=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)

    property_id=models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        null=False,
        default=None
    )

    payment_id=models.ForeignKey(
        Payment,
        on_delete=models.CASCADE,
        null=False,
        default=None
    )

    checkin_date=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )

    checkout_date=models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )

    noOfGuests=models.IntegerField(
        default=None,
        null=True
    )

    arrived=models.BooleanField(default=False)

    