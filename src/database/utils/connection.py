import contextlib
from typing import List, Any, Optional
from src.database.config import connection_pool

def get_connection():
    """
    Retrieves a connection from the connection pool.

    Returns:
        psycopg2.extensions.connection: A database connection
    """
    return connection_pool.get_connection()

def return_connection(conn):
    """
    Returns a connection back to the connection pool.

    Args:
        conn (psycopg2.extensions.connection): The connection to be returned
    """
    connection_pool.return_connection(conn)

def execute_query(query: str, params: tuple) -> List[Any]:
    """
    Executes a SQL query using a connection from the pool.

    Args:
        query (str): The SQL query to execute
        params (tuple): The parameters for the SQL query

    Returns:
        List[Any]: A list of query results

    Raises:
        Exception: If there's an error executing the query
    """
    conn = None
    try:
        conn = get_connection()
        with conn.cursor() as cursor:
            cursor.execute(query, params)
            results = cursor.fetchall()
        return results
    except Exception as e:
        # Log the error here
        raise e
    finally:
        if conn:
            return_connection(conn)

def execute_transaction(queries: List[tuple]) -> bool:
    """
    Executes a series of SQL queries as a single transaction.

    Args:
        queries (List[tuple]): A list of tuples, each containing a query string and its parameters

    Returns:
        bool: True if the transaction was successful, False otherwise

    Raises:
        Exception: If there's an error executing the transaction
    """
    conn = None
    try:
        conn = get_connection()
        conn.autocommit = False
        with conn.cursor() as cursor:
            for query, params in queries:
                cursor.execute(query, params)
        conn.commit()
        return True
    except Exception as e:
        # Log the error here
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.autocommit = True
            return_connection(conn)

@contextlib.contextmanager
def DatabaseConnection():
    """
    A context manager for handling database connections safely.

    Yields:
        psycopg2.extensions.connection: A database connection

    Raises:
        Exception: If there's an error acquiring or using the connection
    """
    connection = None
    try:
        connection = get_connection()
        yield connection
    except Exception as e:
        # Log the error here
        raise e
    finally:
        if connection:
            return_connection(connection)

# Human tasks (commented as requested):
# TODO: Implement proper error handling and logging for database connection issues
# TODO: Consider adding a connection health check function to ensure connections are valid before use
# TODO: Review and optimize the execute_query and execute_transaction functions for performance