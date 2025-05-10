from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    EnrollmentListCreateView,
    login_view,
    register_view,
    RegisterViewSet,
    CourseViewSet,
    ModuleViewSet,
    QuizViewSet
)

# Initialize the router for viewsets
router = DefaultRouter()

# Register the viewsets with the router
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'quizzes', QuizViewSet, basename='quiz')

urlpatterns = [
    # Custom login and register API endpoints
    path('register/', register_view, name='register'),  # User registration
    path('login/', login_view, name='login'),  # User login
    
    # Include the viewset routes
    path('', include(router.urls)),  # This will include all the routes for 'courses', 'modules', 'quizzes'
    
    # Enrollment endpoint (handles list and creation)
    path('enroll/', EnrollmentListCreateView.as_view(), name='enroll-list-create'),
]

# Serve media files in development mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
