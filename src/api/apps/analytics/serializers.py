from rest_framework import serializers
from apps.analytics.models import PodcastAnalytics, EpisodeAnalytics, MarketingAnalytics

class PodcastAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastAnalytics
        fields = ['podcast', 'total_listens', 'total_subscribers', 'average_listen_duration', 'listener_demographics', 'last_updated']

class EpisodeAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EpisodeAnalytics
        fields = ['episode', 'listens', 'average_listen_duration', 'unique_listeners', 'listener_retention', 'geographic_data', 'last_updated']

class MarketingAnalyticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingAnalytics
        fields = ['episode', 'platform', 'impressions', 'clicks', 'likes', 'shares', 'engagement_rate', 'last_updated']

# TODO: Implement custom validation for JSON fields (listener_demographics, listener_retention, geographic_data)
# TODO: Add methods for calculating derived fields or aggregations if needed
# TODO: Implement serializer methods for handling nested relationships if required
# TODO: Add any necessary permissions or authentication checks for sensitive analytics data