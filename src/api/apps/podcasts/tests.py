from django.test import TestCase
from django.utils import timezone
from apps.podcasts.models import Podcast
from apps.authentication.models import User

class PodcastModelTests(TestCase):
    def setUp(self):
        """Set up the test environment before each test method"""
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpassword123'
        )
        self.podcast = Podcast.objects.create(
            title='Test Podcast',
            description='This is a test podcast',
            cover_image_url='https://example.com/cover.jpg',
            user=self.user
        )

    def test_podcast_creation(self):
        """Test the creation of a Podcast instance"""
        self.assertIsInstance(self.podcast, Podcast)
        self.assertEqual(self.podcast.title, 'Test Podcast')
        self.assertEqual(self.podcast.description, 'This is a test podcast')
        self.assertEqual(self.podcast.cover_image_url, 'https://example.com/cover.jpg')
        self.assertEqual(self.podcast.user, self.user)

    def test_podcast_str_method(self):
        """Test the __str__ method of the Podcast model"""
        self.assertEqual(str(self.podcast), 'Test Podcast')

    def test_podcast_save_method(self):
        """Test the custom save method of the Podcast model"""
        original_created_at = self.podcast.created_at
        original_updated_at = self.podcast.updated_at

        # Ensure created_at and updated_at are set
        self.assertIsNotNone(self.podcast.created_at)
        self.assertIsNotNone(self.podcast.updated_at)

        # Update the podcast and save again
        self.podcast.title = 'Updated Test Podcast'
        self.podcast.save()

        # Refresh the podcast instance from the database
        self.podcast.refresh_from_db()

        # Check that created_at hasn't changed but updated_at has
        self.assertEqual(self.podcast.created_at, original_created_at)
        self.assertGreater(self.podcast.updated_at, original_updated_at)

    def test_get_episodes_method(self):
        """Test the get_episodes method of the Podcast model"""
        # Create test episodes for the podcast
        Episode = self.podcast.episodes.model  # Get the Episode model dynamically
        episode1 = Episode.objects.create(
            podcast=self.podcast,
            title='Episode 1',
            description='This is episode 1',
            audio_file_url='https://example.com/episode1.mp3',
            publish_date=timezone.now()
        )
        episode2 = Episode.objects.create(
            podcast=self.podcast,
            title='Episode 2',
            description='This is episode 2',
            audio_file_url='https://example.com/episode2.mp3',
            publish_date=timezone.now()
        )

        # Call the get_episodes method
        episodes = self.podcast.get_episodes()

        # Assert that the returned queryset contains the correct episodes
        self.assertEqual(episodes.count(), 2)
        self.assertIn(episode1, episodes)
        self.assertIn(episode2, episodes)

# TODO: Add more specific test cases based on business logic and requirements
# TODO: Implement integration tests with other components if necessary
# TODO: Set up test data fixtures for complex scenarios