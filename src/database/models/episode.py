from datetime import datetime
from src.database.models.base import BaseModel

class Episode(BaseModel):
    """
    Represents a podcast episode in the system.
    """

    def __init__(self, data: dict):
        """
        Initializes a new instance of the Episode model.

        Args:
            data (dict): A dictionary containing the episode data.
        """
        super().__init__(data)
        self.table_name = 'episodes'
        self.fields = [
            'id',
            'podcast_id',
            'title',
            'description',
            'audio_file_url',
            'status',
            'publish_date',
            'created_at',
            'updated_at'
        ]

    @classmethod
    def get_by_podcast_id(cls, podcast_id: int) -> list:
        """
        Retrieves all episodes for a given podcast ID.

        Args:
            podcast_id (int): The ID of the podcast.

        Returns:
            list: A list of Episode instances.
        """
        connection = cls.get_db_connection()
        try:
            cursor = connection.cursor()
            query = f"SELECT * FROM {cls.table_name} WHERE podcast_id = %s ORDER BY publish_date DESC"
            cursor.execute(query, (podcast_id,))
            rows = cursor.fetchall()
            return [cls(dict(zip(cls.fields, row))) for row in rows]
        finally:
            connection.close()

    def update_status(self, new_status: str) -> bool:
        """
        Updates the status of the episode.

        Args:
            new_status (str): The new status of the episode.

        Returns:
            bool: True if the update was successful, False otherwise.
        """
        self.status = new_status
        return self.save()

    @classmethod
    def get_recent_episodes(cls, limit: int) -> list:
        """
        Retrieves the most recent episodes.

        Args:
            limit (int): The maximum number of episodes to retrieve.

        Returns:
            list: A list of the most recent Episode instances.
        """
        connection = cls.get_db_connection()
        try:
            cursor = connection.cursor()
            query = f"SELECT * FROM {cls.table_name} ORDER BY publish_date DESC LIMIT %s"
            cursor.execute(query, (limit,))
            rows = cursor.fetchall()
            return [cls(dict(zip(cls.fields, row))) for row in rows]
        finally:
            connection.close()

# TODO: Implement validation for episode data (e.g., title length, valid audio file URL)
# TODO: Add methods for handling episode analytics and marketing content generation
# TODO: Implement caching mechanism for frequently accessed episodes (Optional)