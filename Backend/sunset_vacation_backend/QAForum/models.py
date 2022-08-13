from pyexpat import model
from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime    


# Create your models here.


class Question(models.Model):
    questions_id=models.AutoField(
        primary_key=True
    )

    questionair_id = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)

    question = models.CharField(
        max_length=500,
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

    question_date = models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )

    tag_ids = models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )





class Answer(models.Model):
    answer_id=models.AutoField(
        primary_key=True
    )

    answerer_id = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)

    question_id = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        null=False
    )

    answer=models.CharField(
        max_length=500,
        default=None,
        blank=False,
        null=True
    )

    answer_time = models.DateTimeField(
        default=datetime.now,
        blank=True,
        null=True
    )


class Tags(models.Model):
    tag_name=models.CharField(
        primary_key=True, 
        max_length=100,
        default=None,
        blank=False)
