import os
from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Create a new Celery application instance
app = Celery('podcast_marketing_automation')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()

def init_celery():
    """
    Initializes the Celery application with configuration from Django settings

    Returns:
        Celery: Configured Celery application instance
    """
    # The configuration is already done when the module is imported,
    # so we just need to return the app instance
    return app

# Define any Celery beat schedules or additional configurations here if needed
# app.conf.beat_schedule = {
#     'example-periodic-task': {
#         'task': 'your_app.tasks.example_task',
#         'schedule': 300.0,  # Run every 5 minutes
#     },
# }

# You can add more Celery configurations here, such as:
# app.conf.task_serializer = 'json'
# app.conf.result_serializer = 'json'
# app.conf.accept_content = ['json']
# app.conf.timezone = 'UTC'

# Error handling and logging configuration
app.conf.task_track_started = True
app.conf.task_time_limit = 30 * 60  # 30 minutes
app.conf.worker_max_tasks_per_child = 50
app.conf.worker_prefetch_multiplier = 1

# Add a custom error handler if needed
# @app.task_failure
# def task_failure_handler(task_id, exception, args, kwargs, traceback, einfo):
#     # Custom error handling logic here
#     pass

# Uncomment and customize the following lines for production environment
# app.conf.broker_url = 'redis://your-redis-server:6379/0'
# app.conf.result_backend = 'redis://your-redis-server:6379/0'