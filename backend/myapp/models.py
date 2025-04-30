from django.contrib.auth.models import AbstractUser
from django.db import models

# Custom user model
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    groups = models.ManyToManyField(
        "auth.Group", related_name="customuser_groups", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="customuser_permissions", blank=True
    )

    def __str__(self):
        return self.username

# About model
class about(models.Model):
    name = models.CharField(max_length=100)
    details = models.TextField()

    def __str__(self):
        return self.name




