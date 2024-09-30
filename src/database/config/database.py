import os
import psycopg2
from src.database.config.connection_pool import ConnectionPool

# Global variables
DATABASE_URL = os.getenv('DATABASE_URL')
MAX_CONNECTIONS = int(os.getenv('DB_MAX_CONNECTIONS', 10))

# Initialize the connection pool
connection_pool = None

def get_database_config():
    """
    Returns a dictionary containing the database configuration parameters.

    Returns:
        dict: A dictionary with database configuration parameters
    """
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL environment variable is not set")

    # Parse the DATABASE_URL to extract connection parameters
    params = psycopg2.extensions.parse_dsn(DATABASE_URL)

    # Add additional configuration parameters
    params['max_connections'] = MAX_CONNECTIONS

    return params

def initialize_database():
    """
    Initializes the database connection pool and performs any necessary setup.
    """
    global connection_pool

    config = get_database_config()
    connection_pool = ConnectionPool(
        min_connections=1,
        max_connections=config['max_connections'],
        **config
    )

    # Perform any additional database setup if needed
    # For example, you could create tables or indexes here if required

def get_connection():
    """
    Returns a database connection from the connection pool.

    Returns:
        connection: A database connection object
    """
    if connection_pool is None:
        raise RuntimeError("Database connection pool has not been initialized")

    return connection_pool.get_connection()

def close_connection(connection):
    """
    Closes a database connection and returns it to the connection pool.

    Args:
        connection: The database connection to be closed
    """
    if connection_pool is None:
        raise RuntimeError("Database connection pool has not been initialized")

    connection_pool.return_connection(connection)

# Initialize the database connection pool when this module is imported
initialize_database()

# Human tasks (commented out as requested)
"""
Human tasks:
1. [Critical] Set up the DATABASE_URL environment variable with the correct PostgreSQL connection string
2. [Required] Configure the DB_MAX_CONNECTIONS environment variable based on the expected load and server capacity
"""