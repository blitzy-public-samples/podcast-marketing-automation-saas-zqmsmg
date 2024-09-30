# src/database/models/__init__.py

"""
This module initializes the database models package and imports all model classes for easy access.
"""

from .user import User
from .podcast import Podcast
from .episode import Episode
from .transcript import Transcript
from .marketing_content import MarketingContent
from .social_media_post import SocialMediaPost
from .analytics import Analytics

# Define __all__ to explicitly specify which names are exported from this package
__all__ = ["User", "Podcast", "Episode", "Transcript", "MarketingContent", "SocialMediaPost", "Analytics"]

# TODO: Ensure that all imported model classes are correctly implemented in their respective files
# TODO: Verify that the database connection and ORM setup is properly configured

```

This `__init__.py` file accomplishes the following:

1. It imports all the expected model classes from their respective files.
2. It sets up the `__all__` variable to explicitly define which names are exported from this package when `from src.database.models import *` is used.
3. It includes TODO comments for the pending human tasks mentioned in the specification.

This structure allows for easy importing of all model classes in other parts of the application. For example, you can now import the models like this:

```python
from src.database.models import User, Podcast, Episode, Transcript, MarketingContent, SocialMediaPost, Analytics