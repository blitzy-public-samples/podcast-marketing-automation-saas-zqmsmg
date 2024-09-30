"""
Initializes the tasks module for the Podcast Marketing Automation SaaS platform.
This file imports and collects all Celery tasks from various task files to make them available to the Celery worker.
"""

from .celery_app import celery_app
from .transcription_tasks import *
from .marketing_tasks import *
from .analytics_tasks import *

# This list will be populated with all the task names as they are imported
__all__ = []

# Update __all__ with tasks from each module
# Note: The actual task names will be added when the respective modules are implemented
__all__.extend([name for name in dir() if not name.startswith('_')])

# Pending human tasks:
# TODO: Implement specific tasks in transcription_tasks.py, marketing_tasks.py, and analytics_tasks.py
# TODO: Ensure Celery is properly configured in celery.py