from django.shortcuts import render

from .serializers import AnswerSerializer, QuestionSerializer
from .models import Answer, Question
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from Hosting.models import *
from Hosting.serializer import *
from Authentication.models import *
from Authentication.serializers import *
import stripe
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from datetime import timedelta

# Create your views here.


@api_view(['GET'])
def getAllQuestions(request):
    questions = Question.objects.all()

    allQuestions = []

    for question in questions:
        answer = Answer.objects.filter(question_id_id=question)
        allQuestions.append({"quesion": QuestionSerializer(question).data, "Answers": AnswerSerializer(answer, many=True).data})

    print(allQuestions)

    return Response(data={"all_questions": allQuestions} )

