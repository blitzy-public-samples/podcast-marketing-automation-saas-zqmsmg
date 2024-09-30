from django.db import models
from apps.podcasts.models import Podcast

class Episode(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE, related_name='episodes')
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio_file_url = models.URLField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    publish_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_duration(self):
        # TODO: Implement logic to calculate episode duration
        # This method should return the duration of the episode in seconds
        pass

    def get_transcript(self):
        # TODO: Implement logic to retrieve the associated transcript
        # This method should return the Transcript instance or None
        pass

    def get_marketing_content(self):
        # TODO: Implement logic to retrieve associated marketing content
        # This method should return a QuerySet of MarketingContent instances
        pass

# Human tasks:
# TODO: Implement logic for the get_duration method to calculate episode duration
# TODO: Review and adjust episode status choices based on specific workflow requirements
# TODO: Consider adding fields for episode number, season number, or other metadata if required