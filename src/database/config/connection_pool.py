import psycopg2
from psycopg2.pool import ThreadedConnectionPool
import threading

# Global variables
connection_pool = None
pool_lock = threading.Lock()

def create_connection_pool(db_config):
    """
    Creates and initializes the database connection pool.

    Args:
        db_config (dict): A dictionary containing database configuration parameters.

    Returns:
        psycopg2.pool.ThreadedConnectionPool: An instance of ThreadedConnectionPool
    """
    global connection_pool
    try:
        # Create a ThreadedConnectionPool using the provided db_config
        pool = ThreadedConnectionPool(
            minconn=db_config.get('min_connections', 1),
            maxconn=db_config.get('max_connections', 10),
            host=db_config['host'],
            port=db_config['port'],
            dbname=db_config['dbname'],
            user=db_config['user'],
            password=db_config['password']
        )
        
        # Set the global connection_pool variable
        with pool_lock:
            connection_pool = pool
        
        return pool
    except psycopg2.Error as e:
        # Log the error and raise an exception
        print(f"Error creating connection pool: {e}")
        raise

def get_connection():
    """
    Retrieves a connection from the pool.

    Returns:
        psycopg2.extensions.connection: A database connection
    """
    global connection_pool
    try:
        # Acquire the pool_lock
        with pool_lock:
            # Get a connection from the connection_pool
            if connection_pool is None:
                raise Exception("Connection pool has not been initialized")
            return connection_pool.getconn()
    except psycopg2.pool.PoolError as e:
        # Log the error and raise an exception
        print(f"Error getting connection from pool: {e}")
        raise

def return_connection(conn):
    """
    Returns a connection back to the pool.

    Args:
        conn (psycopg2.extensions.connection): The connection to be returned
    """
    global connection_pool
    try:
        # Acquire the pool_lock
        with pool_lock:
            # Return the connection to the connection_pool
            if connection_pool is None:
                raise Exception("Connection pool has not been initialized")
            connection_pool.putconn(conn)
    except psycopg2.pool.PoolError as e:
        # Log the error and raise an exception
        print(f"Error returning connection to pool: {e}")
        raise

def close_all_connections():
    """
    Closes all connections in the pool and shuts down the pool.
    """
    global connection_pool
    try:
        # Acquire the pool_lock
        with pool_lock:
            # Close all connections in the connection_pool
            if connection_pool is not None:
                connection_pool.closeall()
                # Set the global connection_pool to None
                connection_pool = None
    except psycopg2.pool.PoolError as e:
        # Log the error and raise an exception
        print(f"Error closing all connections: {e}")
        raise

# TODO: Determine the optimal min_connections and max_connections values for the ThreadedConnectionPool based on expected load and server capacity
# TODO: Implement proper error handling and connection validation to ensure robustness of the connection pool
# TODO: Consider implementing a connection pool monitoring system to track pool usage and performance