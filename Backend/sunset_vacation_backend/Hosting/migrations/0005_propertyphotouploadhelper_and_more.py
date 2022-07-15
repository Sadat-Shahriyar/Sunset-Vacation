# Generated by Django 4.0.5 on 2022-07-14 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hosting', '0004_alter_propertyphotos_photo_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='PropertyPhotoUploadHelper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='property')),
            ],
        ),
        migrations.AlterField(
            model_name='propertyphotos',
            name='photo_url',
            field=models.CharField(default=None, max_length=500, null=True),
        ),
    ]
