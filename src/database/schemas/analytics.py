from datetime import datetime
from pydantic import BaseModel, Field, validator

class AnalyticsBase(BaseModel):
    """Base Pydantic model for Analytics data"""
    episode_id: int
    downloads: int
    likes: int
    shares: int
    comments: int
    date: datetime

    @validator('downloads', 'likes', 'shares', 'comments')
    def validate_non_negative(cls, value):
        """Validator function to ensure non-negative values for numeric fields"""
        if value < 0:
            raise ValueError("Value must be non-negative")
        return value

class AnalyticsCreate(AnalyticsBase):
    """Pydantic model for creating a new Analytics entry"""
    pass

class AnalyticsUpdate(AnalyticsBase):
    """Pydantic model for updating an existing Analytics entry"""
    pass

class AnalyticsInDB(AnalyticsBase):
    """Pydantic model for Analytics data as stored in the database"""
    id: int

# TODO: Implement additional validation rules for the date field (e.g., ensure it's not in the future)
# TODO: Add example values for each field to improve API documentation