# Generated by Django 4.0.3 on 2022-04-13 14:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gold_tracker_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='party',
            name='master',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='partys', to=settings.AUTH_USER_MODEL),
        ),
    ]
