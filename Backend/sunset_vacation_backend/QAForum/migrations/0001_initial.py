# Generated by Django 3.1.2 on 2022-08-13 08:23

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tags',
            fields=[
                ('tag_name', models.CharField(default=None, max_length=100, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('questions_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(default=None, max_length=500, null=True)),
                ('question_date', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('tag_ids', models.CharField(default=None, max_length=500, null=True)),
                ('questionair_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('answer_id', models.AutoField(primary_key=True, serialize=False)),
                ('answer', models.CharField(default=None, max_length=500, null=True)),
                ('answer_time', models.DateTimeField(blank=True, default=datetime.datetime.now, null=True)),
                ('answerer_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='QAForum.question')),
            ],
        ),
    ]
