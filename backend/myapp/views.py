
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import UserSerializer

from rest_framework import generics
from .models import register,login
from .serializers import registerSerializer,loginSerializer,ModuleSerializer

from rest_framework import viewsets
from .models import register, Module
from .serializers import RegisterSerializer

# ViewSet for Register model
class RegisterViewSet(viewsets.ModelViewSet):
    queryset = register.objects.all()
    serializer_class = RegisterSerializer


class registerListCreate(generics.ListCreateAPIView):
    queryset = register.objects.all()
    serializer_class = registerSerializer
      

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer

@api_view(['POST'])
def register_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()  # Save the user instance
            return Response({
                "message": "User registered successfully",
                "id": user.id,  # Return the id of the newly created user
                "redirect": "/login"
            }, status=201)
        else:
            return Response(serializer.errors, status=400)

        

        
from django.contrib.auth.hashers import check_password

@api_view(['POST'])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user_obj = register.objects.get(email=email)

        if check_password(password, user_obj.password):
            return Response({
                "message": "Login successful",
                "redirect": "/home",
                "role": user_obj.role,  # ✅ send role
                "username": user_obj.username,
                "email": user_obj.email,
                "id": user_obj.id,
                
            }, status=200)
        else:
            return Response({"error": "Invalid email or password"}, status=400)
    
    except register.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=400)



from rest_framework import generics
from .models import Enrollment
from .serializers import EnrollmentSerializer

# views.py

from rest_framework import generics
from .models import Enrollment
from .serializers import EnrollmentSerializer

class EnrollmentListCreateView(generics.ListCreateAPIView):
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        queryset = Enrollment.objects.select_related('course').all()
        student_id = self.request.query_params.get('student')
        course_id = self.request.query_params.get('course')

        if student_id:
            queryset = queryset.filter(student_id=student_id)
        if course_id:
            queryset = queryset.filter(course_id=course_id)

        return queryset


# {
#   "module_status": ["Module 1: Not Completed", "Module 2: In Progress"],
#   "quiz_status": ["Quiz 1: Pending", "Quiz 2: Pending"]
# }






from rest_framework import viewsets
from .models import Course, Module
from .serializers import CourseSerializer, ModuleSerializer

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Course.objects.all()
        teacher_id = self.request.query_params.get('teacher')

        if teacher_id:
            queryset = queryset.filter(teacher__id=teacher_id)

        return queryset





from django_filters.rest_framework import DjangoFilterBackend
from .models import Module
from .serializers import ModuleSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course']  # This enables ?course=<id> filtering


from rest_framework.exceptions import NotFound
from rest_framework import viewsets, permissions
from .models import Course, register, Quiz  # Make sure these are imported
from .serializers import QuizSerializer

class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Quiz.objects.all()
        teacher_id = self.request.query_params.get('teacher')
        course_id = self.request.query_params.get('course')

        if teacher_id:
            if not register.objects.filter(id=teacher_id).exists():
                raise NotFound(detail=f"Teacher with id {teacher_id} not found.")
            queryset = queryset.filter(teacher__id=teacher_id)

        if course_id:
            if not Course.objects.filter(id=course_id).exists():
                raise NotFound(detail=f"Course with id {course_id} not found.")
            queryset = queryset.filter(course__id=course_id)

        return queryset

    def perform_create(self, serializer):
        serializer.save()


