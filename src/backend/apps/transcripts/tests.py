from django.test import TestCase
from django.utils import timezone
from unittest.mock import patch, MagicMock
from apps.transcripts.models import Transcript
from apps.episodes.models import Episode

class TranscriptModelTest(TestCase):
    def setUp(self):
        """Set up test data"""
        self.mock_episode = Episode.objects.create(
            title="Test Episode",
            description="This is a test episode",
            audio_file_url="https://example.com/test.mp3",
            status="published",
            publish_date=timezone.now()
        )
        self.transcript = Transcript.objects.create(
            episode=self.mock_episode,
            content="This is a test transcript content.",
            created_at=timezone.now(),
            updated_at=timezone.now()
        )

    def test_transcript_creation(self):
        """Test if a Transcript instance is created correctly"""
        self.assertIsInstance(self.transcript, Transcript)
        self.assertEqual(self.transcript.episode, self.mock_episode)
        self.assertEqual(self.transcript.content, "This is a test transcript content.")
        self.assertIsNotNone(self.transcript.created_at)
        self.assertIsNotNone(self.transcript.updated_at)

    def test_transcript_str_method(self):
        """Test the __str__ method of the Transcript model"""
        expected_str = f"Transcript for {self.mock_episode.title}"
        self.assertEqual(str(self.transcript), expected_str)

    def test_get_word_count(self):
        """Test the get_word_count method"""
        word_count = self.transcript.get_word_count()
        self.assertEqual(word_count, 6)  # "This is a test transcript content."

    @patch('apps.transcripts.models.Transcript.generate_summary')
    def test_get_summary(self, mock_generate_summary):
        """Test the get_summary method"""
        mock_summary = "This is a mock summary."
        mock_generate_summary.return_value = mock_summary

        summary = self.transcript.get_summary()
        self.assertEqual(summary, mock_summary)
        mock_generate_summary.assert_called_once_with(self.transcript.content)

    @patch('apps.transcripts.models.Transcript.extract_keywords_from_content')
    def test_extract_keywords(self, mock_extract_keywords):
        """Test the extract_keywords method"""
        mock_keywords = ["test", "transcript", "content"]
        mock_extract_keywords.return_value = mock_keywords

        keywords = self.transcript.extract_keywords()
        self.assertEqual(keywords, mock_keywords)
        mock_extract_keywords.assert_called_once_with(self.transcript.content)

# Human tasks (commented):
# TODO: Implement actual AI-powered summary generation for more comprehensive testing
# TODO: Implement actual keyword extraction algorithm for more comprehensive testing
# TODO: Add tests for edge cases and error handling scenarios
# TODO: Consider adding integration tests with the Episode model