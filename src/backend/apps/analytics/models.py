from django.db import models
from apps.episodes.models import Episode

class Analytics(models.Model):
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='analytics')
    date = models.DateField()
    downloads = models.IntegerField()
    likes = models.IntegerField()
    shares = models.IntegerField()
    comments = models.IntegerField()

    class Meta:
        indexes = [
            models.Index(fields=['episode', 'date']),
        ]
        unique_together = ['episode', 'date']

    def __str__(self):
        return f"{self.episode.title} - {self.date}"

    def get_total_engagement(self):
        """
        Calculate total engagement for the episode on this date
        """
        return self.likes + self.shares + self.comments

# Human tasks:
# TODO: Verify the analytics metrics and add any platform-specific fields if necessary
# TODO: Consider adding more advanced analytics models for trend analysis or user segmentation