from django.db import models

# Create your models here.


class Property(models.Model):
    propertyID=models.AutoField(
        primary_key=True
    )

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
        default=None,
        null=True
    )
    checkOutTime=models.DateTimeField(
        default=None,
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



