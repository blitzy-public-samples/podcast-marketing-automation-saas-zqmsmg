from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class PodcastBase(BaseModel):
    """Base Pydantic model for Podcast with common attributes"""
    title: str = Field(..., min_length=1, max_length=100)
    description: str
    cover_image_url: str

class PodcastCreate(PodcastBase):
    """Pydantic model for creating a new Podcast"""
    pass

class PodcastUpdate(PodcastBase):
    """Pydantic model for updating an existing Podcast"""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    cover_image_url: Optional[str] = None

class PodcastInDB(PodcastBase):
    """Pydantic model for Podcast as stored in the database"""
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

def validate_title(title: str) -> str:
    """
    Validates the podcast title
    
    Args:
        title (str): The podcast title to validate
    
    Returns:
        str: The validated title
    
    Raises:
        ValueError: If the title is invalid
    """
    # Check if the title length is between 1 and 100 characters
    if not 1 <= len(title) <= 100:
        raise ValueError("Title must be between 1 and 100 characters")
    
    # Remove any leading or trailing whitespace
    return title.strip()

def validate_cover_image_url(url: str) -> str:
    """
    Validates the cover image URL
    
    Args:
        url (str): The URL to validate
    
    Returns:
        str: The validated URL
    
    Raises:
        ValueError: If the URL is invalid
    """
    # Check if the URL is a valid HTTP or HTTPS URL
    if not url.startswith(('http://', 'https://')):
        raise ValueError("Cover image URL must start with http:// or https://")
    
    # Check if the URL points to an image file (e.g., ends with .jpg, .png, etc.)
    valid_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
    if not url.lower().endswith(valid_extensions):
        raise ValueError("Cover image URL must point to a valid image file")
    
    return url

# Human tasks (commented out as requested):
# TODO: Implement additional validation rules for podcast properties if needed
# TODO: Add custom error messages for validation failures
# TODO: Consider adding a method to convert PodcastInDB to a dict for API responses