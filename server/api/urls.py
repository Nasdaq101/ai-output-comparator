"""
API URL Configuration
"""
from django.urls import path
from . import views

urlpatterns = [
    # health check - for testing purposes
    path('health', views.health_check, name='health'),
    
    # AI endpoints
    path('groq', views.groq_view, name='groq'),
    path('gemini', views.gemini_view, name='gemini'),
    path('compare', views.compare_view, name='compare'),
    
    # auth endpoints
    path('auth/register', views.register_view, name='register'),
    path('auth/login', views.login_view, name='login'),
    path('auth/user', views.get_user_view, name='get_user'),
    
    # history endpoint
    path('history', views.history_view, name='history'),
    
    # profile endpoints
    path('profile', views.profile_view, name='profile'),
    path('profile/update', views.update_profile_view, name='update_profile'),
]

