from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = '__all__'
    extra_kwargs = {'password':{'write_only': True}}

  def create(self, validated_data):
    user = CustomUser.objects.create_user(**validated_data)
    return user

class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = '__all__'
