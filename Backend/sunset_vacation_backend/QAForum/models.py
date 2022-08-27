from pyexpat import model
from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime    
from Hosting.models import *
from Hosting.serializer import *

# Create your models here.


class Question(models.Model):
    questions_id=models.AutoField(
        primary_key=True
    )

    questionair_id = models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)

    # question = models.CharField(
    #     max_length=500,
    #     default=None,
    #     blank=False,
    #     null=True
    # )
    
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
    
class QuestionProperty(models.Model):
    questionID=models.ForeignKey(Question,on_delete=models.CASCADE,default=None,null=False)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE,default=None,null=False)

class AnswerProperty(models.Model):
    answerID=models.ForeignKey(Answer,on_delete=models.CASCADE,default=None,null=False)
    propertyID=models.ForeignKey(Property,on_delete=models.CASCADE,default=None,null=False)

class UserQuestionReact(models.Model):
    user=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)
    questionID=models.ForeignKey(Question,on_delete=models.CASCADE,default=None,null=False)
    react=models.IntegerField(default=0)

class UserAnswerReact(models.Model):
    user=models.ForeignKey(get_user_model(),on_delete=models.CASCADE,default=None,null=False)
    answerID=models.ForeignKey(Answer,on_delete=models.CASCADE,default=None,null=False)
    react=models.IntegerField(default=0)

