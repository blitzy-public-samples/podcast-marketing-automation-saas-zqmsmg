from datetime import datetime
from src.database.models.base import BaseModel

class Transcript(BaseModel):
    table_name = 'transcripts'
    fields = ['id', 'episode_id', 'content', 'created_at', 'updated_at']

    def __init__(self, id: int, episode_id: int, content: str, created_at: datetime, updated_at: datetime):
        """
        Initializes a new instance of the Transcript model

        Args:
            id (int): The unique identifier for the transcript
            episode_id (int): The ID of the associated episode
            content (str): The content of the transcript
            created_at (datetime): The timestamp when the transcript was created
            updated_at (datetime): The timestamp when the transcript was last updated
        """
        super().__init__(
            id=id,
            episode_id=episode_id,
            content=content,
            created_at=created_at,
            updated_at=updated_at
        )

    @classmethod
    def get_by_episode_id(cls, episode_id: int) -> 'Transcript':
        """
        Retrieves a transcript by its associated episode ID

        Args:
            episode_id (int): The ID of the episode to fetch the transcript for

        Returns:
            Transcript: The transcript instance if found, None otherwise
        """
        # Get a database connection
        connection = cls.get_db_connection()

        try:
            # Construct a SELECT SQL query to fetch the transcript by episode_id
            query = f"SELECT * FROM {cls.table_name} WHERE episode_id = %s"
            
            # Execute the query with the provided episode_id
            with connection.cursor() as cursor:
                cursor.execute(query, (episode_id,))
                result = cursor.fetchone()

            # Create a new Transcript instance with the retrieved data if found
            if result:
                return cls(**dict(zip(cls.fields, result)))
            else:
                return None
        finally:
            # Close the connection
            connection.close()

    def update_content(self, new_content: str) -> bool:
        """
        Updates the content of the transcript

        Args:
            new_content (str): The new content for the transcript

        Returns:
            bool: True if the update was successful, False otherwise
        """
        # Set the new content for the transcript
        self.content = new_content

        # Update the updated_at timestamp
        self.updated_at = datetime.utcnow()

        # Call the save method to persist the changes
        return self.save()

# Human tasks (commented list)
"""
Human tasks for future improvements:
1. Implement full-text search functionality for transcripts (Optional)
2. Add support for storing timestamps with transcript segments (Optional)
3. Implement caching mechanism for frequently accessed transcripts (Optional)
"""