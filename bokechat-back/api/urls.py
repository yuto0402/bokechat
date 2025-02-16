from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', UserSignup.as_view(), name='user-signup'),
    path('user-info/', UserView.as_view(), name='user_info'),
    path('posts/', PostView.as_view(), name='posts'),
    path('groups/', GroupsView.as_view(), name='groups'),
    path('group/<uuid:pk>/', GroupView.as_view(), name='group'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
