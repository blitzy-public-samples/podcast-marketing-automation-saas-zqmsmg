from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TranscriptViewSet

router = DefaultRouter()
router.register(r'transcripts', TranscriptViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

# Human Tasks:
# TODO: Review and update URL patterns if any custom actions are added to the TranscriptViewSet
# TODO: Consider adding versioning to the API endpoints