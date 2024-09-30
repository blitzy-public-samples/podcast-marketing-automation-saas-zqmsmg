import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.api.config.settings')

# Create a new Celery application
app = Celery('podcast_marketing_automation')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()

def create_celery_app():
    """
    Creates and configures the Celery application
    
    Returns:
        Celery: Configured Celery application instance
    """
    # Load task modules from all registered Django app configs.
    app.config_from_object('django.conf:settings', namespace='CELERY')
    
    # Auto-discover tasks in all installed apps
    app.autodiscover_tasks()
    
    return app

# Initialize the Celery app
celery_app = create_celery_app()

# Human tasks (commented as requested)
"""
Human tasks:
1. Verify and set up the correct broker URL in Django settings (Critical)
2. Ensure proper Celery configuration in Django settings (e.g., CELERY_RESULT_BACKEND) (Required)
"""

if __name__ == '__main__':
    app.start()