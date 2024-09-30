from django.db import models
from apps.episodes.models import Episode

class MarketingContent(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('approved', 'Approved'),
        ('published', 'Published'),
    ]

    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='marketing_contents')
    platform = models.CharField(max_length=50)
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.platform} - {self.episode.title}"

    def get_social_media_posts(self):
        return self.social_media_posts.all()

    def generate_content(self, platform):
        # TODO: Implement content generation using AI services
        pass

# Human Tasks:
# TODO: Implement the generate_content method using the chosen AI service for content generation
# TODO: Define specific status choices for marketing content (e.g., 'draft', 'approved', 'published')
# TODO: Consider adding fields for content type (e.g., 'post', 'story', 'tweet') if needed