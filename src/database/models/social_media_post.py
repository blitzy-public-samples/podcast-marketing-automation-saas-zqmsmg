from src.database.models.base import BaseModel
from typing import List, Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from src.database.config.database import get_db_connection

class SocialMediaPost(BaseModel):
    table_name = 'social_media_posts'
    fields = ["id", "marketing_content_id", "platform", "content", "scheduled_time", "post_id", "status", "created_at", "updated_at"]

    def __init__(self, data: Dict[str, Any]):
        super().__init__(data)
        # Initialize any additional SocialMediaPost-specific attributes here if needed

    @classmethod
    def get_by_marketing_content_id(cls, marketing_content_id: int) -> List['SocialMediaPost']:
        """
        Retrieves all social media posts associated with a specific marketing content.

        Args:
            marketing_content_id (int): The ID of the marketing content.

        Returns:
            List[SocialMediaPost]: A list of SocialMediaPost instances.

        Raises:
            psycopg2.Error: If there's an issue with the database connection or query execution.
        """
        try:
            with get_db_connection() as conn:
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    query = f"""
                    SELECT * FROM {cls.table_name}
                    WHERE marketing_content_id = %s
                    ORDER BY scheduled_time ASC
                    """
                    cur.execute(query, (marketing_content_id,))
                    rows = cur.fetchall()
                    return [cls(dict(row)) for row in rows]
        except psycopg2.Error as e:
            # Log the error here
            print(f"Database error: {e}")
            raise

    def update_status(self, new_status: str) -> bool:
        """
        Updates the status of the social media post.

        Args:
            new_status (str): The new status to set for the post.

        Returns:
            bool: True if the update was successful, False otherwise.

        Raises:
            psycopg2.Error: If there's an issue with the database connection or query execution.
        """
        try:
            self.status = new_status
            return self.save()
        except psycopg2.Error as e:
            # Log the error here
            print(f"Database error: {e}")
            return False

# Pending human tasks:
# TODO: Implement proper error handling for database operations specific to SocialMediaPost
# TODO: Add validation for social media post content and scheduled time
# TODO: Implement a method to handle post rescheduling