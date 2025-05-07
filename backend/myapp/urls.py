
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (

     EnrollmentCreateView,
    login_view,
    register_view,
    
   
    RegisterViewSet,
    CourseViewSet, ModuleViewSet
  
   
)

router = DefaultRouter()

router.register(r'courses', CourseViewSet)
router.register(r'modules', ModuleViewSet)


urlpatterns = [
    
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
   
    path('', include(router.urls)),  
    path('enroll/', EnrollmentCreateView.as_view(), name='enroll-course'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)