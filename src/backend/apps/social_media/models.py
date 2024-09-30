from django.db import models
from apps.episodes.models import Episode

class SocialMediaPost(models.Model):
    PLATFORM_CHOICES = [
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('linkedin', 'LinkedIn'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('scheduled', 'Scheduled'),
        ('published', 'Published'),
        ('failed', 'Failed'),
    ]

    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='social_media_posts')
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    content = models.TextField()
    post_id = models.CharField(max_length=255, blank=True, null=True)
    scheduled_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.get_platform_display()} - {self.post_id}"

    def get_engagement_metrics(self):
        # TODO: Implement the get_engagement_metrics method to integrate with specific social media platform APIs
        # This method should fetch engagement metrics from the respective social media platform API
        # and return a dictionary with metrics like likes, shares, comments, etc.
        raise NotImplementedError("get_engagement_metrics method needs to be implemented")

    def update_status(self, new_status):
        if new_status not in dict(self.STATUS_CHOICES):
            raise ValueError("Invalid status")
        self.status = new_status
        self.save()

    class Meta:
        ordering = ['-scheduled_time']
        indexes = [
            models.Index(fields=['platform', 'status']),
            models.Index(fields=['episode', 'platform']),
        ]

# TODO: Implement the get_engagement_metrics method to integrate with specific social media platform APIs
# TODO: Review and adjust status choices for social media posts based on the posting workflow
# TODO: Consider adding fields for tracking post performance or additional metadata if required