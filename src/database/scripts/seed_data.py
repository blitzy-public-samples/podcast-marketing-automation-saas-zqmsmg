import psycopg2
from faker import Faker
from datetime import datetime, timedelta
import random
from src.database.config.database import get_connection, close_connection

# Initialize Faker
FAKE = Faker()

# Constants for seeding
NUM_USERS = 10
NUM_PODCASTS_PER_USER = 2
NUM_EPISODES_PER_PODCAST = 5

def seed_users(cursor):
    """
    Creates and inserts sample user data into the database.
    
    Args:
        cursor (psycopg2.extensions.cursor): Database cursor
    
    Returns:
        list: A list of created user IDs
    """
    user_ids = []
    for _ in range(NUM_USERS):
        first_name = FAKE.first_name()
        last_name = FAKE.last_name()
        email = FAKE.email()
        password_hash = FAKE.sha256()  # In a real scenario, use proper password hashing
        created_at = FAKE.date_time_between(start_date='-1y', end_date='now')
        
        cursor.execute("""
            INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (first_name, last_name, email, password_hash, created_at, created_at))
        
        user_id = cursor.fetchone()[0]
        user_ids.append(user_id)
    
    return user_ids

def seed_podcasts(cursor, user_ids):
    """
    Creates and inserts sample podcast data into the database.
    
    Args:
        cursor (psycopg2.extensions.cursor): Database cursor
        user_ids (list): List of user IDs
    
    Returns:
        list: A list of created podcast IDs
    """
    podcast_ids = []
    for user_id in user_ids:
        for _ in range(NUM_PODCASTS_PER_USER):
            title = FAKE.catch_phrase()
            description = FAKE.paragraph()
            cover_image_url = FAKE.image_url()
            created_at = FAKE.date_time_between(start_date='-1y', end_date='now')
            
            cursor.execute("""
                INSERT INTO podcasts (user_id, title, description, cover_image_url, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (user_id, title, description, cover_image_url, created_at, created_at))
            
            podcast_id = cursor.fetchone()[0]
            podcast_ids.append(podcast_id)
    
    return podcast_ids

def seed_episodes(cursor, podcast_ids):
    """
    Creates and inserts sample episode data into the database.
    
    Args:
        cursor (psycopg2.extensions.cursor): Database cursor
        podcast_ids (list): List of podcast IDs
    """
    for podcast_id in podcast_ids:
        for _ in range(NUM_EPISODES_PER_PODCAST):
            title = FAKE.sentence()
            description = FAKE.paragraph()
            audio_file_url = FAKE.url()
            status = random.choice(['draft', 'published', 'archived'])
            publish_date = FAKE.date_time_between(start_date='-1y', end_date='+1m')
            created_at = FAKE.date_time_between(start_date='-1y', end_date='now')
            
            cursor.execute("""
                INSERT INTO episodes (podcast_id, title, description, audio_file_url, status, publish_date, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (podcast_id, title, description, audio_file_url, status, publish_date, created_at, created_at))

def main():
    """
    The main function that orchestrates the seeding process.
    """
    try:
        # Get a database connection
        conn = get_connection()
        cursor = conn.cursor()
        
        # Seed users
        user_ids = seed_users(cursor)
        print(f"Created {len(user_ids)} sample users.")
        
        # Seed podcasts
        podcast_ids = seed_podcasts(cursor, user_ids)
        print(f"Created {len(podcast_ids)} sample podcasts.")
        
        # Seed episodes
        seed_episodes(cursor, podcast_ids)
        print(f"Created {len(podcast_ids) * NUM_EPISODES_PER_PODCAST} sample episodes.")
        
        # Commit the transaction
        conn.commit()
        print("All sample data has been successfully inserted.")
        
    except (Exception, psycopg2.Error) as error:
        print(f"Error while seeding data: {error}")
    
    finally:
        # Close the cursor and connection
        if cursor:
            cursor.close()
        if conn:
            close_connection(conn)

if __name__ == "__main__":
    main()

# Human tasks:
# TODO: Review and adjust the number of sample entities (NUM_USERS, NUM_PODCASTS_PER_USER, NUM_EPISODES_PER_PODCAST) based on testing needs
# TODO: Ensure that the seed data script is not accidentally run in a production environment