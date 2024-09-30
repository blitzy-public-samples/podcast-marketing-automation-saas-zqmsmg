import abc
from typing import List, Dict, Any
from src.database.config.database import get_connection, close_connection

class BaseModel(abc.ABC):
    table_name: str
    fields: List[str]

    def __init__(self, data: Dict[str, Any]):
        """
        Initializes a new instance of the BaseModel.

        Args:
            data (Dict[str, Any]): The data to initialize the model with.
        """
        for field in self.fields:
            setattr(self, field, data.get(field))

    @abc.abstractmethod
    def save(self) -> bool:
        """
        Saves the current model instance to the database.

        Returns:
            bool: True if the save operation was successful, False otherwise.
        """
        try:
            conn = get_connection()
            cursor = conn.cursor()

            if hasattr(self, 'id') and self.id:
                # Update existing record
                set_clause = ', '.join([f"{field} = %s" for field in self.fields if field != 'id'])
                values = [getattr(self, field) for field in self.fields if field != 'id']
                values.append(self.id)
                query = f"UPDATE {self.table_name} SET {set_clause} WHERE id = %s"
            else:
                # Insert new record
                fields = ', '.join(self.fields)
                placeholders = ', '.join(['%s'] * len(self.fields))
                values = [getattr(self, field) for field in self.fields]
                query = f"INSERT INTO {self.table_name} ({fields}) VALUES ({placeholders})"

            cursor.execute(query, values)
            conn.commit()
            return True
        except Exception as e:
            print(f"Error saving {self.__class__.__name__}: {str(e)}")
            return False
        finally:
            close_connection(conn)

    @abc.abstractmethod
    def delete(self) -> bool:
        """
        Deletes the current model instance from the database.

        Returns:
            bool: True if the delete operation was successful, False otherwise.
        """
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = f"DELETE FROM {self.table_name} WHERE id = %s"
            cursor.execute(query, (self.id,))
            conn.commit()
            return True
        except Exception as e:
            print(f"Error deleting {self.__class__.__name__}: {str(e)}")
            return False
        finally:
            close_connection(conn)

    def to_dict(self) -> Dict[str, Any]:
        """
        Converts the model instance to a dictionary.

        Returns:
            Dict[str, Any]: A dictionary representation of the model instance.
        """
        return {field: getattr(self, field) for field in self.fields}

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'BaseModel':
        """
        Creates a new model instance from a dictionary.

        Args:
            data (Dict[str, Any]): The data to create the model instance from.

        Returns:
            BaseModel: A new instance of the model.
        """
        return cls(data)

    @classmethod
    def get_by_id(cls, id: int) -> 'BaseModel':
        """
        Retrieves a model instance by its ID.

        Args:
            id (int): The ID of the model instance to retrieve.

        Returns:
            BaseModel: The model instance if found, None otherwise.
        """
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = f"SELECT * FROM {cls.table_name} WHERE id = %s"
            cursor.execute(query, (id,))
            result = cursor.fetchone()

            if result:
                return cls.from_dict(dict(zip(cls.fields, result)))
            return None
        except Exception as e:
            print(f"Error retrieving {cls.__name__} by ID: {str(e)}")
            return None
        finally:
            close_connection(conn)

    @classmethod
    def get_all(cls) -> List['BaseModel']:
        """
        Retrieves all instances of the model from the database.

        Returns:
            List[BaseModel]: A list of model instances.
        """
        try:
            conn = get_connection()
            cursor = conn.cursor()

            query = f"SELECT * FROM {cls.table_name}"
            cursor.execute(query)
            results = cursor.fetchall()

            return [cls.from_dict(dict(zip(cls.fields, row))) for row in results]
        except Exception as e:
            print(f"Error retrieving all {cls.__name__} instances: {str(e)}")
            return []
        finally:
            close_connection(conn)

# Human tasks (commented)
"""
TODO: Implement proper error handling and logging for database operations (Required)
TODO: Add support for database migrations and schema changes (Required)
TODO: Implement connection pooling optimization if not already handled by the database configuration (Optional)
"""