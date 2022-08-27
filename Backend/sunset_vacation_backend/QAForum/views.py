from sqlite3 import DateFromTicks
from django.shortcuts import render

from .serializers import AnswerSerializer, QuestionSerializer,QuestionPropertySerializer,UserQuestionReactSerializer,UserAnswerReactSerializer,AnswerPropertySerializer
from .models import Answer, Question,QuestionProperty,UserAnswerReact,UserQuestionReact,AnswerProperty
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


from django.contrib.postgres.search import  SearchQuery, SearchRank, SearchVector,TrigramSimilarity
from psycopg2.extras import NumericRange
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllQuestions(request):
    user=UserSerializer(request.user).data
    question_objects = Question.objects.all()
    qurstionSerializer = QuestionSerializer(question_objects, many=True)
    questions=sorted(qurstionSerializer.data, key=lambda d:d['question_date'],reverse=True)
    allQuestions = []

    allQuestions=getAllQuestionDetails(questions,user)

    return Response(data={"all_questions": allQuestions} )
def getReactCount(qid):
    question=UserQuestionReact.objects.filter(questionID=qid)
    qs=UserQuestionReactSerializer(question,many=True).data
    like=0
    dislike=0
    for q in qs:
        if q['react'] == 1:
            like=like+1
        elif q['react'] ==2:
            dislike=dislike+1
    dict={'like':like,'dislike':dislike}
    return dict

def getAnswerReactCount(aid):
    answer=UserAnswerReact.objects.filter(answerID=aid)
    qs=UserAnswerReactSerializer(answer,many=True).data
    like=0
    dislike=0
    for q in qs:
        if q['react'] == 1:
            like=like+1
        elif q['react'] ==2:
            dislike=dislike+1
    dict={'like':like,'dislike':dislike}
    return dict


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getQuestion(request,qid):
    question=Question.objects.filter(questions_id=qid)
    question=QuestionSerializer(question,many=True).data
    question=question[0]
    qp= QuestionProperty.objects.filter(questionID=question['questions_id'])
    qp=QuestionPropertySerializer(qp,many=True)
    list=[]
    for x in qp.data:
        property=Property.objects.get(propertyID=x['propertyID'])
        property = PropertySerializer(property).data
        photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        property['images'] = photoSerializer.data
        list.append(property)
    question['propertyList']=list
    return Response({'question':question},status=status.HTTP_200_OK)

def getAllQuestionDetails(questions,user):
    allQuestions = []
    idx=0
    for question in questions:
        q = Question.objects.filter(questions_id=question['questions_id'])[0]
        ques=QuestionSerializer(q).data
        dict=getReactCount(ques['questions_id'])
        ques['likecount']=dict['like']
        ques['dislikecount']=dict['dislike']
        user1 = User.objects.filter(id=question['questionair_id'])
        user1=UserSerializer(user1,many=True).data
        ques['name']=user1[0]['name']
        qp= QuestionProperty.objects.filter(questionID=question['questions_id'])
        qp=QuestionPropertySerializer(qp,many=True)
        # print(qp.data)
        list=[]
        for x in qp.data:
            property=Property.objects.get(propertyID=x['propertyID'])
            property = PropertySerializer(property).data
            photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
            photoSerializer = PropertyPhotoSerializer(photos, many=True)
            property['images'] = photoSerializer.data
            list.append(property)
        ques['propertyList']=list
        ques['index']=idx
        idx=idx+1
        react=UserQuestionReact.objects.filter(user=user['id'],questionID=question['questions_id'])
        react=UserQuestionReactSerializer(react,many=True).data
        if len(react) > 0:
            ques['react']=react[0]['react']
        else:            
            ques['react']=0
       
        answer = Answer.objects.filter(question_id_id=q)
        answerSerializer=AnswerSerializer(answer,many=True)
        sortedAnswers = sorted(answerSerializer.data, key=lambda d:d['answer_time'],reverse=True)
        for answers in sortedAnswers:
            react=UserAnswerReact.objects.filter(user=user['id'],answerID=answers['answer_id'])
            react=UserAnswerReactSerializer(react,many=True).data
            if len(react) > 0:
                answers['react']=react[0]['react']
            else:
                answers['react']=0
            answerer=User.objects.filter(id=answers['answerer_id'])
            answerer=UserSerializer(answerer,many=True).data
            name=answerer[0]['name']
            answers['answerer']=name       
            dict=getAnswerReactCount(answers['answer_id'])
            answers['likecount']=dict['like']
            answers['dislikecount']=dict['dislike']
            qp= AnswerProperty.objects.filter(answerID=answers['answer_id'])
            qp= AnswerPropertySerializer(qp,many=True)
            # print(qp.data)
            list=[]
            for x in qp.data:
                property=Property.objects.get(propertyID=x['propertyID'])
                property = PropertySerializer(property).data
                photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
                photoSerializer = PropertyPhotoSerializer(photos, many=True)
                property['images'] = photoSerializer.data
                list.append(property)
            answers['propertyList']=list
        allQuestions.append({"question": ques, "answers": sortedAnswers, "ansCount": len(sortedAnswers)})
    return allQuestions

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyQuestions(request):
    user=UserSerializer(request.user).data
    # user=User.objects.get(id=user['id'])
    question_objects = Question.objects.filter(questionair_id=user['id'])
    qurstionSerializer = QuestionSerializer(question_objects, many=True)
    questions=sorted(qurstionSerializer.data, key=lambda d:d['question_date'],reverse=True)
    allQuestions=getAllQuestionDetails(questions,user)

    return Response(data={"all_questions": allQuestions} )

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateQuestionReact(request):
    qid=request.data['qid']
    react=request.data['react']
    user = UserSerializer(request.user).data
    user1 = User.objects.get(id=user['id'])
    q=Question.objects.get(questions_id=qid)
    question=UserQuestionReact.objects.filter(user=user['id'],questionID=qid)
    question=UserQuestionReactSerializer(question,many=True).data
    if len(question) >0 :
        q=UserQuestionReact.objects.get(user=user['id'],questionID=qid)
        qs=UserQuestionReactSerializer(q).data
        qs['react']=int(react)
        serializer= UserQuestionReactSerializer(q,qs)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
    else:
        UserQuestionReact.objects.create(
            user=user1,
            questionID = q,
            react =int(react)
        )
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error": "error 404"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateAnswerReact(request):
    aid=request.data['aid']
    react=request.data['react']
    user = UserSerializer(request.user).data
    user1 = User.objects.get(id=user['id'])
    a=Answer.objects.get(answer_id=aid)
    answer=UserAnswerReact.objects.filter(user=user['id'],answerID=aid)
    answer=UserAnswerReactSerializer(answer,many=True).data
    if len(answer) >0 :
        q=UserAnswerReact.objects.get(user=user['id'],answerID=aid)
        qs=UserAnswerReactSerializer(q).data
        qs['react']=int(react)
        serializer= UserAnswerReactSerializer(q,qs)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True}, status=status.HTTP_200_OK)
    else:
        UserAnswerReact.objects.create(
            user=user1,
            answerID = a,
            react =int(react)
        )
        return Response({"success": True}, status=status.HTTP_200_OK)
    return Response({"error": "error 404"}, status=status.HTTP_404_NOT_FOUND)

@api_view(["GET"])
def getQAproperty(request,title):
    vector=(
        TrigramSimilarity('title',title)
    )
    s=Property.objects.filter(title__search=title)
    # s=Property.objects.annotate( similarity=vector).filter(similarity__gt=0.5).order_by('-similarity')
    p =PropertySerializer(s, many=True)
    # print(len(p.data))
    propertyList=[]
    for property in p.data:
        photos = PropertyPhotos.objects.filter(property_id=property['propertyID'])
        photoSerializer = PropertyPhotoSerializer(photos, many=True)
        property['images'] = photoSerializer.data
        propertyList.append(property)

    return Response({'propertyList': propertyList},status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getSearchPost(request,keyword):
    propertyList=[]
    user=UserSerializer(request.user).data
    q=Question.objects.filter(description__search=keyword)
    questions=QuestionSerializer(q, many=True).data
    allQuestions=getAllQuestionDetails(questions,user)

    p=Property.objects.filter(title__search=keyword)  
    properties=PropertySerializer(p,many=True).data
    for p in properties:
        matchedquestions=QuestionProperty.objects.filter(propertyID=p['propertyID'])
        questions = QuestionPropertySerializer(matchedquestions, many=True).data
        for q in questions:
            question=Question.objects.filter(questions_id=q['questionID'])
            question=QuestionSerializer(question,many=True).data
            qs=getAllQuestionDetails(question,user)
            for x in qs:
                if x not in allQuestions:
                    allQuestions.append(x)   


    return Response(data={"all_questions": allQuestions},status=status.HTTP_200_OK)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deletePost(request,qid):
    q=Question.objects.get(questions_id=qid)
    q.delete()
    return Response({'data':'successfully deleted'},status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateQuestion(request,qid):
    q=Question.objects.get(questions_id=qid)
    qs=QuestionSerializer(q).data
    qs['description']=request.data['description']
    serializer=QuestionSerializer(q,qs)
    if serializer.is_valid():
        serializer.save()
    qp=QuestionProperty.objects.filter(questionID=qid)
    qp=QuestionPropertySerializer(qp,many=True).data
    
    for x in qp:
        y=QuestionProperty.objects.get(id=x['id'])
        y.delete()
    propertyList=request.data['propertyList']
    for property in propertyList:
        prop=Property.objects.get(propertyID=property['propertyID'])
        QuestionProperty.objects.create(
            questionID=q,
            propertyID=prop
        )
    return Response({'msg':'updated successfully'},status=status.HTTP_200_OK)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertQuestion(request):

    # allq=Question.objects.all()
    # all=QuestionSerializer(allq,many=True)
    # for a in all.data:
    #     q=Question.objects.get(questions_id=a['questions_id'])
    #     q.delete()
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])

    description=request.data['description']
    properties=request.data['properties']

    question=Question.objects.create(
        description=description,
        questionair_id=user
    )
    for property in properties:
        prop=Property.objects.get(propertyID=property['propertyID'])
        QuestionProperty.objects.create(
            questionID=question,
            propertyID=prop
        )
    return Response({'data:':'success'},status=status.HTTP_200_OK)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def insertComment(request):
    user = UserSerializer(request.user).data
    user = User.objects.get(id=user['id'])
    q=Question.objects.get(questions_id=request.data['qid'])
    answer=Answer.objects.create(
        answer= request.data['answer'],
        answerer_id= user,
        question_id =q 
    )

    propertyList =request.data['propertyList']
    
    for p in propertyList:      
        property=Property.objects.get(propertyID=int(p))
        AnswerProperty.objects.create(
            answerID = answer,
            propertyID = property
        )
    return Response({'msg':'successfully inserted'},status=status.HTTP_200_OK)