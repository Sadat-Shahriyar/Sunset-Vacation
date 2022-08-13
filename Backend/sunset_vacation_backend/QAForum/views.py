from sqlite3 import DateFromTicks
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
    question_objects = Question.objects.all()
    qurstionSerializer = QuestionSerializer(question_objects, many=True)
    questions=sorted(qurstionSerializer.data, key=lambda d:d['question_date'],reverse=True)
    allQuestions = []

    for question in questions:
        q = Question.objects.filter(questions_id=question['questions_id'])[0]
        answer = Answer.objects.filter(question_id_id=q)
        answerSerializer=AnswerSerializer(answer,many=True)
        sortedAnswers = sorted(answerSerializer.data, key=lambda d:d['answer_time'],reverse=True)
        allQuestions.append({"question": QuestionSerializer(q).data, "answers": sortedAnswers, "ansCount": len(sortedAnswers)})

    print(allQuestions)

    return Response(data={"all_questions": allQuestions} )

