from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, AbstractUser


# Create your models here.

# Class UserAccountManager(BaseUserManager):
#     def create_user(self, **kwargs):
#         if


class User(AbstractBaseUser):
    id = models.AutoField(
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

    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
