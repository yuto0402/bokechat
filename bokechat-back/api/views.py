from django.shortcuts import render

# Create your views here.
from . import *
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .serializers import *
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class UserSignup(APIView):
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response({"message": "アホ氏ね"}, status=status.HTTP_201_CREATED)

class UserView(APIView):
  permission_class = [IsAuthenticated]

  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

