# Generated by Django 4.0.1 on 2022-08-26 04:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hosting', '0004_alter_messaging_message'),
    ]

    operations = [
        migrations.AlterField(
            model_name='messaging',
            name='time',
            field=models.DateTimeField(blank=True, default=datetime.datetime.now, null=True),
        ),
    ]
