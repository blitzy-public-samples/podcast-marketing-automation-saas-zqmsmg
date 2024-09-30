from rest_framework import serializers
from apps.podcasts.models import Podcast
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

class PodcastSerializer(serializers.ModelSerializer):
    """
    Serializer for the Podcast model, handling serialization and deserialization of Podcast instances.
    """

    class Meta:
        model = Podcast
        fields = ['id', 'title', 'description', 'rss_feed_url', 'cover_image_url', 'created_at', 'updated_at']

    def validate_title(self, value):
        """
        Custom validation for the title field.
        """
        if not value:
            raise serializers.ValidationError("Title cannot be empty.")
        if len(value) > 200:  # Assuming a max length of 200 characters
            raise serializers.ValidationError("Title length should not exceed 200 characters.")
        return value

    def validate_rss_feed_url(self, value):
        """
        Custom validation for the RSS feed URL.
        """
        url_validator = URLValidator()
        try:
            url_validator(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid URL format for RSS feed.")

        # Here you would typically add logic to check if the URL is a valid RSS feed
        # For example, you might want to make a GET request and check the content type
        # This is left as a TODO for actual implementation

        return value

    def create(self, validated_data):
        """
        Custom create method to handle podcast creation.
        """
        user = self.context['request'].user
        podcast = Podcast.objects.create(user=user, **validated_data)
        return podcast

    def update(self, instance, validated_data):
        """
        Custom update method to handle podcast updates.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# TODO: Review and adjust field validations based on specific business rules
# TODO: Implement additional custom methods for complex serialization/deserialization if needed
# TODO: Consider implementing nested serializers for related models (e.g., episodes) if required