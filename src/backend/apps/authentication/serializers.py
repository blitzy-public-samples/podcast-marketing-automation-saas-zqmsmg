from rest_framework import serializers
from django.contrib.auth import authenticate
from src.backend.apps.authentication.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']

    def validate_password(self, value):
        """
        Validate the password
        """
        if len(value) < 12:
            raise serializers.ValidationError("Password must be at least 12 characters long.")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Password must contain at least one number.")
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not any(char.islower() for char in value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not any(char in "!@#$%^&*()_+-=[]{}|;:,.<>?" for char in value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value

    def create(self, validated_data):
        """
        Create and return a new user
        """
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        """
        Validate user credentials
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
    Serializer for user profile management
    """
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name']

    def update(self, instance, validated_data):
        """
        Update and return an existing user
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

# Human tasks:
# TODO: Implement additional validation rules for user registration if needed
# TODO: Add custom fields to UserProfileSerializer if required for podcast marketing features
# TODO: Implement password change functionality if not handled elsewhere