"""
URL configuration for AI Comparator project.
"""
from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
]

