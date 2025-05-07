from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import register, login, Course, Enrollment

# User Registration Serializer (handles password hashing)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = ['id', 'username', 'email', 'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return register.objects.create(**validated_data)

# Lightweight Register Serializer (for read operations)
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = ['id', 'username', 'email', 'role']

# Generic register serializer (includes all fields)
class registerSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = '__all__'

# Login Serializer
class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = login
        fields = '__all__'

# Module Serializer
# class ModuleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Module
#         fields = ['id', 'module_name', 'module_description', 'video_url']


# Course Serializer with nested modules
# class CourseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Course
#         fields = ['id', 'title', 'description', 'category', 'difficulty_level', 'thumbnail', 'teacher']



from rest_framework import serializers
from .models import Course, Module

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'course', 'title', 'description', 'video_url']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'difficulty_level', 'thumbnail', 'teacher']







# Enrollment Serializer
class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
