from rest_framework import serializers
from apps.episodes.models import Episode
from datetime import datetime

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'  # We'll include all fields, but this can be adjusted as needed

    def validate_audio_file_url(self, value):
        """
        Validate the audio file URL.
        """
        # TODO: Implement custom validation logic for audio file URL
        return value

    def create(self, validated_data):
        """
        Create a new Episode instance.
        """
        return Episode.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update an existing Episode instance.
        """
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class EpisodeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = ['id', 'title', 'publish_date', 'status']  # Adjust these fields as needed for the list view

def validate_publish_date(date):
    """
    Validate the publish date of an episode.
    """
    if date < datetime.now():
        raise serializers.ValidationError("Publish date cannot be in the past.")
    return date

# Human tasks:
# TODO: Implement custom validation logic for audio file URL in validate_audio_file_url method
# TODO: Review and adjust the fields included in the EpisodeListSerializer based on specific API requirements
# TODO: Consider adding custom serializer methods for related data like transcripts or marketing content if needed