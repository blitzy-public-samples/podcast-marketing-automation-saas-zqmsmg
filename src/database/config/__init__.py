import os
import logging
from .database import DATABASE_CONFIG
from .connection_pool import ConnectionPool

# Set up logging
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Initialize the connection pool
CONNECTION_POOL = None

def initialize_database_config():
    """
    Initializes the database configuration by loading settings and setting up the connection pool.
    """
    global CONNECTION_POOL

    try:
        # Import database settings from database.py
        # DATABASE_CONFIG is already imported at the top

        # Import connection pool setup from connection_pool.py
        # ConnectionPool is already imported at the top

        # Set up logging for database operations
        logger.info("Initializing database configuration")

        # Initialize the database configuration
        # This step is not explicitly needed as DATABASE_CONFIG is imported directly

        # Set up the connection pool
        CONNECTION_POOL = ConnectionPool(DATABASE_CONFIG)
        logger.info("Connection pool initialized successfully")

        # Log successful initialization
        logger.info("Database configuration initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database configuration: {str(e)}")
        raise

# Automatically initialize the database configuration when this module is imported
initialize_database_config()

# Export the global variables
__all__ = ['DATABASE_CONFIG', 'CONNECTION_POOL', 'logger']

# Human tasks (commented out as requested in the specification)
"""
Human tasks:
1. Review and confirm database configuration settings (Required)
2. Ensure proper error handling and logging mechanisms are in place (Required)
3. Verify that the connection pool settings are optimized for the expected load (Required)
"""