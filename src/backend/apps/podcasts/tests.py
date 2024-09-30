from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.podcasts.models import Podcast

User = get_user_model()

class PodcastModelTests(TestCase):
    def setUp(self):
        """Set up test data before each test method"""
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.podcast = Podcast.objects.create(
            title='Test Podcast',
            description='A test podcast description',
            user=self.user
        )

    def test_podcast_creation(self):
        """Test if a podcast can be created with valid data"""
        self.assertIsInstance(self.podcast, Podcast)
        self.assertEqual(self.podcast.title, 'Test Podcast')
        self.assertEqual(self.podcast.description, 'A test podcast description')
        self.assertEqual(self.podcast.user, self.user)

    def test_podcast_str_method(self):
        """Test the string representation of the Podcast model"""
        self.assertEqual(str(self.podcast), 'Test Podcast')

    def test_get_episode_count(self):
        """Test the get_episode_count method of the Podcast model"""
        # Assuming there's a related Episode model with a ForeignKey to Podcast
        from apps.episodes.models import Episode
        
        Episode.objects.create(
            title='Episode 1',
            podcast=self.podcast,
            audio_file_url='https://example.com/episode1.mp3'
        )
        Episode.objects.create(
            title='Episode 2',
            podcast=self.podcast,
            audio_file_url='https://example.com/episode2.mp3'
        )

        self.assertEqual(self.podcast.get_episode_count(), 2)

    def test_get_latest_episode(self):
        """Test the get_latest_episode method of the Podcast model"""
        from apps.episodes.models import Episode
        from django.utils import timezone
        import datetime

        Episode.objects.create(
            title='Episode 1',
            podcast=self.podcast,
            audio_file_url='https://example.com/episode1.mp3',
            publish_date=timezone.now() - datetime.timedelta(days=1)
        )
        latest_episode = Episode.objects.create(
            title='Episode 2',
            podcast=self.podcast,
            audio_file_url='https://example.com/episode2.mp3',
            publish_date=timezone.now()
        )

        self.assertEqual(self.podcast.get_latest_episode(), latest_episode)

# TODO: Implement additional test cases for edge cases and error handling
# TODO: Add integration tests for podcast-related API endpoints
# TODO: Consider adding performance tests for podcast-related operations