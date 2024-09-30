import logging
import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger(__name__)

class LoggingMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)
        # Initialize any necessary logging configurations
        logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

    async def dispatch(self, request: Request, call_next):
        # Log the incoming request details
        logger.info(f"Incoming request: {request.method} {request.url}")
        logger.info(f"Request headers: {request.headers}")

        # Record the start time
        start_time = time.time()

        # Call the next middleware or view and await the response
        try:
            response = await call_next(request)
        except Exception as e:
            # Log any exceptions that occur during request processing
            logger.error(f"Exception occurred while processing request: {str(e)}", exc_info=True)
            raise

        # Calculate the request duration
        duration = time.time() - start_time

        # Log the outgoing response details
        logger.info(f"Response status code: {response.status_code}")
        logger.info(f"Request duration: {duration:.2f} seconds")

        return response

# Human tasks (commented)
"""
TODO: Implement error handling and logging for exceptional cases
TODO: Configure log levels and formats based on the environment (development, production)
TODO: Implement log rotation and archiving strategy
TODO: Add request body logging for non-sensitive endpoints
"""