from rest_framework import serializers
from apps.podcasts.models import Podcast

class PodcastSerializer(serializers.ModelSerializer):
    episode_count = serializers.SerializerMethodField()
    latest_episode = serializers.SerializerMethodField()

    class Meta:
        model = Podcast
        fields = [
            'id', 'title', 'description', 'cover_image_url', 'user',
            'created_at', 'updated_at', 'episode_count', 'latest_episode'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'episode_count', 'latest_episode']

    def get_episode_count(self, obj):
        """
        Custom field to include the episode count in the serialized data
        """
        return obj.episodes.count()

    def get_latest_episode(self, obj):
        """
        Custom field to include the latest episode details in the serialized data
        """
        latest_episode = obj.episodes.order_by('-publish_date').first()
        if latest_episode:
            return {
                'id': latest_episode.id,
                'title': latest_episode.title,
                'publish_date': latest_episode.publish_date
            }
        return None

    def create(self, validated_data):
        """
        Create a new Podcast instance
        """
        return Podcast.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update an existing Podcast instance
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# Human tasks (optional):
# 1. Review and adjust serializer fields based on specific API requirements
# 2. Implement additional validation logic if needed
# 3. Consider adding nested serializers for related models if required