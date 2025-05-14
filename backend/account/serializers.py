from rest_framework import serializers
from django.contrib.auth.models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email','first_name','last_name','password','password2']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {'required': True},
            'password2': {'write_only':True,'required': True},
        }
    def validate(self, data):
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({'username':'username already exists'})
        if User.objects.filter(email = data['email']).exists():
            raise serializers.ValidationError({"email":"email address has been exists"})
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password":"password do not match"})
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(
            username =  validated_data['username'],
            email =  validated_data['email'],
            first_name =  validated_data['first_name'],
            last_name =  validated_data['last_name'],
            password =  validated_data['password'],
        )
        return user