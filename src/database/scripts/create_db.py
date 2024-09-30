import psycopg2
import logging
from src.database.config.database import get_database_config, get_connection, close_connection

# Set up logging
logger = logging.getLogger(__name__)

def create_tables(connection):
    """
    Creates all the necessary tables in the database.
    
    Args:
        connection (psycopg2.connection): The database connection object.
    """
    try:
        with connection.cursor() as cursor:
            # Create users table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    role VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create podcasts table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS podcasts (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    cover_image_url VARCHAR(255),
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create episodes table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS episodes (
                    id SERIAL PRIMARY KEY,
                    podcast_id INTEGER REFERENCES podcasts(id),
                    title VARCHAR(255) NOT NULL,
                    description TEXT,
                    audio_file_url VARCHAR(255) NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    publish_date TIMESTAMP WITH TIME ZONE,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create transcripts table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS transcripts (
                    id SERIAL PRIMARY KEY,
                    episode_id INTEGER REFERENCES episodes(id),
                    content TEXT NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create marketing_content table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS marketing_content (
                    id SERIAL PRIMARY KEY,
                    episode_id INTEGER REFERENCES episodes(id),
                    platform VARCHAR(50) NOT NULL,
                    content TEXT NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create social_media_posts table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS social_media_posts (
                    id SERIAL PRIMARY KEY,
                    marketing_content_id INTEGER REFERENCES marketing_content(id),
                    platform VARCHAR(50) NOT NULL,
                    post_id VARCHAR(255),
                    scheduled_time TIMESTAMP WITH TIME ZONE,
                    status VARCHAR(50) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create analytics table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS analytics (
                    id SERIAL PRIMARY KEY,
                    episode_id INTEGER REFERENCES episodes(id),
                    downloads INTEGER DEFAULT 0,
                    likes INTEGER DEFAULT 0,
                    shares INTEGER DEFAULT 0,
                    comments INTEGER DEFAULT 0,
                    date DATE NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            """)

        connection.commit()
        logger.info("All tables created successfully")
    except psycopg2.Error as e:
        logger.error(f"Error creating tables: {e}")
        connection.rollback()
        raise

def initialize_data(connection):
    """
    Inserts any initial data required for the application to function.
    
    Args:
        connection (psycopg2.connection): The database connection object.
    """
    try:
        with connection.cursor() as cursor:
            # Insert default user roles
            cursor.execute("""
                INSERT INTO users (email, password_hash, role)
                VALUES 
                ('admin@example.com', 'hashed_password', 'admin'),
                ('user@example.com', 'hashed_password', 'user')
                ON CONFLICT (email) DO NOTHING
            """)

            # Insert sample podcast
            cursor.execute("""
                INSERT INTO podcasts (user_id, title, description)
                VALUES 
                (1, 'Sample Podcast', 'This is a sample podcast for testing')
                ON CONFLICT DO NOTHING
            """)

        connection.commit()
        logger.info("Initial data inserted successfully")
    except psycopg2.Error as e:
        logger.error(f"Error inserting initial data: {e}")
        connection.rollback()
        raise

def main():
    """
    The main function that orchestrates the database creation process.
    """
    try:
        # Get the database configuration
        db_config = get_database_config()
        
        # Establish a connection to the database
        connection = get_connection(db_config)
        
        # Create tables
        create_tables(connection)
        
        # Initialize data
        initialize_data(connection)
        
        # Close the database connection
        close_connection(connection)
        
        logger.info("Database creation and initialization completed successfully")
    except Exception as e:
        logger.error(f"Error in database creation process: {e}")
        raise

if __name__ == "__main__":
    main()

# Human tasks:
# 1. Review and approve the database schema created by this script
# 2. Ensure that the initial data inserted by this script is appropriate for the production environment
# 3. Set up proper error handling and logging for database creation failures