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
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class PostPagination(PageNumberPagination):
  page_size = 10
  page_size_query_param = 'page_size'
  max_page_size = 100

  def get_paginated_response(self, data):
    next_page = self.page.next_page_number() if self.page.has_next() else None
    prev_page = self.page.previous_page_number() if self.page.has_previous() else None

    return Response({
      "count": self.page.paginator.count,
      "next": next_page,
      "previous": prev_page,
      "results": data
    })

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

class PostView(APIView):
  def get(self, request, *args, **kwargs):
    posts = Post.objects.select_related('created_by').all().order_by('-created_at')
    paginator = PostPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)

class GroupsView(APIView):
  def get(self, request, *args, **kwargs):
    groups = Group.objects.select_related('host').prefetch_related('tags').all()
    paginator = PostPagination()
    result_page = paginator.paginate_queryset(groups, request)
    serializer = GroupsSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)

class GroupView(APIView):
  def get(self, request, pk, format=None):
    try:
        group = Group.objects.select_related('host').prefetch_related('tags').prefetch_related('participants').prefetch_related('plans').get(pk=pk)
    except Group.DoesNotExist:
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = GroupSerializer(group, context={"request": request})
    return Response(serializer.data)
