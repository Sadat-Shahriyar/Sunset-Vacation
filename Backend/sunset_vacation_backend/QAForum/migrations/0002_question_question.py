# Generated by Django 4.0.5 on 2022-08-13 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('QAForum', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='question',
            field=models.CharField(default=None, max_length=500, null=True),
        ),
    ]