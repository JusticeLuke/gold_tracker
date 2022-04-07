from django.db import models

# Create your models here.
class Party(models.Model):
    name = models.CharField(max_length=69)
    anon_gold = models.BigIntegerField()
