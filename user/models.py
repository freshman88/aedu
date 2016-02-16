from django.db import models

# Create your models here.
class Admin(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name
    

class Tech(models.Model):
    number = models.CharField(max_length=30)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=30)
    sex = models.CharField(max_length=10)
    age = models.IntegerField()
    techAge = models.IntegerField()
    baseUnit = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name



class Stu(models.Model):
    number = models.CharField(max_length=30)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=30)
    sex = models.CharField(max_length=10)
    age = models.IntegerField()
    register = models.CharField(max_length=50)
    baseUnit = models.CharField(max_length=100)

    def __unicode__(self):
        return self.name



# class Techer_Stu(models.Model):
#     None