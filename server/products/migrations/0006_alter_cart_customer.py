# Generated by Django 3.2.2 on 2021-05-10 05:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0005_alter_product_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='customer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
