from datetime import datetime
from src.database.models.base import BaseModel

class Analytics(BaseModel):
    """Model class for podcast analytics data"""

    table_name = 'analytics'

    def __init__(self, data: dict):
        """
        Initializes a new instance of the Analytics model

        Args:
            data (dict): A dictionary containing the analytics data
        """
        super().__init__(data)
        self.fields = [
            'id',
            'episode_id',
            'downloads',
            'likes',
            'shares',
            'comments',
            'date'
        ]

    @classmethod
    def get_by_episode_id(cls, episode_id: int) -> list['Analytics']:
        """
        Retrieves all analytics entries for a specific episode

        Args:
            episode_id (int): The ID of the episode

        Returns:
            list: A list of Analytics instances for the given episode
        """
        conn = cls.get_db_connection()
        try:
            query = f"SELECT * FROM {cls.table_name} WHERE episode_id = %s"
            cursor = conn.cursor()
            cursor.execute(query, (episode_id,))
            rows = cursor.fetchall()
            return [cls(dict(zip(cls().fields, row))) for row in rows]
        finally:
            conn.close()

    @classmethod
    def get_by_date_range(cls, start_date: datetime, end_date: datetime) -> list['Analytics']:
        """
        Retrieves analytics entries within a specific date range

        Args:
            start_date (datetime): The start date of the range
            end_date (datetime): The end date of the range

        Returns:
            list: A list of Analytics instances within the given date range
        """
        conn = cls.get_db_connection()
        try:
            query = f"SELECT * FROM {cls.table_name} WHERE date BETWEEN %s AND %s"
            cursor = conn.cursor()
            cursor.execute(query, (start_date, end_date))
            rows = cursor.fetchall()
            return [cls(dict(zip(cls().fields, row))) for row in rows]
        finally:
            conn.close()

    @classmethod
    def aggregate_by_episode(cls, episode_id: int) -> dict:
        """
        Aggregates analytics data for a specific episode

        Args:
            episode_id (int): The ID of the episode

        Returns:
            dict: A dictionary containing aggregated analytics data for the episode
        """
        conn = cls.get_db_connection()
        try:
            query = f"""
                SELECT 
                    SUM(downloads) as total_downloads,
                    SUM(likes) as total_likes,
                    SUM(shares) as total_shares,
                    SUM(comments) as total_comments,
                    AVG(downloads) as avg_downloads,
                    AVG(likes) as avg_likes,
                    AVG(shares) as avg_shares,
                    AVG(comments) as avg_comments
                FROM {cls.table_name}
                WHERE episode_id = %s
            """
            cursor = conn.cursor()
            cursor.execute(query, (episode_id,))
            row = cursor.fetchone()
            return dict(zip([
                'total_downloads', 'total_likes', 'total_shares', 'total_comments',
                'avg_downloads', 'avg_likes', 'avg_shares', 'avg_comments'
            ], row))
        finally:
            conn.close()

# Human tasks:
# TODO: Implement data validation for analytics entries (e.g., ensure non-negative values for downloads, likes, etc.)
# TODO: Add indexing on the episode_id and date columns for improved query performance
# TODO: Implement a method for bulk insertion of analytics data for better performance when processing large datasets