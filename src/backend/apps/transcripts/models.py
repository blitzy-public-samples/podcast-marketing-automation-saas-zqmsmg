from django.db import models
from apps.episodes.models import Episode

class Transcript(models.Model):
    """
    Model representing a transcript of a podcast episode
    """
    episode = models.OneToOneField(Episode, on_delete=models.CASCADE, related_name='transcript')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Transcript for {self.episode.title}"

    def get_word_count(self):
        """
        Returns the word count of the transcript
        """
        return len(self.content.split())

    def get_summary(self):
        """
        Generates a summary of the transcript using AI
        """
        # TODO: Implement AI-powered summary generation
        raise NotImplementedError("AI-powered summary generation not implemented yet")

    def extract_keywords(self):
        """
        Extracts key topics and keywords from the transcript
        """
        # TODO: Implement keyword extraction algorithm
        raise NotImplementedError("Keyword extraction algorithm not implemented yet")

# Human tasks:
# TODO: Implement AI-powered summary generation in the get_summary method
# TODO: Implement keyword extraction algorithm in the extract_keywords method
# TODO: Consider adding a field for transcript language if multi-language support is needed
# TODO: Evaluate the need for storing timestamps with the transcript content for precise audio syncing