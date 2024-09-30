# src/database/schemas/__init__.py

"""
Entry point for database schemas, importing and exposing schema classes from individual schema files.
"""

from .user import UserSchema
from .podcast import PodcastSchema
from .episode import EpisodeSchema
from .transcript import TranscriptSchema
from .marketing_content import MarketingContentSchema
from .social_media_post import SocialMediaPostSchema
from .analytics import AnalyticsSchema

# List of all schemas for easy access
all_schemas = [
    UserSchema,
    PodcastSchema,
    EpisodeSchema,
    TranscriptSchema,
    MarketingContentSchema,
    SocialMediaPostSchema,
    AnalyticsSchema
]

# Export all schemas
__all__ = [
    'UserSchema',
    'PodcastSchema',
    'EpisodeSchema',
    'TranscriptSchema',
    'MarketingContentSchema',
    'SocialMediaPostSchema',
    'AnalyticsSchema',
    'all_schemas'
]

# Human tasks:
# TODO: Implement individual schema files (user.py, podcast.py, etc.) and define appropriate schema classes
# TODO: Review and validate the schema definitions to ensure they match the database models and API requirements
```

This `__init__.py` file serves as the entry point for all database schemas in the project. It imports each schema class from its respective file and exposes them for easy access throughout the application. The `all_schemas` list provides a convenient way to access all schema classes if needed.

The TODO comments at the end of the file remind developers about the pending human tasks that need to be completed to fully implement the schema system.

Once the individual schema files are implemented, this `__init__.py` file will allow other parts of the application to import schemas like this:

```python
from src.database.schemas import UserSchema, PodcastSchema
# or
from src.database.schemas import all_schemas