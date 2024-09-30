from django.urls import path
from .views import (
    SocialMediaPostListCreateView,
    SocialMediaPostRetrieveUpdateDestroyView,
    SocialMediaPostScheduleView,
    SocialMediaPostEngagementView
)

app_name = "social_media"

urlpatterns = [
    path("posts/", SocialMediaPostListCreateView.as_view(), name="post-list-create"),
    path("posts/<int:pk>/", SocialMediaPostRetrieveUpdateDestroyView.as_view(), name="post-detail"),
    path("posts/<int:pk>/schedule/", SocialMediaPostScheduleView.as_view(), name="post-schedule"),
    path("posts/<int:pk>/engagement/", SocialMediaPostEngagementView.as_view(), name="post-engagement"),
]

# Human Tasks:
# TODO: Review URL patterns to ensure they follow RESTful conventions
# TODO: Consider adding versioning to the API endpoints (e.g., /api/v1/social-media/...)
# TODO: Implement URL patterns for any additional features or endpoints that may be needed in the future