from django.db import models


# Create your models here.

class User(models.Model):
    user_id = models.AutoField(
        primary_key=True
    )

    name = models.CharField(
        max_length=200,
        default=None,
        blank=False,
        null=True
    )

    email = models.EmailField(
        max_length=50,
        default=None,
        blank=False,
        null=True,
        unique=True
    )

    phone_no = models.CharField(
        max_length=20,
        default=None,
        blank=False,
        null=True
    )

    password = models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    address = models.CharField(
        max_length=200,
        default=None,
        blank=False,
        null=True
    )

    country = models.CharField(
        max_length=20,
        default=None,
        blank=False,
        null=True
    )

    city = models.CharField(
        max_length=20,
        default=None,
        blank=False,
        null=True
    )
