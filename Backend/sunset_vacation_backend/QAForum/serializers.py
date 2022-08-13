from .models import *
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    questionair_id=serializers.PrimaryKeyRelatedField(read_only=True)
    description=serializers.CharField(max_length=500,required=False)
    tag_ids=serializers.CharField(max_length=500,required=False)

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


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tags
        fields = '__all__'

