from rest_framework import serializers
from .models import MarketingContent

class MarketingContentSerializer(serializers.ModelSerializer):
    """
    Serializer for the MarketingContent model
    """
    class Meta:
        model = MarketingContent
        fields = '__all__'  # We'll use all fields for now, but this should be reviewed and adjusted as needed

class MarketingContentCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new MarketingContent instances
    """
    class Meta:
        model = MarketingContent
        fields = ['episode_id', 'content', 'platform']  # Adjust these fields as per your MarketingContent model

    def create(self, validated_data):
        """
        Custom create method to handle MarketingContent creation
        """
        episode_id = validated_data.pop('episode_id')
        # Here you might want to fetch the episode instance using the episode_id
        # episode = Episode.objects.get(id=episode_id)
        
        # Create and return a new MarketingContent instance
        return MarketingContent.objects.create(episode_id=episode_id, **validated_data)

class MarketingContentUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating existing MarketingContent instances
    """
    class Meta:
        model = MarketingContent
        fields = ['content', 'platform', 'status']  # Adjust these fields as per your MarketingContent model

# Human Tasks:
# TODO: Review and adjust the serializer fields to ensure they match the MarketingContent model
# TODO: Implement any additional validation logic in the serializers if needed
# TODO: Consider adding custom methods for complex data transformations if required