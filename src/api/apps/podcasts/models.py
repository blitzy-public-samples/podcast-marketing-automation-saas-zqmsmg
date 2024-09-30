from django.db import models
from django.utils import timezone
from apps.authentication.models import User

class Podcast(models.Model):
    """
    Model representing a podcast in the Podcast Marketing Automation platform.
    """
    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image_url = models.URLField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='podcasts')
    rss_feed_url = models.CharField(max_length=255)
    website_url = models.CharField(max_length=255)
    language = models.CharField(max_length=50)
    category = models.CharField(max_length=100)
    is_explicit = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the Podcast.
        """
        return self.title

    def save(self, *args, **kwargs):
        """
        Custom save method to update timestamps.
        """
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super(Podcast, self).save(*args, **kwargs)

    def get_episodes(self):
        """
        Returns all episodes associated with this podcast.
        """
        return self.episodes.all()

# Human tasks:
# TODO: Determine if additional podcast-related fields are required for the platform
# TODO: Decide on the specific categories to be used in the 'category' field
# TODO: Implement any custom podcast management logic if needed