import os
import psycopg2
import logging
from typing import Optional

# Assuming these functions will be implemented in the database.py file
from src.database.config.database import get_connection, close_connection

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define the path to the migrations directory
MIGRATIONS_DIR = os.path.join(os.path.dirname(__file__), '..', 'migrations')

def get_current_version() -> int:
    """
    Retrieves the current migration version from the database.
    
    Returns:
        int: The current migration version number
    """
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            cur.execute("SELECT version FROM migrations ORDER BY version DESC LIMIT 1")
            result = cur.fetchone()
            return result[0] if result else 0
    except psycopg2.Error as e:
        logger.error(f"Error retrieving current version: {e}")
        return 0
    finally:
        close_connection(conn)

def apply_migration(migration_file: str, version: int) -> bool:
    """
    Applies a single migration to the database.
    
    Args:
        migration_file (str): The name of the migration file to apply
        version (int): The version number of the migration
    
    Returns:
        bool: True if the migration was successful, False otherwise
    """
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            # Read and execute the migration SQL
            with open(os.path.join(MIGRATIONS_DIR, migration_file), 'r') as f:
                migration_sql = f.read()
            cur.execute(migration_sql)
            
            # Update the migrations table
            cur.execute("INSERT INTO migrations (version) VALUES (%s)", (version,))
            conn.commit()
        logger.info(f"Successfully applied migration: {migration_file}")
        return True
    except psycopg2.Error as e:
        logger.error(f"Error applying migration {migration_file}: {e}")
        conn.rollback()
        return False
    finally:
        close_connection(conn)

def rollback_migration(migration_file: str, version: int) -> bool:
    """
    Rolls back a single migration in the database.
    
    Args:
        migration_file (str): The name of the migration file to roll back
        version (int): The version number of the migration to roll back
    
    Returns:
        bool: True if the rollback was successful, False otherwise
    """
    try:
        conn = get_connection()
        with conn.cursor() as cur:
            # Read and execute the rollback SQL
            with open(os.path.join(MIGRATIONS_DIR, migration_file), 'r') as f:
                rollback_sql = f.read().split('-- DOWN')[1].strip()
            cur.execute(rollback_sql)
            
            # Update the migrations table
            cur.execute("DELETE FROM migrations WHERE version = %s", (version,))
            conn.commit()
        logger.info(f"Successfully rolled back migration: {migration_file}")
        return True
    except psycopg2.Error as e:
        logger.error(f"Error rolling back migration {migration_file}: {e}")
        conn.rollback()
        return False
    finally:
        close_connection(conn)

def run_migrations() -> None:
    """
    Runs all pending migrations in the database.
    """
    current_version = get_current_version()
    migration_files = sorted([f for f in os.listdir(MIGRATIONS_DIR) if f.endswith('.sql')])
    
    for migration_file in migration_files:
        file_version = int(migration_file.split('_')[0])
        if file_version > current_version:
            if apply_migration(migration_file, file_version):
                logger.info(f"Applied migration: {migration_file}")
            else:
                logger.error(f"Failed to apply migration: {migration_file}")
                break

def rollback_migrations(target_version: int) -> None:
    """
    Rolls back migrations to a specified version.
    
    Args:
        target_version (int): The version to roll back to
    """
    current_version = get_current_version()
    migration_files = sorted([f for f in os.listdir(MIGRATIONS_DIR) if f.endswith('.sql')], reverse=True)
    
    for migration_file in migration_files:
        file_version = int(migration_file.split('_')[0])
        if current_version > target_version and file_version > target_version:
            if rollback_migration(migration_file, file_version):
                logger.info(f"Rolled back migration: {migration_file}")
                current_version = file_version - 1
            else:
                logger.error(f"Failed to roll back migration: {migration_file}")
                break

# Human tasks (commented as requested)
"""
Human tasks:
1. Create a migrations table in the database to track migration versions (Critical)
2. Implement a naming convention for migration files (e.g., 001_initial.sql, 002_add_users.sql) (Required)
3. Set up proper error handling and logging for migration processes (Required)
4. Create a CLI command or management script to run migrations easily (Optional)
"""