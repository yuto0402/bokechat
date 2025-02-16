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

class CreaterSerializer(serializers.ModelSerializer):

  class Meta:
    model = CustomUser
    fields = ['id', 'username', 'icon']


class PostSerializer(serializers.ModelSerializer):
  created_by = CreaterSerializer()

  class Meta:
    model = Post
    fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    exclude = ['created_by']

class PlanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Plan
    fields = '__all__'

class GroupsSerializer(serializers.ModelSerializer):
  host = CreaterSerializer()
  tags = TagSerializer(many=True)

  class Meta:
    model = Group
    fields = ['uuid', 'host', 'tags', 'name', 'start', 'end', 'budget', 'icon']

class GroupSerializer(serializers.ModelSerializer):
  host = CreaterSerializer()
  tags = TagSerializer(many=True)
  participants = CreaterSerializer(many=True)
  plans = PlanSerializer(many=True)

  class Meta:
    model = Group
    exclude = ['favorite']
