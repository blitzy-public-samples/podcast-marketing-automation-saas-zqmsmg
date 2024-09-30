from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.utils import timezone
from apps.episodes.models import Episode
from apps.podcasts.models import Podcast
from apps.episodes.serializers import EpisodeSerializer
from apps.episodes.views import EpisodeViewSet

class EpisodeModelTest(TestCase):
    def setUp(self):
        # Create a test Podcast instance
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="Test podcast description"
        )
        # Create a test Episode instance
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="Test episode description",
            audio_file_url="https://example.com/test.mp3",
            status="draft"
        )

    def test_episode_creation(self):
        self.assertTrue(isinstance(self.episode, Episode))
        self.assertEqual(self.episode.__str__(), self.episode.title)

    def test_episode_str_method(self):
        self.assertEqual(str(self.episode), "Test Episode")

    def test_episode_save_method(self):
        old_updated_at = self.episode.updated_at
        self.episode.title = "Updated Test Episode"
        self.episode.save()
        self.assertNotEqual(self.episode.updated_at, old_updated_at)

    def test_episode_status_change(self):
        self.assertEqual(self.episode.status, "draft")
        self.episode.status = "published"
        self.episode.save()
        self.assertEqual(self.episode.status, "published")

class EpisodeAPITest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username="testuser", password="testpass")
        # Create a test Podcast instance
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="Test podcast description"
        )
        # Create a test Episode instance
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="Test episode description",
            audio_file_url="https://example.com/test.mp3",
            status="draft"
        )
        # Authenticate the test user
        self.client.force_authenticate(user=self.user)

    def test_list_episodes(self):
        url = reverse('episode-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_episode(self):
        url = reverse('episode-list')
        data = {
            'podcast': self.podcast.id,
            'title': 'New Test Episode',
            'description': 'New test episode description',
            'audio_file_url': 'https://example.com/new_test.mp3',
            'status': 'draft'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Episode.objects.count(), 2)

    def test_retrieve_episode(self):
        url = reverse('episode-detail', kwargs={'pk': self.episode.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Episode')

    def test_update_episode(self):
        url = reverse('episode-detail', kwargs={'pk': self.episode.id})
        data = {
            'title': 'Updated Test Episode',
            'description': 'Updated test episode description'
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Episode.objects.get(id=self.episode.id).title, 'Updated Test Episode')

    def test_delete_episode(self):
        url = reverse('episode-detail', kwargs={'pk': self.episode.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Episode.objects.count(), 0)

# TODO: Implement additional test cases for edge cases and error handling
# TODO: Add tests for episode-specific methods like get_transcript, get_marketing_content, get_social_media_posts, and get_analytics
# TODO: Create tests for pagination and filtering of episodes in the API
# TODO: Implement tests for authentication and authorization in the Episode API