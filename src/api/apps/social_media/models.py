from django.db import models
from django.utils import timezone
from src.api.apps.authentication.models import User

class SocialMediaPlatform(models.Model):
    """
    Model to represent different social media platforms supported by the system.
    """
    name = models.CharField(max_length=100)
    api_key = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the SocialMediaPlatform.
        """
        return self.name

class SocialMediaPost(models.Model):
    """
    Model to represent social media posts created and managed by the system.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.ForeignKey(SocialMediaPlatform, on_delete=models.CASCADE)
    content = models.TextField()
    status = models.CharField(max_length=50)  # Consider using choices for status
    scheduled_time = models.DateTimeField()
    posted_time = models.DateTimeField(null=True, blank=True)
    post_id = models.CharField(max_length=255, null=True, blank=True)
    likes = models.IntegerField(default=0)
    shares = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the SocialMediaPost.
        """
        return f"{self.content[:50]}..."  # Return first 50 characters of the post content

    def update_metrics(self, likes: int, shares: int, comments: int):
        """
        Updates the post's engagement metrics.
        """
        self.likes = likes
        self.shares = shares
        self.comments = comments
        self.save()

# Human tasks (commented as requested):
# TODO: Determine if additional social media platforms need to be supported
# TODO: Define the specific status options for the SocialMediaPost status field
# TODO: Implement any platform-specific logic for posting and retrieving metrics
# TODO: Consider adding a field to link SocialMediaPost to specific podcast episodes