"""
WSGI config for the Podcast Marketing Automation SaaS platform backend.

It exposes the WSGI callable as a module-level variable named 'application'.

This file is used by WSGI servers to serve the Django application.
"""

import os

from django.core.wsgi import get_wsgi_application

# Set the DJANGO_SETTINGS_MODULE environment variable to the correct settings file
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Create the WSGI application
application = get_wsgi_application()

# Human tasks:
# TODO: Ensure that the WSGI server is properly configured to use this file
# TODO: Verify that the DJANGO_SETTINGS_MODULE environment variable is correctly set in the production environment