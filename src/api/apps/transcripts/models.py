from django.db import models
from django.utils import timezone

class Transcript(models.Model):
    """
    Model representing a transcript for a podcast episode in the Podcast Marketing Automation platform.
    """
    TRANSCRIPT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    episode = models.OneToOneField('episodes.Episode', on_delete=models.CASCADE, related_name='transcript')
    content = models.TextField(help_text="The full text content of the transcript.")
    language = models.CharField(max_length=10, help_text="The language code of the transcript (e.g., 'en-US').")
    confidence_score = models.FloatField(help_text="The confidence score of the transcription accuracy.")
    timestamps = models.JSONField(help_text="JSON field containing word-level timestamps.")
    status = models.CharField(max_length=20, choices=TRANSCRIPT_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """
        Returns a string representation of the Transcript.
        """
        return f"Transcript for {self.episode.title} - {self.get_status_display()}"

    def save(self, *args, **kwargs):
        """
        Custom save method to update timestamps.
        """
        self.updated_at = timezone.now()
        if not self.id:
            self.created_at = timezone.now()
        super().save(*args, **kwargs)

    def get_word_count(self):
        """
        Returns the word count of the transcript content.
        """
        return len(self.content.split())

    def get_duration(self):
        """
        Returns the duration of the transcript based on timestamps.
        """
        if not self.timestamps:
            return 0.0
        last_timestamp = max(word['end_time'] for word in self.timestamps)
        return float(last_timestamp)

    def generate_srt(self):
        """
        Generates an SRT format subtitle file from the transcript.
        """
        srt_content = []
        for i, word in enumerate(self.timestamps, start=1):
            start_time = self._format_time(word['start_time'])
            end_time = self._format_time(word['end_time'])
            srt_content.append(f"{i}\n{start_time} --> {end_time}\n{word['word']}\n\n")
        return ''.join(srt_content)

    @staticmethod
    def _format_time(seconds):
        """
        Formats time in seconds to SRT time format (HH:MM:SS,mmm).
        """
        hours, remainder = divmod(float(seconds), 3600)
        minutes, seconds = divmod(remainder, 60)
        milliseconds = int((seconds % 1) * 1000)
        return f"{int(hours):02d}:{int(minutes):02d}:{int(seconds):02d},{milliseconds:03d}"

# Human tasks:
# 1. Define the specific status options for the 'status' field (e.g., 'pending', 'completed', 'failed')
# 2. Determine the structure and required fields for the 'timestamps' JSONField
# 3. Implement logic for handling different languages in the transcript
# 4. Decide on the threshold for an acceptable confidence score