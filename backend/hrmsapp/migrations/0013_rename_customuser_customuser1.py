# Generated by Django 5.1.2 on 2024-10-22 22:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('hrmsapp', '0012_alter_customuser_groups_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CustomUser',
            new_name='CustomUser1',
        ),
    ]