from django.db import models
from apps.authentication.models import User

class Podcast(models.Model):
    """
    Model representing a podcast in the system.
    """
    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image_url = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='podcasts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        String representation of the podcast.
        """
        return self.title

    def get_episode_count(self):
        """
        Returns the number of episodes for this podcast.
        """
        return self.episodes.count()

    def get_latest_episode(self):
        """
        Returns the most recent episode of the podcast.
        """
        return self.episodes.order_by('-created_at').first()

# Human tasks:
# TODO: Review and adjust podcast model fields based on specific business requirements
# TODO: Implement additional methods or properties if needed for advanced podcast management features
# TODO: Consider adding fields for podcast category, language, or other metadata if required