"""
WSGI config for the Podcast Marketing Automation SaaS platform.

This file exposes the WSGI callable as a module-level variable named 'application',
which is used by WSGI servers to serve the Django application.
"""

import os

from django.core.wsgi import get_wsgi_application

# Set the DJANGO_SETTINGS_MODULE environment variable
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Create the WSGI application
application = get_wsgi_application()

# Human tasks (Critical):
# - Ensure that the DJANGO_SETTINGS_MODULE environment variable is correctly set in the production environment
# - Verify that the WSGI server is properly configured to use this application in the production environment