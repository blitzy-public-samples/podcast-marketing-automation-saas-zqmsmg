"""
Django URL configuration for the Podcast Marketing Automation SaaS platform backend.

This file defines the URL patterns for the entire Django application, including API endpoints
and admin interface. It serves as the main routing configuration for the backend.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# Define the main URL patterns for the application
urlpatterns = [
    # Django admin interface
    path('admin/', admin.site.urls),

    # API endpoints for different app functionalities
    path('api/auth/', include('apps.authentication.urls')),
    path('api/podcasts/', include('apps.podcasts.urls')),
    path('api/episodes/', include('apps.episodes.urls')),
    path('api/transcripts/', include('apps.transcripts.urls')),
    path('api/marketing/', include('apps.marketing.urls')),
    path('api/social-media/', include('apps.social_media.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# TODO: Implement API versioning if required
# Example of versioned API:
# path('api/v1/', include('api.v1.urls')),

# TODO: Set up proper URL patterns for serving static and media files in production
# This should be handled by your web server (e.g., Nginx) in a production environment

# TODO: Review and ensure all necessary API endpoints are included
# Add any missing endpoints or remove unused ones as needed