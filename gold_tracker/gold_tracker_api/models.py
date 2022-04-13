from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Party(models.Model):
    name = models.CharField(max_length=69)
    anon_gold = models.BigIntegerField()
    master = models.ForeignKey(
        User, related_name="partys", on_delete=models.CASCADE, null=True
    )
