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
    print(data)
    user_serializer = RegisterUserSerializer(data=data)
    if user_serializer.is_valid():
        user = user_serializer.save()
        return Response({
            'message':'user created successfully',
            'status':True
        },status=status.HTTP_201_CREATED)

    print(user_serializer.errors)
    return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    print(data)
    username = data.get('username')
    password = data.get('password')
    user = User.objects.filter(username=username).first()
    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        user_details = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,

        }
        return Response({
            'access_token': str(refresh.access_token),
            "refresh_token": str(refresh),
            'user_details': user_details,
        })
    return Response({"message": "Invlaid password or username"},status=status.HTTP_401_UNAUTHORIZED)
