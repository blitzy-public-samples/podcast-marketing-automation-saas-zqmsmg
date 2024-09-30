"""
ASGI config for the Podcast Marketing Automation SaaS platform backend.
This file exposes the ASGI callable as a module-level variable named 'application'.
"""

import os
from django.core.asgi import get_asgi_application

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Get the ASGI application
application = get_asgi_application()

# Human tasks:
# TODO: Ensure ASGI server (e.g., Daphne) is properly configured in production
# TODO: Set up proper process management for ASGI in production (e.g., using Supervisor)