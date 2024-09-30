from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class EpisodeBase(BaseModel):
    """Base Pydantic model for Episode with common attributes"""
    title: str = Field(..., min_length=1, max_length=200)
    description: str
    audio_file_url: str
    status: str
    publish_date: datetime

class EpisodeCreate(EpisodeBase):
    """Pydantic model for creating a new Episode"""
    podcast_id: int

class EpisodeUpdate(EpisodeBase):
    """Pydantic model for updating an existing Episode"""
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    audio_file_url: Optional[str] = None
    status: Optional[str] = None
    publish_date: Optional[datetime] = None

class EpisodeInDB(EpisodeBase):
    """Pydantic model for Episode as stored in the database"""
    id: int
    podcast_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class EpisodeWithPodcast(EpisodeInDB):
    """Pydantic model for Episode with associated Podcast information"""
    podcast: dict  # This will be replaced with PodcastInDB once available

def validate_title(title: str) -> str:
    """Validates the episode title"""
    title = title.strip()
    if len(title) < 1 or len(title) > 200:
        raise ValueError("Title must be between 1 and 200 characters")
    return title

def validate_audio_file_url(url: str) -> str:
    """Validates the audio file URL"""
    # This is a basic check. You might want to use a more robust URL validation library.
    if not url.startswith(('http://', 'https://')):
        raise ValueError("Invalid URL. Must start with http:// or https://")
    if not url.lower().endswith(('.mp3', '.wav', '.ogg', '.m4a')):
        raise ValueError("URL must point to an audio file (.mp3, .wav, .ogg, or .m4a)")
    return url

def validate_status(status: str) -> str:
    """Validates the episode status"""
    valid_statuses = ['draft', 'published', 'archived']
    if status.lower() not in valid_statuses:
        raise ValueError(f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
    return status.lower()

def validate_publish_date(publish_date: datetime) -> datetime:
    """Validates the publish date"""
    if publish_date < datetime.now():
        raise ValueError("Publish date cannot be in the past")
    return publish_date

# Pending human tasks:
# TODO: Implement additional validation rules for episode properties if needed
# TODO: Add custom error messages for validation failures
# TODO: Consider adding a method to convert EpisodeInDB to a dict for API responses