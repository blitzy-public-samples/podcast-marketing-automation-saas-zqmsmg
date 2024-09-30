#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# Default settings module for the Podcast Marketing Automation SaaS platform
DEFAULT_SETTINGS_MODULE = 'config.settings'

def main():
    """Run administrative tasks."""
    # Set the DJANGO_SETTINGS_MODULE environment variable
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', DEFAULT_SETTINGS_MODULE)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()

# Human Tasks:
# TODO: Ensure that the correct settings module is being used for different environments (development, staging, production)
# TODO (Optional): Set up any custom management commands specific to the Podcast Marketing Automation platform