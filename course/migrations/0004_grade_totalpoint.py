# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0003_auto_20160218_1801'),
    ]

    operations = [
        migrations.AddField(
            model_name='grade',
            name='totalPoint',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
