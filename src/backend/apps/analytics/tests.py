from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from apps.analytics.models import Analytics
from apps.episodes.models import Episode
from apps.podcasts.models import Podcast

class AnalyticsModelTests(TestCase):
    def setUp(self):
        # Set up test data
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.podcast = Podcast.objects.create(user=self.user, title='Test Podcast')
        self.episode = Episode.objects.create(podcast=self.podcast, title='Test Episode')
        self.analytics = Analytics.objects.create(
            episode=self.episode,
            downloads=100,
            likes=50,
            shares=25,
            comments=10
        )

    def test_analytics_creation(self):
        # Test creating an analytics entry
        self.assertIsInstance(self.analytics, Analytics)
        self.assertEqual(self.analytics.episode, self.episode)
        self.assertEqual(self.analytics.downloads, 100)
        self.assertEqual(self.analytics.likes, 50)
        self.assertEqual(self.analytics.shares, 25)
        self.assertEqual(self.analytics.comments, 10)
        
        # Check that the string representation of the analytics entry is correct
        expected_str = f"Analytics for {self.episode.title}"
        self.assertEqual(str(self.analytics), expected_str)

    def test_get_total_engagement(self):
        # Test the get_total_engagement method
        total_engagement = self.analytics.get_total_engagement()
        expected_engagement = self.analytics.likes + self.analytics.shares + self.analytics.comments
        self.assertEqual(total_engagement, expected_engagement)

class AnalyticsAPITests(TestCase):
    def setUp(self):
        # Set up test data and API client
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.podcast = Podcast.objects.create(user=self.user, title='Test Podcast')
        self.episode = Episode.objects.create(podcast=self.podcast, title='Test Episode')
        self.analytics = Analytics.objects.create(
            episode=self.episode,
            downloads=100,
            likes=50,
            shares=25,
            comments=10
        )
        self.client.force_authenticate(user=self.user)

    def test_analytics_list(self):
        # Test listing analytics entries
        url = reverse('analytics-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['episode'], self.episode.id)
        self.assertEqual(response.data[0]['downloads'], 100)

    def test_analytics_create(self):
        # Test creating a new analytics entry
        url = reverse('analytics-list')
        data = {
            'episode': self.episode.id,
            'downloads': 200,
            'likes': 75,
            'shares': 30,
            'comments': 15
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Analytics.objects.count(), 2)
        self.assertEqual(response.data['downloads'], 200)

    def test_analytics_detail(self):
        # Test retrieving a specific analytics entry
        url = reverse('analytics-detail', args=[self.analytics.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['episode'], self.episode.id)
        self.assertEqual(response.data['downloads'], 100)

    def test_analytics_update(self):
        # Test updating an analytics entry
        url = reverse('analytics-detail', args=[self.analytics.id])
        data = {'downloads': 150}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.analytics.refresh_from_db()
        self.assertEqual(self.analytics.downloads, 150)

    def test_analytics_delete(self):
        # Test deleting an analytics entry
        url = reverse('analytics-detail', args=[self.analytics.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Analytics.objects.count(), 0)

    def test_episode_analytics_summary(self):
        # Test retrieving a summary of analytics for a specific episode
        url = reverse('episode-analytics-summary', args=[self.episode.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['episode'], self.episode.id)
        self.assertEqual(response.data['total_downloads'], 100)
        self.assertEqual(response.data['total_engagement'], 85)  # 50 likes + 25 shares + 10 comments

# TODO: Add more edge case tests for the Analytics model and API views
# TODO: Implement performance tests for analytics data retrieval
# TODO: Add integration tests with other components of the system