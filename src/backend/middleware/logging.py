import logging
import time
from django.utils.deprecation import MiddlewareMixin

# Configure logger
logger = logging.getLogger(__name__)

class LoggingMiddleware(MiddlewareMixin):
    """
    Middleware class for logging HTTP requests and responses in the Podcast Marketing Automation SaaS platform.
    """

    def __init__(self, get_response):
        super().__init__(get_response)
        # No additional initialization needed

    def process_request(self, request):
        """
        Logs the incoming HTTP request.

        Args:
            request: The incoming HTTP request object.

        Returns:
            None
        """
        # Get the current timestamp
        request.start_time = time.time()

        # Extract relevant information from the request
        method = request.method
        path = request.path
        ip = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')

        # Log the request information
        logger.info(f"Incoming request: {method} {path} from IP: {ip} User-Agent: {user_agent}")

    def process_response(self, request, response):
        """
        Logs the outgoing HTTP response.

        Args:
            request: The HTTP request object.
            response: The HTTP response object.

        Returns:
            The original response object.
        """
        # Get the current timestamp
        end_time = time.time()

        # Calculate the request processing time
        processing_time = end_time - request.start_time

        # Extract relevant information from the response
        status_code = response.status_code
        content_length = len(response.content)

        # Log the response information
        logger.info(f"Outgoing response: Status: {status_code} Content-Length: {content_length} "
                    f"Processing Time: {processing_time:.2f}s")

        # Return the original response
        return response

# Human tasks (commented)
"""
Human tasks for logging middleware:
1. Review and adjust log levels based on the production environment requirements (Optional)
2. Implement log rotation and archiving strategy (Required)
3. Ensure compliance with data privacy regulations (e.g., GDPR) in logged information (Required)
"""