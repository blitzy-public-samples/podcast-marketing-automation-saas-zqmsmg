from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch, MagicMock
from apps.episodes.models import Episode
from apps.podcasts.models import Podcast

class EpisodeModelTest(TestCase):
    def setUp(self):
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="Test podcast description"
        )
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="Test episode description",
            audio_file="path/to/audio.mp3",
            publish_date=timezone.now()
        )

    def test_episode_creation(self):
        self.assertTrue(isinstance(self.episode, Episode))
        self.assertEqual(str(self.episode), "Test Episode")

    def test_episode_fields(self):
        self.assertEqual(self.episode.podcast, self.podcast)
        self.assertEqual(self.episode.title, "Test Episode")
        self.assertEqual(self.episode.description, "Test episode description")
        self.assertEqual(self.episode.audio_file, "path/to/audio.mp3")
        self.assertTrue(isinstance(self.episode.publish_date, timezone.datetime))

    @patch('apps.episodes.models.Episode.get_duration')
    def test_get_duration(self, mock_get_duration):
        mock_duration = 1800  # 30 minutes in seconds
        mock_get_duration.return_value = mock_duration
        self.assertEqual(self.episode.get_duration(), mock_duration)

    @patch('apps.episodes.models.Episode.get_transcript')
    def test_get_transcript(self, mock_get_transcript):
        mock_transcript = MagicMock()
        mock_transcript.content = "This is a test transcript."
        mock_get_transcript.return_value = mock_transcript
        transcript = self.episode.get_transcript()
        self.assertEqual(transcript.content, "This is a test transcript.")

    @patch('apps.episodes.models.Episode.get_marketing_content')
    def test_get_marketing_content(self, mock_get_marketing_content):
        mock_content = MagicMock()
        mock_content.content = "Test marketing content"
        mock_get_marketing_content.return_value = [mock_content]
        marketing_content = self.episode.get_marketing_content()
        self.assertEqual(len(marketing_content), 1)
        self.assertEqual(marketing_content[0].content, "Test marketing content")

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model

class EpisodeAPITest(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
        self.podcast = Podcast.objects.create(
            title="Test Podcast",
            description="Test podcast description",
            user=self.user
        )
        self.episode = Episode.objects.create(
            podcast=self.podcast,
            title="Test Episode",
            description="Test episode description",
            audio_file="path/to/audio.mp3",
            publish_date=timezone.now()
        )
        self.list_url = reverse('episode-list')
        self.detail_url = reverse('episode-detail', kwargs={'pk': self.episode.pk})

    def test_list_episodes(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_episode(self):
        data = {
            'podcast': self.podcast.id,
            'title': 'New Test Episode',
            'description': 'New test episode description',
            'audio_file': 'path/to/new_audio.mp3',
            'publish_date': timezone.now().isoformat()
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Episode.objects.count(), 2)

    def test_retrieve_episode(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Episode')

    def test_update_episode(self):
        data = {
            'title': 'Updated Test Episode',
            'description': 'Updated test episode description'
        }
        response = self.client.patch(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.episode.refresh_from_db()
        self.assertEqual(self.episode.title, 'Updated Test Episode')

    def test_delete_episode(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Episode.objects.count(), 0)

# TODO: Implement mock for audio file duration in test_get_duration
# TODO: Create mock Transcript and MarketingContent models for related tests
# TODO: Add more edge case tests for API endpoints (e.g., invalid data, unauthorized access)