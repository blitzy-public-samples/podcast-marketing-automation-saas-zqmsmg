from rest_framework import serializers
from apps.analytics.models import Analytics
from apps.episodes.serializers import EpisodeSerializer

class AnalyticsSerializer(serializers.ModelSerializer):
    """
    Serializer for the Analytics model
    """
    total_engagement = serializers.SerializerMethodField()

    class Meta:
        model = Analytics
        fields = ['id', 'episode', 'date', 'downloads', 'likes', 'shares', 'comments', 'total_engagement']
        read_only_fields = ['id', 'total_engagement']

    def get_total_engagement(self, obj):
        """
        Calculate and return the total engagement for the analytics instance
        """
        return obj.likes + obj.shares + obj.comments

class AnalyticsDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for the Analytics model, including episode details
    """
    episode = EpisodeSerializer()
    total_engagement = serializers.SerializerMethodField()

    class Meta:
        model = Analytics
        fields = ['id', 'episode', 'date', 'downloads', 'likes', 'shares', 'comments', 'total_engagement']
        read_only_fields = ['id', 'total_engagement']

    def get_total_engagement(self, obj):
        """
        Calculate and return the total engagement for the analytics instance
        """
        return obj.likes + obj.shares + obj.comments

def calculate_total_engagement(data):
    """
    Helper function to calculate total engagement
    """
    return data.get('likes', 0) + data.get('shares', 0) + data.get('comments', 0)

# Human tasks:
# TODO: Review and adjust the fields included in the serializers based on API requirements
# TODO: Consider adding custom validation for analytics data if needed
# TODO: Implement any necessary permission classes or custom serializer methods