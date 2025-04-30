from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from rest_framework import generics, status
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

from .models import about
from .serializers import aboutSerializer, RegisterSerializer

User = get_user_model()

# About API
class AboutListCreate(generics.ListCreateAPIView):
    queryset = about.objects.all()
    serializer_class = aboutSerializer

# Register API with JWT
@api_view(['POST'])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'User registered successfully',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'redirect': '/login'
        }, status=201)
    return Response(serializer.errors, status=400)

# Login API with JWT
@api_view(['POST'])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=400)

    user = authenticate(request, username=user.username, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'redirect': '/home'
        }, status=200)
    return Response({"error": "Invalid email or password"}, status=400)


