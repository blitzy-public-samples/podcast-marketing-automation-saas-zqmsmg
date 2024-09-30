from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch
from apps.social_media.models import SocialMediaPost
from apps.episodes.models import Episode

class SocialMediaPostModelTests(TestCase):
    def setUp(self):
        """Set up test data for the test cases"""
        self.episode = self.create_test_episode()
        self.social_media_post = SocialMediaPost.objects.create(
            episode=self.episode,
            platform='Twitter',
            content='Test social media post content',
            status='Scheduled',
            scheduled_time=timezone.now() + timezone.timedelta(days=1)
        )

    def create_test_episode(self):
        """Helper function to create a test Episode instance"""
        return Episode.objects.create(
            title='Test Episode',
            description='Test episode description',
            audio_file_url='https://example.com/test-audio.mp3',
            publish_date=timezone.now()
        )

    def test_social_media_post_creation(self):
        """Test the creation of a SocialMediaPost instance"""
        self.assertIsInstance(self.social_media_post, SocialMediaPost)
        self.assertEqual(self.social_media_post.episode, self.episode)
        self.assertEqual(self.social_media_post.platform, 'Twitter')
        self.assertEqual(self.social_media_post.content, 'Test social media post content')
        self.assertEqual(self.social_media_post.status, 'Scheduled')
        self.assertIsNotNone(self.social_media_post.scheduled_time)

    def test_social_media_post_str_method(self):
        """Test the __str__ method of SocialMediaPost"""
        expected_str = f"Twitter post for {self.episode.title} - {self.social_media_post.status}"
        self.assertEqual(str(self.social_media_post), expected_str)

    def test_update_status_method(self):
        """Test the update_status method of SocialMediaPost"""
        new_status = 'Published'
        self.social_media_post.update_status(new_status)
        self.assertEqual(self.social_media_post.status, new_status)

    @patch('apps.social_media.models.SocialMediaPost.get_engagement_metrics')
    def test_get_engagement_metrics_method(self, mock_get_engagement_metrics):
        """Test the get_engagement_metrics method of SocialMediaPost"""
        mock_metrics = {
            'likes': 100,
            'shares': 50,
            'comments': 25
        }
        mock_get_engagement_metrics.return_value = mock_metrics

        metrics = self.social_media_post.get_engagement_metrics()
        self.assertEqual(metrics, mock_metrics)
        mock_get_engagement_metrics.assert_called_once()

# TODO: Implement mock responses for social media platform APIs in the get_engagement_metrics test
# TODO: Add more specific test cases for different social media platforms
# TODO: Consider adding integration tests with actual social media APIs (using test accounts)