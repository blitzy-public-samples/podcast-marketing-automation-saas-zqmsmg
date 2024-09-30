from django.db import models
from django.utils import timezone

# Assuming Podcast and Episode models are defined in their respective apps
from apps.podcasts.models import Podcast
from apps.episodes.models import Episode

class PodcastAnalytics(models.Model):
    """
    Model representing analytics data for a podcast.
    """
    podcast = models.OneToOneField(Podcast, on_delete=models.CASCADE, related_name='analytics')
    total_listens = models.IntegerField(default=0)
    total_subscribers = models.IntegerField(default=0)
    average_listen_duration = models.FloatField(default=0.0)
    listener_demographics = models.JSONField(default=dict)
    last_updated = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Analytics for {self.podcast.title}"

    def update_analytics(self, new_data):
        """
        Updates the analytics data for the podcast.
        """
        self.total_listens = new_data.get('total_listens', self.total_listens)
        self.total_subscribers = new_data.get('total_subscribers', self.total_subscribers)
        self.average_listen_duration = new_data.get('average_listen_duration', self.average_listen_duration)
        self.listener_demographics.update(new_data.get('listener_demographics', {}))
        self.last_updated = timezone.now()
        self.save()

class EpisodeAnalytics(models.Model):
    """
    Model representing analytics data for a specific episode.
    """
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='analytics')
    listens = models.IntegerField(default=0)
    average_listen_duration = models.FloatField(default=0.0)
    unique_listeners = models.IntegerField(default=0)
    listener_retention = models.JSONField(default=dict)
    geographic_data = models.JSONField(default=dict)
    last_updated = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Analytics for {self.episode.title}"

    def update_analytics(self, new_data):
        """
        Updates the analytics data for the episode.
        """
        self.listens = new_data.get('listens', self.listens)
        self.average_listen_duration = new_data.get('average_listen_duration', self.average_listen_duration)
        self.unique_listeners = new_data.get('unique_listeners', self.unique_listeners)
        self.listener_retention.update(new_data.get('listener_retention', {}))
        self.geographic_data.update(new_data.get('geographic_data', {}))
        self.last_updated = timezone.now()
        self.save()

class MarketingAnalytics(models.Model):
    """
    Model representing analytics data for marketing content and social media posts.
    """
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='marketing_analytics')
    platform = models.CharField(max_length=50)
    impressions = models.IntegerField(default=0)
    clicks = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    engagement_rate = models.FloatField(default=0.0)
    last_updated = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Marketing Analytics for {self.episode.title} on {self.platform}"

    def update_analytics(self, new_data):
        """
        Updates the marketing analytics data.
        """
        self.impressions = new_data.get('impressions', self.impressions)
        self.clicks = new_data.get('clicks', self.clicks)
        self.likes = new_data.get('likes', self.likes)
        self.shares = new_data.get('shares', self.shares)
        self.calculate_engagement_rate()
        self.last_updated = timezone.now()
        self.save()

    def calculate_engagement_rate(self):
        """
        Calculates and updates the engagement rate.
        """
        if self.impressions > 0:
            self.engagement_rate = ((self.clicks + self.likes + self.shares) / self.impressions) * 100
        else:
            self.engagement_rate = 0.0

# Human tasks (commented out as requested in the file)
"""
Human tasks:
1. Determine if additional analytics metrics are required for the platform
2. Decide on the specific structure for JSON fields (listener_demographics, listener_retention, geographic_data)
3. Implement data aggregation methods for generating reports
4. Set up periodic tasks to update analytics data
"""