# Generated by Django 3.1.2 on 2022-08-24 13:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Hosting', '0002_auto_20220824_1955'),
        ('QAForum', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionProperty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
                ('questionID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='QAForum.question')),
            ],
        ),
    ]
