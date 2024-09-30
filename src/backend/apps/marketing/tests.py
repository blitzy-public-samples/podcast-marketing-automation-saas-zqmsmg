from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from unittest.mock import patch
from apps.marketing.models import MarketingContent
from apps.marketing.serializers import MarketingContentSerializer
from apps.marketing.views import (
    MarketingContentListCreateView,
    MarketingContentDetailView,
    GenerateMarketingContentView,
)
from apps.episodes.models import Episode
from apps.authentication.models import User

class MarketingContentModelTest(TestCase):
    def setUp(self):
        # Set up test data
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.episode = Episode.objects.create(title='Test Episode', description='Test Description', user=self.user)
        self.marketing_content = MarketingContent.objects.create(
            episode=self.episode,
            content_type='social_media',
            content='Test marketing content',
            platform='twitter'
        )

    def test_marketing_content_creation(self):
        # Test creating a marketing content instance
        self.assertIsInstance(self.marketing_content, MarketingContent)
        self.assertEqual(self.marketing_content.episode, self.episode)
        self.assertEqual(self.marketing_content.content_type, 'social_media')
        self.assertEqual(self.marketing_content.content, 'Test marketing content')
        self.assertEqual(self.marketing_content.platform, 'twitter')
        
        # Check if the string representation is correct
        self.assertEqual(str(self.marketing_content), f"Marketing Content for {self.episode.title} - Twitter")

    def test_get_social_media_posts(self):
        # Test the get_social_media_posts method
        # Create test social media posts
        MarketingContent.objects.create(
            episode=self.episode,
            content_type='social_media',
            content='Test Twitter post',
            platform='twitter'
        )
        MarketingContent.objects.create(
            episode=self.episode,
            content_type='social_media',
            content='Test Facebook post',
            platform='facebook'
        )
        
        # Call get_social_media_posts method
        social_media_posts = self.episode.get_social_media_posts()
        
        # Assert that the correct posts are returned
        self.assertEqual(len(social_media_posts), 2)
        self.assertIn('twitter', [post.platform for post in social_media_posts])
        self.assertIn('facebook', [post.platform for post in social_media_posts])

    @patch('apps.marketing.models.MarketingContent.generate_content')
    def test_generate_content(self, mock_generate_content):
        # Test the generate_content method
        mock_generate_content.return_value = "Generated marketing content"
        
        # Call generate_content method
        generated_content = self.marketing_content.generate_content()
        
        # Assert that the correct content is generated
        self.assertEqual(generated_content, "Generated marketing content")
        mock_generate_content.assert_called_once()

class MarketingContentViewsTest(APITestCase):
    def setUp(self):
        # Set up test data
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpass')
        self.episode = Episode.objects.create(title='Test Episode', description='Test Description', user=self.user)
        self.marketing_content = MarketingContent.objects.create(
            episode=self.episode,
            content_type='social_media',
            content='Test marketing content',
            platform='twitter'
        )
        self.client.force_authenticate(user=self.user)

    def test_list_marketing_content(self):
        # Test listing marketing content
        url = reverse('marketing-content-list')
        response = self.client.get(url)
        
        # Assert response status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert correct number of items in response
        self.assertEqual(len(response.data), 1)

    def test_create_marketing_content(self):
        # Test creating marketing content
        url = reverse('marketing-content-list')
        data = {
            'episode': self.episode.id,
            'content_type': 'social_media',
            'content': 'New marketing content',
            'platform': 'facebook'
        }
        response = self.client.post(url, data)
        
        # Assert response status code is 201
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Assert marketing content is created correctly
        self.assertEqual(MarketingContent.objects.count(), 2)
        self.assertEqual(MarketingContent.objects.last().content, 'New marketing content')

    def test_retrieve_marketing_content(self):
        # Test retrieving a specific marketing content
        url = reverse('marketing-content-detail', kwargs={'pk': self.marketing_content.id})
        response = self.client.get(url)
        
        # Assert response status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert correct marketing content data is returned
        self.assertEqual(response.data['content'], 'Test marketing content')

    def test_update_marketing_content(self):
        # Test updating marketing content
        url = reverse('marketing-content-detail', kwargs={'pk': self.marketing_content.id})
        data = {
            'content': 'Updated marketing content',
            'platform': 'linkedin'
        }
        response = self.client.patch(url, data)
        
        # Assert response status code is 200
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert marketing content is updated correctly
        self.marketing_content.refresh_from_db()
        self.assertEqual(self.marketing_content.content, 'Updated marketing content')
        self.assertEqual(self.marketing_content.platform, 'linkedin')

    def test_delete_marketing_content(self):
        # Test deleting marketing content
        url = reverse('marketing-content-detail', kwargs={'pk': self.marketing_content.id})
        response = self.client.delete(url)
        
        # Assert response status code is 204
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        
        # Assert marketing content is deleted from database
        self.assertEqual(MarketingContent.objects.count(), 0)

    @patch('apps.marketing.views.GenerateMarketingContentView.generate_content')
    def test_generate_marketing_content(self, mock_generate_content):
        # Test generating marketing content
        mock_generate_content.return_value = "Generated marketing content"
        
        url = reverse('generate-marketing-content')
        data = {
            'episode': self.episode.id,
            'platform': 'twitter'
        }
        response = self.client.post(url, data)
        
        # Assert response status code is 201
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Assert generated content is correct
        self.assertEqual(response.data['content'], 'Generated marketing content')
        mock_generate_content.assert_called_once()

# TODO: Implement integration tests with actual AI service for content generation
# TODO: Add tests for error cases and edge scenarios
# TODO: Implement performance tests for marketing content generation and retrieval