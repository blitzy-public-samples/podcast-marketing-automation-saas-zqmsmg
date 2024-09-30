from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EpisodeViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'episodes', EpisodeViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

app_name = 'episodes'

# Human tasks:
# TODO: Ensure that the URL patterns align with the API design and follow RESTful principles
# TODO: Verify that all custom actions in EpisodeViewSet are properly routed