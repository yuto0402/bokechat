from rest_framework import serializers
from .models import *

class ScheduleSerializer(serializers.ModelSerializer):

  class Meta:
    model = Schedule
    fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
  mySchedule = serializers.SerializerMethodField()

  class Meta:
    model = CustomUser
    fields = '__all__'
    extra_kwargs = {'password':{'write_only': True}}

  def get_mySchedule(self, obj):
    schedules = obj.schedule.all().order_by('start')
    return ScheduleSerializer(schedules, many=True).data


  def create(self, validated_data):
    user = CustomUser.objects.create_user(**validated_data)
    return user

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = '__all__'
