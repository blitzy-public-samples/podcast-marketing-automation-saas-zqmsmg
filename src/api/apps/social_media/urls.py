from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SocialMediaPlatformViewSet, SocialMediaPostViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'platforms', SocialMediaPlatformViewSet)
router.register(r'posts', SocialMediaPostViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

# Set the app name for namespacing
app_name = 'social_media'

# Human tasks:
# TODO: Review URL patterns to ensure they follow RESTful conventions
# TODO (Optional): Add any custom URL patterns for additional views or actions not covered by the router
# TODO (Optional): Implement versioning in the URL structure if API versioning is required