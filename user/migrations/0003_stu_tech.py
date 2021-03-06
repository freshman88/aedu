# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-16 07:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_auto_20160215_0244'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=30)),
                ('sex', models.CharField(max_length=10)),
                ('age', models.IntegerField()),
                ('register', models.CharField(max_length=50)),
                ('baseUnit', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Tech',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=30)),
                ('sex', models.CharField(max_length=10)),
                ('age', models.IntegerField()),
                ('techAge', models.IntegerField()),
                ('baseUnit', models.CharField(max_length=100)),
            ],
        ),
    ]
