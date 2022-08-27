from django.urls import path
from . import views


urlpatterns = [
    path('getAllQuestions/',views.getAllQuestions),
    path('getMyquestions/',views.getMyQuestions),
    path('getQAproperty/<str:title>',views.getQAproperty),
    path('insertQuestion/',views.insertQuestion),
    path('updateQuestionReact/',views.updateQuestionReact),
    path('updateAnswerReact/',views.updateAnswerReact),
    path('insertComment/',views.insertComment),
    path('getQuestion/<int:qid>/',views.getQuestion),
    path('deletePost/<int:qid>/',views.deletePost),
    path('updateQuestion/<int:qid>/',views.updateQuestion),
    path('getSearchPost/<str:keyword>/',views.getSearchPost),
]
