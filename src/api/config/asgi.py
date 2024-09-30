"""
ASGI config for the Podcast Marketing Automation SaaS platform.

This module contains the ASGI callable as a module-level variable named 'application'.
It can be used by ASGI servers like Uvicorn or Daphne to serve the project.
"""

import os
from django.core.asgi import get_asgi_application

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Get the ASGI application
application = get_asgi_application()

# Human tasks (commented out as requested in the specification):
# TODO: Verify that the DJANGO_SETTINGS_MODULE environment variable is correctly set in the production environment
# TODO: Ensure that the ASGI server (e.g., Uvicorn or Daphne) is properly configured to use this file