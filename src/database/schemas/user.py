from marshmallow import Schema, fields, ValidationError
import re

class UserSchema(Schema):
    """Schema class for User model serialization and deserialization"""

    id = fields.Integer(dump_only=True)
    email = fields.Email(required=True)
    password = fields.String(required=True, load_only=True)
    role = fields.String(required=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

    def __init__(self, *args, **kwargs):
        """Initializes the UserSchema"""
        super().__init__(*args, **kwargs)
        # Set up any additional configuration for the schema here

    def validate_password(self, password: str) -> str:
        """
        Custom validator for password field

        Args:
            password (str): The password to validate

        Returns:
            str: The validated password

        Raises:
            ValidationError: If the password doesn't meet the requirements
        """
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long.")

        if not re.search(r'[A-Z]', password):
            raise ValidationError("Password must contain at least one uppercase letter.")

        if not re.search(r'[a-z]', password):
            raise ValidationError("Password must contain at least one lowercase letter.")

        if not re.search(r'\d', password):
            raise ValidationError("Password must contain at least one number.")

        return password

# Human tasks:
# TODO: Implement password hashing mechanism in coordination with the authentication service
# TODO: Review and adjust user roles according to the application's permission system
# TODO (Optional): Implement additional custom validators for email and role fields if necessary