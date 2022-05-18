# Generated by Django 4.0.3 on 2022-05-16 21:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gold_tracker_api', '0003_party_anon_copper_party_anon_silver_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='party',
            name='master',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='partys', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]