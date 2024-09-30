from django.urls import path
from .views import PodcastListCreateView, PodcastRetrieveUpdateDestroyView

app_name = "podcasts"

urlpatterns = [
    path("", PodcastListCreateView.as_view(), name="podcast-list-create"),
    path("<int:pk>/", PodcastRetrieveUpdateDestroyView.as_view(), name="podcast-detail"),
]

# Human Tasks:
# TODO: Review and adjust URL patterns if additional endpoints are needed (Optional)
# TODO: Ensure URL naming conventions are consistent with the rest of the project (Required)
# TODO: Consider adding versioning to the API URLs if not handled at a higher level (Optional)