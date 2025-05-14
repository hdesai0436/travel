from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterUserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    user_serializer = RegisterUserSerializer(data=data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        return Response({
            'message':'user created successfully',
            'status':True
        },status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

