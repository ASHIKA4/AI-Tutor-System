from django.db import models

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

from django.db import models

class Enrollment(models.Model):
    STATUS_CHOICES = [
        ('Not Completed', 'Not Completed'),
        ('Completed', 'Completed'),
        ('In Progress', 'In Progress'),
    ]

    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile = models.CharField(max_length=15)

    # MySQL requires short default values that fit max_length
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Not Completed'  # Make sure this matches one of the choices and max_length
    )

    course = models.ForeignKey(
        'Course',
        on_delete=models.CASCADE,
        related_name='enrollments'
    )

    teacher = models.ForeignKey(
        'Register',
        on_delete=models.CASCADE,
        related_name='teacher_enrollments'
    )

    student = models.ForeignKey(
        'Register',
        on_delete=models.CASCADE,
        related_name='student_enrollments'
    )

    def __str__(self):
        return f"{self.full_name} - {self.course.title}"




from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Quiz(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(
        'Course',
        on_delete=models.CASCADE,
        related_name='quizzes'
    )
    teacher = models.ForeignKey(
        'register',
        on_delete=models.CASCADE,
        related_name='quizzes'
    )
    time_limit = models.PositiveIntegerField(help_text="Time limit in minutes")
    passing_score = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        help_text="Percentage required to pass"
    )
    max_attempts = models.PositiveIntegerField(default=1)
    instructions = models.TextField(blank=True)
    is_published = models.BooleanField(default=False)
    randomize_questions = models.BooleanField(default=True)
    show_results = models.BooleanField(default=True)
    show_answers = models.BooleanField(default=False)
    enforce_time_limit = models.BooleanField(default=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Question(models.Model):
    QUESTION_TYPES = [
        ('multiple-choice', 'Multiple Choice'),
        ('true-false', 'True/False'),
        ('short-answer', 'Short Answer'),
        ('essay', 'Essay'),
    ]

    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name='questions'
    )
    type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    text = models.TextField()
    points = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.text[:50]}..." if len(self.text) > 50 else self.text

class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='options'
    )
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text