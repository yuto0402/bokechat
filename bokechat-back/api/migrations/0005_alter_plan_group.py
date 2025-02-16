# Generated by Django 5.1.6 on 2025-02-16 06:05

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_group_icon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plan',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='plans', to='api.group'),
        ),
    ]
