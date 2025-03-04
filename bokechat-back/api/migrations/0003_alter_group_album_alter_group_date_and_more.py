# Generated by Django 5.1.6 on 2025-02-15 13:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_group_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='album',
            field=models.ImageField(blank=True, null=True, upload_to='group/'),
        ),
        migrations.AlterField(
            model_name='group',
            name='date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='group',
            name='favorite',
            field=models.ManyToManyField(blank=True, null=True, related_name='group_favorite', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='group',
            name='participants',
            field=models.ManyToManyField(blank=True, null=True, related_name='group', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='like',
            field=models.ManyToManyField(blank=True, null=True, related_name='movie_like', to=settings.AUTH_USER_MODEL),
        ),
    ]
