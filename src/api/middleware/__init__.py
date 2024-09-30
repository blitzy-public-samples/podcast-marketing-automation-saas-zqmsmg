"""
Initializes the middleware package and imports middleware components for the Podcast Marketing Automation SaaS platform's API.
"""

from .jwt_auth import JWTAuthMiddleware
from .logging import LoggingMiddleware

__all__ = ['JWTAuthMiddleware', 'LoggingMiddleware']

# Human Tasks:
# TODO: Implement the JWTAuthMiddleware in jwt_auth.py
# TODO: Implement the LoggingMiddleware in logging.py