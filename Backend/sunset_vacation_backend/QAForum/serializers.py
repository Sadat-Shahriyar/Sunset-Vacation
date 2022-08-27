from .models import *
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    questionair_id=serializers.PrimaryKeyRelatedField(read_only=True)
    description=serializers.CharField(max_length=500,required=False)
   

    class Meta:
        model=Question
        fields = '__all__'



class AnswerSerializer(serializers.ModelSerializer):
    answerer_id=serializers.PrimaryKeyRelatedField(read_only=True)
    question_id=serializers.PrimaryKeyRelatedField(read_only=True)
    answer=serializers.CharField(max_length=500,required=False)
   

    class Meta:
        model=Answer
        fields = '__all__'

class UserQuestionReactSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    questioniD=serializers.PrimaryKeyRelatedField(read_only=True)
    react=serializers.IntegerField(default=0)
    class Meta:
        model=UserQuestionReact
        fields='__all__'

class UserAnswerReactSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(read_only=True)
    answerID=serializers.PrimaryKeyRelatedField(read_only=True)
    react=serializers.IntegerField(default=0)
    class Meta:
        model=UserAnswerReact
        fields='__all__'

class QuestionPropertySerializer(serializers.ModelSerializer):
    questionID=serializers.PrimaryKeyRelatedField(read_only=True)
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=QuestionProperty
        fields='__all__'

class AnswerPropertySerializer(serializers.ModelSerializer):
    answerID=serializers.PrimaryKeyRelatedField(read_only=True)
    propertyID=serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model=QuestionProperty
        fields='__all__'




