"""
Initialization file for the database tests package.

This file is used to set up test configurations, import necessary modules,
and define any shared fixtures or utilities for database-related tests.
"""

# Import necessary modules for testing
import pytest
from src.database.config.database import get_db_connection
from src.database.utils.connection import close_db_connection

# Define any shared fixtures or utilities for database tests

@pytest.fixture(scope="session")
def db_connection():
    """
    Fixture to provide a database connection for tests.
    
    This fixture creates a database connection at the beginning of the test session
    and closes it at the end.
    """
    connection = get_db_connection()
    yield connection
    close_db_connection(connection)

@pytest.fixture(scope="function")
def db_transaction(db_connection):
    """
    Fixture to provide a database transaction for each test function.
    
    This fixture starts a new transaction before each test and rolls it back
    after the test, ensuring test isolation.
    """
    transaction = db_connection.begin()
    yield db_connection
    transaction.rollback()

# Add any additional setup code or imports as needed for database tests

# You can also define helper functions or classes that might be useful across multiple test files

def clear_test_data(connection):
    """
    Helper function to clear test data from the database.
    
    This function can be used to clean up the database after tests.
    """
    # Implement the logic to clear test data
    # For example:
    # connection.execute("DELETE FROM users WHERE is_test = TRUE")
    # connection.execute("DELETE FROM podcasts WHERE is_test = TRUE")
    pass

# Human tasks (commented as requested):
# TODO: Review and confirm the test structure and any shared configurations needed for database tests
# TODO: Determine if any specific test setup or teardown procedures are required for the database tests