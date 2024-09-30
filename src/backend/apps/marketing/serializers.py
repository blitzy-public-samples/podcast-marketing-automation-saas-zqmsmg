from rest_framework import serializers
from apps.marketing.models import MarketingContent

class MarketingContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingContent
        fields = '__all__'

    def validate(self, data):
        """
        Custom validation for MarketingContent data.
        """
        # Check if the platform is valid
        valid_platforms = ['twitter', 'facebook', 'linkedin', 'instagram']  # Add or modify as needed
        if data.get('platform') not in valid_platforms:
            raise serializers.ValidationError(f"Invalid platform. Choose from {', '.join(valid_platforms)}.")

        # Validate content length based on the platform
        content = data.get('content', '')
        platform = data.get('platform')
        if platform == 'twitter' and len(content) > 280:
            raise serializers.ValidationError("Twitter content must be 280 characters or less.")
        elif platform == 'linkedin' and len(content) > 3000:
            raise serializers.ValidationError("LinkedIn content must be 3000 characters or less.")
        # Add more platform-specific validations as needed

        # Ensure the episode exists
        # This assumes that the episode is passed as a foreign key in the data
        if not data.get('episode'):
            raise serializers.ValidationError("An associated episode is required.")

        return data

    def create(self, validated_data):
        """
        Create a new MarketingContent instance.
        """
        # If content is not provided, generate it using AI
        if not validated_data.get('content'):
            # TODO: Implement AI content generation
            # This is a placeholder and should be replaced with actual AI integration
            validated_data['content'] = f"Generated content for {validated_data.get('platform')}"

        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Update an existing MarketingContent instance.
        """
        # If platform changed, regenerate content
        if 'platform' in validated_data and instance.platform != validated_data['platform']:
            # TODO: Implement AI content regeneration
            # This is a placeholder and should be replaced with actual AI integration
            validated_data['content'] = f"Regenerated content for {validated_data['platform']}"

        return super().update(instance, validated_data)

class MarketingContentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingContent
        fields = ['id', 'episode', 'platform', 'status', 'created_at', 'updated_at']

# TODO: Implement custom field for associated social media posts count
# This can be added to the MarketingContentListSerializer or as a separate serializer method field