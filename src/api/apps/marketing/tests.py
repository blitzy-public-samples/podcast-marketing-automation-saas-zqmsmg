from django.test import TestCase
from django.utils import timezone
from src.api.apps.marketing.models import MarketingContent
from src.api.apps.episodes.models import Episode

class MarketingContentModelTests(TestCase):
    def setUp(self):
        """
        Set up the test environment before each test method
        """
        # Create a test Episode object
        self.episode = Episode.objects.create(
            title="Test Episode",
            description="This is a test episode",
            audio_file_url="https://example.com/test-audio.mp3",
            status="published",
            publish_date=timezone.now()
        )
        
        # Create a test MarketingContent object associated with the test Episode
        self.marketing_content = MarketingContent.objects.create(
            episode=self.episode,
            platform="twitter",
            content="Check out our latest episode!",
            status="draft"
        )

    def test_marketing_content_creation(self):
        """
        Test the creation of a MarketingContent object
        """
        # Assert that the test MarketingContent object exists
        self.assertIsNotNone(self.marketing_content)
        
        # Assert that the MarketingContent object's fields match the expected values
        self.assertEqual(self.marketing_content.episode, self.episode)
        self.assertEqual(self.marketing_content.platform, "twitter")
        self.assertEqual(self.marketing_content.content, "Check out our latest episode!")
        self.assertEqual(self.marketing_content.status, "draft")

    def test_marketing_content_str_method(self):
        """
        Test the string representation of a MarketingContent object
        """
        # Assert that the string representation of the test MarketingContent object matches the expected format
        expected_str = f"Marketing Content for {self.episode.title} on Twitter"
        self.assertEqual(str(self.marketing_content), expected_str)

    def test_marketing_content_episode_relationship(self):
        """
        Test the relationship between MarketingContent and Episode
        """
        # Assert that the MarketingContent object is correctly associated with the test Episode
        self.assertEqual(self.marketing_content.episode, self.episode)
        
        # Assert that the Episode object has the MarketingContent object in its related set
        self.assertIn(self.marketing_content, self.episode.marketingcontent_set.all())

    def test_marketing_content_default_values(self):
        """
        Test the default values of MarketingContent fields
        """
        new_marketing_content = MarketingContent.objects.create(
            episode=self.episode,
            platform="facebook",
            content="Another test content"
        )
        
        # Assert that the status field defaults to "draft"
        self.assertEqual(new_marketing_content.status, "draft")
        
        # Assert that the created_at and updated_at fields are automatically set
        self.assertIsNotNone(new_marketing_content.created_at)
        self.assertIsNotNone(new_marketing_content.updated_at)

    def test_marketing_content_update(self):
        """
        Test updating a MarketingContent object
        """
        # Update the marketing content
        self.marketing_content.content = "Updated content"
        self.marketing_content.status = "scheduled"
        self.marketing_content.save()
        
        # Refresh the object from the database
        self.marketing_content.refresh_from_db()
        
        # Assert that the fields were updated correctly
        self.assertEqual(self.marketing_content.content, "Updated content")
        self.assertEqual(self.marketing_content.status, "scheduled")

    def test_marketing_content_deletion(self):
        """
        Test deleting a MarketingContent object
        """
        # Get the initial count of MarketingContent objects
        initial_count = MarketingContent.objects.count()
        
        # Delete the marketing content
        self.marketing_content.delete()
        
        # Assert that the count of MarketingContent objects has decreased by 1
        self.assertEqual(MarketingContent.objects.count(), initial_count - 1)

# Human tasks:
# 1. Implement additional test cases for edge cases and error handling
# 2. Add integration tests for marketing content generation functionality
# 3. Create mock objects for external dependencies in tests