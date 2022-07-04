# Generated by Django 3.1.2 on 2022-07-04 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(default=None, max_length=200, null=True)),
                ('email', models.EmailField(default=None, max_length=50, null=True, unique=True)),
                ('phone_no', models.CharField(default=None, max_length=20, null=True)),
                ('password', models.CharField(default=None, max_length=500, null=True)),
                ('address', models.CharField(default=None, max_length=200, null=True)),
                ('country', models.CharField(default=None, max_length=20, null=True)),
                ('city', models.CharField(default=None, max_length=20, null=True)),
                ('last_login', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
