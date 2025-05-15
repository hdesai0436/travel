from django.contrib import admin
from django.urls import path
from .views import register_user,login
urlpatterns = [
    path('api/create/user', register_user, name='register_user'),
     path('api/user/login', login, name='user_login'),
   
]

