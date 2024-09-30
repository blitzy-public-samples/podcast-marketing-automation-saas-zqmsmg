from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from src.api.apps.social_media.models import SocialMediaPlatform, SocialMediaPost
from src.api.apps.authentication.models import User

class SocialMediaPlatformModelTests(TestCase):
    def setUp(self):
        self.platform = SocialMediaPlatform.objects.create(
            name="Test Platform",
            api_key="test_api_key",
            api_secret="test_api_secret"
        )

    def test_platform_creation(self):
        self.assertEqual(self.platform.name, "Test Platform")
        self.assertEqual(self.platform.api_key, "test_api_key")
        self.assertEqual(self.platform.api_secret, "test_api_secret")
        self.assertEqual(str(self.platform), "Test Platform")

    def test_platform_is_active_default(self):
        self.assertTrue(self.platform.is_active)

class SocialMediaPostModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpass123"
        )
        self.platform = SocialMediaPlatform.objects.create(
            name="Test Platform",
            api_key="test_api_key",
            api_secret="test_api_secret"
        )
        self.post = SocialMediaPost.objects.create(
            user=self.user,
            platform=self.platform,
            content="Test post content",
            scheduled_time=timezone.now() + timezone.timedelta(days=1)
        )

    def test_post_creation(self):
        self.assertEqual(self.post.user, self.user)
        self.assertEqual(self.post.platform, self.platform)
        self.assertEqual(self.post.content, "Test post content")
        self.assertTrue(self.post.scheduled_time > timezone.now())
        self.assertEqual(str(self.post), "Test post content"[:50])

    def test_update_metrics(self):
        self.post.update_metrics(likes=10, shares=5, comments=3)
        self.assertEqual(self.post.likes, 10)
        self.assertEqual(self.post.shares, 5)
        self.assertEqual(self.post.comments, 3)

class SocialMediaAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="testpass123"
        )
        self.platform = SocialMediaPlatform.objects.create(
            name="Test Platform",
            api_key="test_api_key",
            api_secret="test_api_secret"
        )
        self.post = SocialMediaPost.objects.create(
            user=self.user,
            platform=self.platform,
            content="Test post content",
            scheduled_time=timezone.now() + timezone.timedelta(days=1)
        )
        self.client.force_authenticate(user=self.user)

    def test_list_posts(self):
        url = reverse('social-media-posts-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_post(self):
        url = reverse('social-media-posts-list')
        data = {
            'platform': self.platform.id,
            'content': 'New test post',
            'scheduled_time': timezone.now() + timezone.timedelta(days=2)
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SocialMediaPost.objects.count(), 2)
        self.assertEqual(response.data['content'], 'New test post')

    def test_update_post(self):
        url = reverse('social-media-posts-detail', kwargs={'pk': self.post.id})
        data = {
            'content': 'Updated test post',
            'scheduled_time': timezone.now() + timezone.timedelta(days=3)
        }
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.content, 'Updated test post')

    def test_delete_post(self):
        url = reverse('social-media-posts-detail', kwargs={'pk': self.post.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(SocialMediaPost.objects.count(), 0)

# TODO: Implement tests for social media platform-specific functionality (e.g., Twitter-specific or LinkedIn-specific features)
# TODO: Add tests for error handling and edge cases in the API endpoints
# TODO: Implement integration tests with mock social media APIs
# TODO: Add performance tests for bulk operations (e.g., creating multiple posts)