from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Party(models.Model):
    name = models.CharField(max_length=69)
    anon_gold = models.BigIntegerField(default=0)
    anon_silver = models.BigIntegerField(default=0)
    anon_copper = models.BigIntegerField(default=0)
    master = models.ForeignKey(
        User,
        related_name="partys",
        on_delete=models.CASCADE,
        null=False,
    )
