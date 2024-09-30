"""
Initialization file for the API services module, providing easy access to various service classes and functions.
"""

from .transcription import TranscriptionService
from .content_generation import ContentGenerationService
from .social_media_integration import SocialMediaIntegrationService
from .storage import StorageService

# Error handling and logging for service imports
try:
    # Attempt to import all services
    __all__ = [
        'TranscriptionService',
        'ContentGenerationService',
        'SocialMediaIntegrationService',
        'StorageService'
    ]
except ImportError as e:
    # Log the import error
    import logging
    logging.error(f"Error importing services: {str(e)}")
    # Re-raise the exception to notify the application of the import failure
    raise

# Type hints for imported services
TranscriptionService: type
ContentGenerationService: type
SocialMediaIntegrationService: type
StorageService: type

# TODO: Implement error handling and logging for service imports (Required)
# TODO: Add type hints to imported services for better IDE support (Optional)