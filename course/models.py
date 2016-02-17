from django.db import models

# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=30)
    purpose = models.CharField(max_length=140)
    techerId = models.IntegerField(default=-1)
    techerNumber = models.CharField(max_length=30)
    techerName = models.CharField(max_length=30)

    def __unicode__(self):
        return self.name


class Question(models.Model):
    name = models.CharField(max_length=30)
    content = models.CharField(max_length=200)
    answerA = models.CharField(max_length=50)
    answerB = models.CharField(max_length=50)
    answerC = models.CharField(max_length=50)
    answerD = models.CharField(max_length=50)
    rightAnswer = models.CharField(max_length=30)
    point = models.IntegerField(default=0)
    courseId = models.IntegerField(default=-1)
    courseName = models.CharField(max_length=30)

    def __unicode__(self):
        return self.name


class Grade(models.Model):
    point = models.IntegerField(default=0)
    courseId = models.IntegerField(default=-1)
    courseName = models.CharField(max_length=30)
    techerId = models.IntegerField(default=-1)
    techerNumber = models.CharField(max_length=30)
    techerName = models.CharField(max_length=30)
    time = models.CharField(max_length=200)

    def __unicode__(self):
        return self.name


class Resource(models.Model):
    content = models.CharField(max_length=200)
    url = models.CharField(max_length=200)
    courseId = models.IntegerField(default=-1)
    courseName = models.CharField(max_length=30)

    def __unicode__(self):
        return self.name


