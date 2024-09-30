from django.db import models
from src.api.apps.episodes.models import Episode

class MarketingContent(models.Model):
    """
    Model to store marketing content generated for podcast episodes
    """
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='marketing_contents')
    platform = models.CharField(max_length=50)
    content = models.TextField()
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        String representation of the MarketingContent object
        """
        return f"{self.episode.title} - {self.platform}"

    class Meta:
        verbose_name = "Marketing Content"
        verbose_name_plural = "Marketing Contents"
        ordering = ['-created_at']

    # Additional methods can be added here as needed

# Human tasks:
# TODO: Review and adjust the MarketingContent model fields if necessary
# TODO: Implement any additional models required for the marketing app