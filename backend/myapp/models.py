from django.db import models




class register(models.Model):  
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # ✅ Make email unique
    password = models.CharField(max_length=128)  # ✅ Keep, but ensure it's hashed before saving
    role = models.CharField(max_length=50, default="student")

    def __str__(self):
        return self.username  
    



    
class login(models.Model):  
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=128)  

    def __str__(self):
        return self.name

    

from django.db import models
from django.core.validators import FileExtensionValidator

class Course(models.Model):
    CATEGORY_CHOICES = [
        ('data_science', 'Data Science'),
        ('programming', 'Programming'),
        ('web_development', 'Web Development'),
        ('ai_ml', 'AI & Machine Learning'),
        ('cloud_computing', 'Cloud Computing'),
    ]

    DIFFICULTY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    title = models.CharField(max_length=150)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='programming')
    difficulty_level = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES, default='beginner')
    thumbnail = models.ImageField(
        upload_to='course_thumbnails/',
        blank=True,
        null=True,
        validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])]
    )
    teacher = models.ForeignKey(
        'register',  # Replace with your actual user model
        on_delete=models.CASCADE,
        related_name='courses'
    )

    def __str__(self):
        return self.title

class Module(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=150)
    description = models.TextField()
    video_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.title} ({self.course.title})"


from django.db import models

class Enrollment(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)

    course = models.ForeignKey('Course', on_delete=models.CASCADE, related_name='enrollments')
    
    # Make sure 'register' is the correct model name or import it properly
    teacher = models.ForeignKey('register', on_delete=models.CASCADE, related_name='teacher_enrollments')
    student = models.ForeignKey('register', on_delete=models.CASCADE, related_name='student_enrollments', default=1)

    def __str__(self):
        return f"{self.full_name} - {self.course.title}"
