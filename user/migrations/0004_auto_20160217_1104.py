# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-17 03:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_stu_tech'),
    ]

    operations = [
        migrations.AddField(
            model_name='stu',
            name='techerId',
            field=models.IntegerField(default=-1),
        ),
        migrations.AddField(
            model_name='stu',
            name='techerName',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stu',
            name='techerNumber',
            field=models.CharField(default='', max_length=30),
            preserve_default=False,
        ),
    ]
