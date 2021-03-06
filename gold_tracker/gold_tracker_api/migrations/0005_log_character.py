# Generated by Django 4.0.3 on 2022-05-20 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gold_tracker_api', '0004_alter_party_master'),
    ]

    operations = [
        migrations.CreateModel(
            name='Log',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('entry', models.TextField()),
                ('time_created', models.TimeField()),
                ('party_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='party_log', to='gold_tracker_api.party')),
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=69)),
                ('personal_gold', models.BigIntegerField(default=0)),
                ('personal_silver', models.BigIntegerField(default=0)),
                ('personal_copper', models.BigIntegerField(default=0)),
                ('party_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='party_characters', to='gold_tracker_api.party')),
            ],
        ),
    ]
