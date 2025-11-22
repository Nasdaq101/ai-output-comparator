"""
API URL Configuration
"""
from django.urls import path
from . import views

urlpatterns = [
    path('health', views.health_check, name='health'),
    path('groq', views.groq_view, name='groq'),
    path('gemini', views.gemini_view, name='gemini'),
    path('compare', views.compare_view, name='compare'),
]

