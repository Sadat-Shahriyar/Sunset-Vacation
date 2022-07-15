# Generated by Django 4.0.1 on 2022-07-15 03:10

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
            name='Catagory',
            fields=[
                ('catagory_id', models.AutoField(primary_key=True, serialize=False)),
                ('description', models.CharField(default=None, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Facility',
            fields=[
                ('facility_name', models.CharField(default=None, max_length=100, primary_key=True, serialize=False)),
                ('catagory', models.CharField(default=None, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GiftCard',
            fields=[
                ('giftcard_id', models.AutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(default=None, max_length=100, null=True)),
                ('discount', models.FloatField(default=None, null=True)),
                ('expiry_date', models.DateTimeField(default=None, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Property',
            fields=[
                ('propertyID', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(default=None, max_length=100, null=True)),
                ('catagory', models.CharField(default=None, max_length=100, null=True)),
                ('description', models.CharField(default=None, max_length=500, null=True)),
                ('perNightCost', models.FloatField(default=None, null=True)),
                ('checkInTime', models.DateTimeField(default=None, null=True)),
                ('checkOutTime', models.DateTimeField(default=None, null=True)),
                ('maxDaysRefund', models.IntegerField(default=None, null=True)),
                ('noOfGuests', models.IntegerField(default=None, null=True)),
                ('noOfBeds', models.IntegerField(default=None, null=True)),
                ('noOfBedrooms', models.IntegerField(default=1, null=True)),
                ('noOfBathrooms', models.IntegerField(default=None, null=True)),
                ('address', models.CharField(default=None, max_length=500, null=True)),
                ('conciseType', models.CharField(default=None, max_length=500, null=True)),
                ('entirePrivateOrShared', models.CharField(default=None, max_length=500, null=True)),
                ('latitude', models.CharField(default=None, max_length=500, null=True)),
                ('longitude', models.CharField(default=None, max_length=500, null=True)),
                ('published', models.BooleanField(default=False)),
                ('owner_id', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PropertyPhotoUploadHelper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='property')),
            ],
        ),
        migrations.CreateModel(
            name='UserGiftCardList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('used_flag', models.BooleanField(default=False)),
                ('giftcard_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.giftcard')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review', models.CharField(default=None, max_length=100, null=True)),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Ratings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.FloatField(default=None, null=True)),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PropertyPhotos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo_url', models.CharField(default=None, max_length=500, null=True)),
                ('property_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
        migrations.CreateModel(
            name='PropertyFacilities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(default=None, max_length=100, null=True)),
                ('facility_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.facility')),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('offer_id', models.AutoField(primary_key=True, serialize=False)),
                ('startDate', models.DateTimeField(default=None)),
                ('endDate', models.DateTimeField(default=None)),
                ('amount', models.FloatField(default=None)),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(default=None, max_length=100, null=True)),
                ('link', models.CharField(default=None, max_length=100, null=True)),
                ('time', models.DateTimeField(default=None, null=True)),
                ('marked', models.BooleanField(default=False)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Messaging',
            fields=[
                ('msg_id', models.AutoField(primary_key=True, serialize=False)),
                ('message', models.CharField(default=None, max_length=100, null=True)),
                ('time', models.DateTimeField(default=None, null=True)),
                ('receiver_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to=settings.AUTH_USER_MODEL)),
                ('sender_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='House_Rules',
            fields=[
                ('rule_id', models.AutoField(primary_key=True, serialize=False)),
                ('do_dont_flag', models.IntegerField(default=None, null=True)),
                ('rule', models.CharField(default=None, max_length=100, null=True)),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
        migrations.AddField(
            model_name='giftcard',
            name='propertyID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property'),
        ),
        migrations.CreateModel(
            name='FAQ',
            fields=[
                ('faq_id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(default=None, max_length=100, null=True)),
                ('answer', models.CharField(default=None, max_length=100, null=True)),
                ('propertyID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Hosting.property')),
            ],
        ),
    ]
