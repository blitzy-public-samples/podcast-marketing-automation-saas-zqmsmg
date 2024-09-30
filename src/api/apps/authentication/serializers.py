from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, used for general user data representation.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = ['id']

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration, including validation and user creation.
    """
    password = serializers.CharField(write_only=True, required=True, min_length=12)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'confirm_password', 'first_name', 'last_name']

    def validate(self, data):
        """
        Validates the registration data.
        """
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")

        # Validate password complexity
        # TODO: Implement more robust password validation
        if not any(char.isdigit() for char in data['password']):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not any(char.isupper() for char in data['password']):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not any(char.islower() for char in data['password']):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not any(char in "!@#$%^&*()_+-=[]{}|;:,.<>?" for char in data['password']):
            raise serializers.ValidationError("Password must contain at least one special character.")

        return data

    def create(self, validated_data):
        """
        Creates a new user instance.
        """
        # Remove confirm_password from the data as it's not needed for user creation
        validated_data.pop('confirm_password', None)
        
        # Create user with validated data
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login, handling authentication.
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        """
        Validates the login credentials and authenticates the user.
        """
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        data['user'] = user
        return data

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for user profile management, allowing updates to user information.
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'role']
        read_only_fields = ['id', 'email', 'role']

    def update(self, instance, validated_data):
        """
        Updates the user profile with the provided data.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

# Human tasks:
# TODO: Review and adjust password complexity requirements in RegisterSerializer
# TODO: Implement additional validation for user roles if needed
# TODO: Consider adding serializers for password reset functionality