from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EpisodeViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'episodes', EpisodeViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]

# Human tasks:
# TODO: Review and adjust URL patterns if any custom endpoints are needed beyond the default router
# TODO: Ensure proper namespacing is used if required by the project structure
# TODO: Add any necessary middleware for request/response processing specific to episode endpoints