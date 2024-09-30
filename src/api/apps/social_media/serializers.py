from rest_framework import serializers
from django.utils import timezone
from .models import SocialMediaPlatform, SocialMediaPost

class SocialMediaPlatformSerializer(serializers.ModelSerializer):
    """
    Serializer for the SocialMediaPlatform model.
    """
    class Meta:
        model = SocialMediaPlatform
        fields = '__all__'

class SocialMediaPostSerializer(serializers.ModelSerializer):
    """
    Serializer for the SocialMediaPost model.
    """
    class Meta:
        model = SocialMediaPost
        fields = '__all__'
        read_only_fields = ('user',)

    def validate_scheduled_time(self, value):
        """
        Validates that the scheduled time is in the future.
        """
        if value <= timezone.now():
            raise serializers.ValidationError("Scheduled time must be in the future.")
        return value

    def create(self, validated_data):
        """
        Custom create method to handle post creation.
        """
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Custom update method to handle post updates.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# TODO: Implement platform-specific validation for post content
# TODO: Add serializer method field for post performance metrics
# TODO: Consider implementing a nested serializer for platform details in SocialMediaPostSerializer