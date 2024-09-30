"""
Initializes the middleware package and exports the JWT authentication and logging middleware.
"""

from .jwt_auth import JWTAuthMiddleware
from .logging import LoggingMiddleware

__all__ = ['JWTAuthMiddleware', 'LoggingMiddleware']

# Human tasks:
# TODO: Implement the JWT authentication middleware in jwt_auth.py
# TODO: Implement the logging middleware in logging.py