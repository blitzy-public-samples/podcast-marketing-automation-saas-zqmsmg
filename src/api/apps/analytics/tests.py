from django.test import TestCase
from django.utils import timezone
from apps.analytics.models import PodcastAnalytics, EpisodeAnalytics, MarketingAnalytics
from apps.podcasts.models import Podcast
from apps.episodes.models import Episode
import json

class PodcastAnalyticsTestCase(TestCase):
    def setUp(self):
        # Create a test podcast
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="A test podcast for analytics"
        )
        self.podcast_analytics = PodcastAnalytics.objects.create(podcast=self.podcast)

    def test_podcast_analytics_creation(self):
        """Test the creation of a PodcastAnalytics instance"""
        self.assertIsNotNone(self.podcast_analytics)
        self.assertEqual(self.podcast_analytics.podcast, self.podcast)
        self.assertEqual(self.podcast_analytics.total_listens, 0)
        self.assertEqual(self.podcast_analytics.total_subscribers, 0)
        self.assertEqual(self.podcast_analytics.average_listen_duration, 0)
        self.assertIsNotNone(self.podcast_analytics.last_updated)

    def test_update_analytics(self):
        """Test the update_analytics method of PodcastAnalytics"""
        new_data = {
            'total_listens': 1000,
            'total_subscribers': 500,
            'average_listen_duration': 1800,  # 30 minutes in seconds
        }
        self.podcast_analytics.update_analytics(new_data)

        # Refresh from database
        self.podcast_analytics.refresh_from_db()

        self.assertEqual(self.podcast_analytics.total_listens, 1000)
        self.assertEqual(self.podcast_analytics.total_subscribers, 500)
        self.assertEqual(self.podcast_analytics.average_listen_duration, 1800)
        self.assertLess(self.podcast_analytics.last_updated, timezone.now())

class EpisodeAnalyticsTestCase(TestCase):
    def setUp(self):
        # Create a test podcast and episode
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="A test podcast for analytics"
        )
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="A test episode for analytics"
        )
        self.episode_analytics = EpisodeAnalytics.objects.create(episode=self.episode)

    def test_episode_analytics_creation(self):
        """Test the creation of an EpisodeAnalytics instance"""
        self.assertIsNotNone(self.episode_analytics)
        self.assertEqual(self.episode_analytics.episode, self.episode)
        self.assertEqual(self.episode_analytics.listens, 0)
        self.assertEqual(self.episode_analytics.likes, 0)
        self.assertEqual(self.episode_analytics.shares, 0)
        self.assertEqual(self.episode_analytics.average_listen_duration, 0)
        self.assertIsNotNone(self.episode_analytics.last_updated)

    def test_update_analytics(self):
        """Test the update_analytics method of EpisodeAnalytics"""
        new_data = {
            'listens': 500,
            'likes': 100,
            'shares': 50,
            'average_listen_duration': 1200,  # 20 minutes in seconds
        }
        self.episode_analytics.update_analytics(new_data)

        # Refresh from database
        self.episode_analytics.refresh_from_db()

        self.assertEqual(self.episode_analytics.listens, 500)
        self.assertEqual(self.episode_analytics.likes, 100)
        self.assertEqual(self.episode_analytics.shares, 50)
        self.assertEqual(self.episode_analytics.average_listen_duration, 1200)
        self.assertLess(self.episode_analytics.last_updated, timezone.now())

class MarketingAnalyticsTestCase(TestCase):
    def setUp(self):
        # Create a test podcast and episode
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="A test podcast for analytics"
        )
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="A test episode for analytics"
        )
        self.marketing_analytics = MarketingAnalytics.objects.create(episode=self.episode)

    def test_marketing_analytics_creation(self):
        """Test the creation of a MarketingAnalytics instance"""
        self.assertIsNotNone(self.marketing_analytics)
        self.assertEqual(self.marketing_analytics.episode, self.episode)
        self.assertEqual(self.marketing_analytics.impressions, 0)
        self.assertEqual(self.marketing_analytics.clicks, 0)
        self.assertEqual(self.marketing_analytics.conversions, 0)
        self.assertEqual(self.marketing_analytics.engagement_rate, 0)
        self.assertIsNotNone(self.marketing_analytics.last_updated)

    def test_update_analytics(self):
        """Test the update_analytics method of MarketingAnalytics"""
        new_data = {
            'impressions': 1000,
            'clicks': 200,
            'conversions': 50,
        }
        self.marketing_analytics.update_analytics(new_data)

        # Refresh from database
        self.marketing_analytics.refresh_from_db()

        self.assertEqual(self.marketing_analytics.impressions, 1000)
        self.assertEqual(self.marketing_analytics.clicks, 200)
        self.assertEqual(self.marketing_analytics.conversions, 50)
        self.assertEqual(self.marketing_analytics.engagement_rate, 0.2)  # (200 clicks / 1000 impressions)
        self.assertLess(self.marketing_analytics.last_updated, timezone.now())

    def test_engagement_rate_calculation(self):
        """Test that the engagement_rate is calculated correctly"""
        new_data = {
            'impressions': 2000,
            'clicks': 300,
            'conversions': 75,
        }
        self.marketing_analytics.update_analytics(new_data)

        # Refresh from database
        self.marketing_analytics.refresh_from_db()

        expected_engagement_rate = 300 / 2000  # clicks / impressions
        self.assertAlmostEqual(self.marketing_analytics.engagement_rate, expected_engagement_rate, places=4)

# Commented list of human tasks
"""
Human tasks:
1. Implement additional test cases for edge cases and error handling (Required)
2. Add integration tests to check the interaction between different analytics models (Required)
3. Create test fixtures for more complex scenarios (Optional)
4. Implement performance tests for analytics data updates (Optional)
"""