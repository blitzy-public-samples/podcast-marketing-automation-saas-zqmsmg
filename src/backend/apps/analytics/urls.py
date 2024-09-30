from django.urls import path
from .views import AnalyticsList, AnalyticsDetail, EpisodeAnalyticsSummary

app_name = "analytics"

urlpatterns = [
    path('', AnalyticsList.as_view(), name='list'),
    path('<int:pk>/', AnalyticsDetail.as_view(), name='detail'),
    path('episode/<int:pk>/summary/', EpisodeAnalyticsSummary.as_view(), name='episode_summary'),
]

# Human Tasks:
# TODO: Consider adding URL patterns for more advanced analytics views as they are implemented
# TODO: Ensure that URL patterns align with API versioning strategy if implemented