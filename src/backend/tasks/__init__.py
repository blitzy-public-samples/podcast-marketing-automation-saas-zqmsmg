# Import Celery app instance
from .celery import celery_app

# Import task modules
from . import transcription_tasks
from . import marketing_tasks
from . import analytics_tasks

# Make the Celery app instance available at the package level
__all__ = ('celery_app',)

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
celery_app.autodiscover_tasks()