
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

class EnrollmentCreateView(generics.CreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer


from rest_framework import viewsets
from .models import Course, Module
from .serializers import CourseSerializer, ModuleSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

from django_filters.rest_framework import DjangoFilterBackend
from .models import Module
from .serializers import ModuleSerializer

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['course']  # This enables ?course=<id> filtering


