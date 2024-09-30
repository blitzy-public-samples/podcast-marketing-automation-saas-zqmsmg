from rest_framework import serializers
from apps.social_media.models import SocialMediaPost

class SocialMediaPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPost
        fields = '__all__'

    def validate_content(self, value):
        # TODO: Implement platform-specific content validation
        # Check if the content length is appropriate for the specified platform
        # Raise ValidationError if content is too long
        return value

    def create(self, validated_data):
        # Extract episode data from validated_data
        episode_data = validated_data.pop('episode', None)
        
        # Create and save the SocialMediaPost instance
        social_media_post = SocialMediaPost.objects.create(**validated_data)
        
        # TODO: Handle episode relationship if needed
        
        return social_media_post

    def update(self, instance, validated_data):
        # Update the SocialMediaPost instance with validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class SocialMediaPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPost
        fields = ['content', 'platform', 'scheduled_time', 'episode']  # Add or remove fields as necessary

    def validate(self, data):
        # Perform any cross-field validations
        # Ensure the episode exists and is valid for posting
        episode = data.get('episode')
        if episode:
            # TODO: Add validation to check if the episode exists and is valid for posting
            pass

        return data

# TODO: Implement platform-specific content validation in the validate_content method
# TODO: Add any additional fields or methods required for handling social media platform-specific data
# TODO: Implement proper error handling and custom error messages for validation errors
# TODO: Consider adding a method to handle bulk creation of social media posts for multiple platforms