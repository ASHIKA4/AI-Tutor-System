
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (

     EnrollmentListCreateView,
    login_view,
    register_view,
    
   
    RegisterViewSet,
    CourseViewSet, ModuleViewSet, QuizViewSet
  
   
)

router = DefaultRouter()

router.register(r'courses', CourseViewSet, basename='course') 
router.register(r'modules', ModuleViewSet, basename='module')
router.register(r'quizzes', QuizViewSet, basename='quiz')


urlpatterns = [
    
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
   
    path('', include(router.urls)),  
    
    path('enroll/', EnrollmentListCreateView.as_view(), name='enroll-list-create'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)