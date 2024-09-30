from django.db import models
from django.utils import timezone

class Episode(models.Model):
    """
    Model representing a podcast episode in the Podcast Marketing Automation platform.
    """
    # Foreign key to the Podcast model
    podcast = models.ForeignKey('podcasts.Podcast', on_delete=models.CASCADE, related_name='episodes')
    
    # Episode details
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio_file_url = models.URLField()
    duration = models.DurationField()
    
    # Status choices
    # TODO: Define specific status options (e.g., 'draft', 'published', 'archived')
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('PUBLISHED', 'Published'),
        ('ARCHIVED', 'Archived'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    
    publish_date = models.DateTimeField(null=True, blank=True)
    episode_number = models.CharField(max_length=20)
    season_number = models.CharField(max_length=20)
    is_explicit = models.BooleanField(default=False)
    
    # TODO: Determine the structure and required fields for the 'keywords' JSONField
    keywords = models.JSONField(default=dict, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the Episode.
        """
        return self.title

    def save(self, *args, **kwargs):
        """
        Custom save method to update timestamps and handle status changes.
        """
        # Update the 'updated_at' timestamp
        self.updated_at = timezone.now()
        
        # If it's a new instance, set the 'created_at' timestamp
        if not self.id:
            self.created_at = timezone.now()
        
        # TODO: Implement custom logic for handling status changes
        
        # Call the parent class save method
        super().save(*args, **kwargs)

    def get_transcript(self):
        """
        Returns the transcript associated with this episode.
        """
        # Assuming there's a Transcript model with a ForeignKey to Episode
        try:
            return self.transcript
        except AttributeError:
            return None

    def get_marketing_content(self):
        """
        Returns all marketing content associated with this episode.
        """
        # Assuming there's a MarketingContent model with a ForeignKey to Episode
        return self.marketing_contents.all()

    def get_social_media_posts(self):
        """
        Returns all social media posts associated with this episode.
        """
        # Assuming there's a SocialMediaPost model with a ForeignKey to Episode
        return self.social_media_posts.all()

    def get_analytics(self):
        """
        Returns analytics data for this episode.
        """
        # Assuming there's an Analytics model with a ForeignKey to Episode
        try:
            return {
                'downloads': self.analytics.downloads,
                'likes': self.analytics.likes,
                'shares': self.analytics.shares,
                'comments': self.analytics.comments,
                # Add more analytics fields as needed
            }
        except AttributeError:
            return {}

# TODO: Define the specific status options for the 'status' field (e.g., 'draft', 'published', 'archived')
# TODO: Determine if additional episode-related fields are required for the platform
# TODO: Implement custom logic for handling status changes in the save method
# TODO: Decide on the structure and required fields for the 'keywords' JSONField