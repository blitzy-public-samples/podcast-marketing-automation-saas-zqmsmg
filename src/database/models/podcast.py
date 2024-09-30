from datetime import datetime
from typing import List, Dict, Any
from src.database.models.base import BaseModel
from src.database.utils.connection import get_db_connection


class Podcast(BaseModel):
    """
    Represents a podcast in the system.
    """

    def __init__(self, data: Dict[str, Any]):
        """
        Initializes a new instance of the Podcast model.

        Args:
            data (Dict[str, Any]): A dictionary containing the podcast data.
        """
        super().__init__(data)
        self.table_name = 'podcasts'
        self.fields = [
            'id',
            'title',
            'description',
            'cover_image_url',
            'user_id',
            'created_at',
            'updated_at'
        ]

    def get_episodes(self) -> List[Dict[str, Any]]:
        """
        Retrieves all episodes associated with this podcast.

        Returns:
            List[Dict[str, Any]]: A list of Episode model instances.
        """
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                query = """
                SELECT * FROM episodes
                WHERE podcast_id = %s
                ORDER BY publish_date DESC
                """
                cursor.execute(query, (self.id,))
                episodes = cursor.fetchall()
            
            # Import here to avoid circular import
            from src.database.models.episode import Episode
            return [Episode(episode) for episode in episodes]
        finally:
            connection.close()

    def update_cover_image(self, new_image_url: str) -> bool:
        """
        Updates the cover image URL for the podcast.

        Args:
            new_image_url (str): The new URL for the podcast cover image.

        Returns:
            bool: True if the update was successful, False otherwise.
        """
        self.cover_image_url = new_image_url
        self.updated_at = datetime.utcnow()
        return self.save()

    def get_total_episodes(self) -> int:
        """
        Retrieves the total number of episodes for this podcast.

        Returns:
            int: The total number of episodes.
        """
        connection = get_db_connection()
        try:
            with connection.cursor() as cursor:
                query = """
                SELECT COUNT(*) FROM episodes
                WHERE podcast_id = %s
                """
                cursor.execute(query, (self.id,))
                result = cursor.fetchone()
            return result[0] if result else 0
        finally:
            connection.close()

# Human tasks (to be implemented):
# TODO: Implement data validation for podcast properties (e.g., title length, valid URL for cover image)
# TODO: Add methods for podcast analytics and performance metrics
# TODO: Implement caching mechanism for frequently accessed podcast data