from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    PLAN_CHOICES = [("Free", "free"), ("Pro", "pro"), ("Premium", "premium")]
    plan_type = models.CharField(max_length=10, choices=PLAN_CHOICES, default="free")
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
