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

class MessageSerializer(serializers.ModelSerializer):
  sender = CreaterSerializer()

  class Meta:
    model = Message
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
  isParticipant = serializers.SerializerMethodField()
  lastMessage = serializers.SerializerMethodField()

  class Meta:
    model = Group
    exclude = ['favorite']

  def update(self, instance, validated_data):
    user = self.context.get('request').user
    if instance.is_participant(user):
        instance.participants.remove(user)
        instance.save()
    else:
        instance.participants.add(user)

    return super().update(instance, validated_data)

  def get_lastMessage(self, instance):
    if instance.messages.exists():
        message = instance.messages.all().order_by('-created_at').first()
        return MessageSerializer(message).data
    return None

  def get_isParticipant(self, instance):
    user = self.context.get('request').user
    return instance.is_participant(user)

  def to_representation(self, instance):
    representation = super().to_representation(instance)
    user = self.context.get('request').user

    if not instance.is_participant(user):
        for field in ['album', 'messages']:
            representation.pop(field, None)
    return representation
