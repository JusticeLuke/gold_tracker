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


class Character(models.Model):
    name = models.CharField(max_length=69)
    personal_gold = models.BigIntegerField(default=0)
    personal_silver = models.BigIntegerField(default=0)
    personal_copper = models.BigIntegerField(default=0)
    tribute_gold = models.BigIntegerField(default=0)
    tribute_silver = models.BigIntegerField(default=0)
    tribute_copper = models.BigIntegerField(default=0)
    party_id = models.ForeignKey(
        Party,
        related_name="party_characters",
        on_delete=models.CASCADE,
        null=False,
    )


class Log(models.Model):
    name = models.CharField(max_length=69, null=True)
    gold = models.BigIntegerField(default=0)
    silver = models.BigIntegerField(default=0)
    copper = models.BigIntegerField(default=0)
    entry = models.TextField()
    time_created = models.TimeField()
    party_id = models.ForeignKey(
        Party,
        related_name="party_log",
        on_delete=models.CASCADE,
        null=False,
    )
