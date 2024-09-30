from django.urls import path
from apps.transcripts.views import (
    TranscriptListCreateView,
    TranscriptDetailView,
    TranscriptGenerateView,
    TranscriptDownloadView
)

app_name = 'transcripts'

urlpatterns = [
    path('', TranscriptListCreateView.as_view(), name='transcript-list-create'),
    path('<int:pk>/', TranscriptDetailView.as_view(), name='transcript-detail'),
    path('generate/<int:episode_id>/', TranscriptGenerateView.as_view(), name='transcript-generate'),
    path('<int:pk>/download/', TranscriptDownloadView.as_view(), name='transcript-download'),
]

# Human Tasks:
# TODO: Review URL patterns to ensure they follow RESTful conventions
# TODO (Optional): Add any additional URL patterns for future transcript-related features
# TODO (Optional): Consider adding URL patterns for transcript search or filtering