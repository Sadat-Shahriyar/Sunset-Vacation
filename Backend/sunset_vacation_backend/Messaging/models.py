from distutils.command.upload import upload
from django.db import models
from Authentication.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime  

# Create your models here.
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
    marked = models.BooleanField(
        default=False
    )