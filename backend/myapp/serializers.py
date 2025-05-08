from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import register, login, Course, Enrollment

class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField()
    
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
from .models import Course
from .models import register  # Replace with your actual model path

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = register
        fields = ['id', 'username', 'email']  # Add other fields you want to expose

class CourseSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'difficulty_level', 'thumbnail', 'teacher']


from rest_framework import serializers
from .models import Course, Module

class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = ['id', 'course', 'title', 'description', 'video_url']




class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.PrimaryKeyRelatedField(
    queryset=Course.objects.all(), source='course', write_only=True
    )

    class Meta:
        model = Enrollment
        fields ='__all__'


from rest_framework import serializers
from .models import Quiz, Question, Option

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, required=False)
    
    class Meta:
        model = Question
        fields = ['id', 'type', 'text', 'points', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, required=False)
    teacher = RegisterSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=register.objects.all(),
        source='teacher',
        write_only=True,
        required = True
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source='course',
        write_only=True
    )

    class Meta:
        model = Quiz
        fields = [
            'id', 'title', 'description', 'course', 'course_id', 'teacher', 'teacher_id',
            'time_limit', 'passing_score', 'max_attempts', 'instructions', 'is_published',
            'randomize_questions', 'show_results', 'show_answers', 'enforce_time_limit',
            'start_date', 'end_date', 'created_at', 'updated_at', 'questions'
        ]

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        quiz = Quiz.objects.create(**validated_data)
        
        for question_data in questions_data:
            options_data = question_data.pop('options', [])
            question = Question.objects.create(quiz=quiz, **question_data)
            
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        
        return quiz