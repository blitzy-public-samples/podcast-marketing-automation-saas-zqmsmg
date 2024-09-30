from django.urls import path
from .views import (
    PodcastAnalyticsView,
    EpisodeAnalyticsView,
    MarketingAnalyticsView,
    AnalyticsDashboardView
)

urlpatterns = [
    path('podcasts/<int:podcast_id>/', PodcastAnalyticsView.as_view(), name='podcast_analytics'),
    path('episodes/<int:episode_id>/', EpisodeAnalyticsView.as_view(), name='episode_analytics'),
    path('marketing/<int:episode_id>/<str:platform>/', MarketingAnalyticsView.as_view(), name='marketing_analytics'),
    path('dashboard/', AnalyticsDashboardView.as_view(), name='analytics_dashboard'),
]

# TODO: Add URL patterns for data visualization endpoints once implemented
# TODO: Implement URL patterns for filtered analytics data with date range