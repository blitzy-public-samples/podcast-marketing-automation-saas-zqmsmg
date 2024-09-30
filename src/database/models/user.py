import bcrypt
from src.database.models.base import BaseModel

class User(BaseModel):
    table_name = 'users'
    fields = ['id', 'email', 'password_hash', 'role', 'created_at', 'updated_at']

    def __init__(self, data):
        super().__init__(data)
        self.table_name = 'users'
        self.fields = ['id', 'email', 'password_hash', 'role', 'created_at', 'updated_at']

    def set_password(self, password):
        """
        Sets the user's password by hashing it.

        Args:
            password (str): The plain text password to be hashed.

        Returns:
            None
        """
        salt = bcrypt.gensalt()
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def check_password(self, password):
        """
        Checks if the provided password matches the user's hashed password.

        Args:
            password (str): The plain text password to be checked.

        Returns:
            bool: True if the password matches, False otherwise.
        """
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    @classmethod
    def get_by_email(cls, email):
        """
        Retrieves a user by their email address.

        Args:
            email (str): The email address of the user to retrieve.

        Returns:
            User: The User instance if found, None otherwise.
        """
        connection = cls.get_connection()
        try:
            with connection.cursor() as cursor:
                query = f"SELECT * FROM {cls.table_name} WHERE email = %s"
                cursor.execute(query, (email,))
                result = cursor.fetchone()
                if result:
                    return cls(result)
                return None
        finally:
            connection.close()

# Human tasks (to be implemented):
# TODO: Implement email validation logic in the User model or as a separate utility
# TODO: Add password strength requirements and validation
# TODO: Implement user role management and access control logic
# TODO: Set up automated tests for the User model and its methods