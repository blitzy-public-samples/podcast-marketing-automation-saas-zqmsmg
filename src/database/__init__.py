"""
Initializes the database module and provides convenient imports for key database components.
"""

# Import key components from config
from .config import database, connection_pool

# Import key components from models
from .models import (
    base,
    user,
    podcast,
    episode,
    transcript,
    marketing_content,
    social_media_post,
    analytics
)

# Import key components from utils
from .utils import connection, query_builder, migrations

# Import key components from schemas
from .schemas import (
    user as user_schema,
    podcast as podcast_schema,
    episode as episode_schema,
    transcript as transcript_schema,
    marketing_content as marketing_content_schema,
    social_media_post as social_media_post_schema,
    analytics as analytics_schema
)

# Define __all__ to specify what gets imported with "from database import *"
__all__ = [
    'database',
    'connection_pool',
    'base',
    'user',
    'podcast',
    'episode',
    'transcript',
    'marketing_content',
    'social_media_post',
    'analytics',
    'connection',
    'query_builder',
    'migrations',
    'user_schema',
    'podcast_schema',
    'episode_schema',
    'transcript_schema',
    'marketing_content_schema',
    'social_media_post_schema',
    'analytics_schema'
]

# TODO: Review and confirm the structure of the database module and its submodules
# TODO: Decide on any specific components that should be imported and exposed at the top level of the database module