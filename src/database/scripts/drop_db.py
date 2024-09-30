import psycopg2
import argparse
import sys
from src.database.config.database import get_database_config

def drop_database():
    """
    Drops the database specified in the database configuration.

    Returns:
        bool: True if the database was successfully dropped, False otherwise
    """
    try:
        # Get the database configuration
        db_config = get_database_config()

        # Create a connection to the PostgreSQL server (not the specific database)
        conn = psycopg2.connect(
            host=db_config['host'],
            port=db_config['port'],
            user=db_config['user'],
            password=db_config['password'],
            database='postgres'  # Connect to the default 'postgres' database
        )

        # Set autocommit to True to allow database dropping
        conn.autocommit = True

        # Create a cursor object
        cursor = conn.cursor()

        # Execute the DROP DATABASE command
        cursor.execute(f"DROP DATABASE IF EXISTS {db_config['database']}")

        # Close the cursor and connection
        cursor.close()
        conn.close()

        print(f"Database '{db_config['database']}' has been successfully dropped.")
        return True

    except Exception as e:
        print(f"An error occurred while dropping the database: {str(e)}")
        return False

def main():
    """
    The main function that handles command-line arguments and calls the drop_database function.

    Returns:
        int: 0 if successful, 1 if an error occurred
    """
    parser = argparse.ArgumentParser(description="Drop the database for the Podcast Marketing Automation SaaS platform.")
    parser.add_argument('--force', action='store_true', help="Force database drop without confirmation")
    args = parser.parse_args()

    if not args.force:
        confirmation = input("Are you sure you want to drop the database? This action cannot be undone. (y/N): ")
        if confirmation.lower() != 'y':
            print("Database drop cancelled.")
            return 0

    if drop_database():
        return 0
    else:
        return 1

if __name__ == "__main__":
    sys.exit(main())

# Human Tasks:
# - Review and approve the database dropping process (Critical)
# - Ensure proper access controls are in place to restrict the use of this script (Critical)
# - Set up a backup process before running this script in any environment (Required)