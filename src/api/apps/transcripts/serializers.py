from rest_framework import serializers
from apps.transcripts.models import Transcript

class TranscriptSerializer(serializers.ModelSerializer):
    word_count = serializers.SerializerMethodField()
    duration = serializers.SerializerMethodField()

    class Meta:
        model = Transcript
        fields = ['id', 'episode', 'content', 'timestamps', 'created_at', 'updated_at', 'word_count', 'duration']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        """
        Custom validation method for the serializer.
        """
        # Check for required fields
        required_fields = ['episode', 'content', 'timestamps']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError(f"{field} is required.")

        # Validate the format of the content and timestamps
        if not isinstance(data['content'], str):
            raise serializers.ValidationError("Content must be a string.")

        if not isinstance(data['timestamps'], list):
            raise serializers.ValidationError("Timestamps must be a list.")

        for timestamp in data['timestamps']:
            if not isinstance(timestamp, dict) or 'start' not in timestamp or 'end' not in timestamp:
                raise serializers.ValidationError("Each timestamp must be a dictionary with 'start' and 'end' keys.")

        return data

    def create(self, validated_data):
        """
        Custom create method for creating a new Transcript instance.
        """
        return Transcript.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Custom update method for updating an existing Transcript instance.
        """
        instance.episode = validated_data.get('episode', instance.episode)
        instance.content = validated_data.get('content', instance.content)
        instance.timestamps = validated_data.get('timestamps', instance.timestamps)
        instance.save()
        return instance

    def get_word_count(self, obj):
        """
        Method to get the word count of the transcript content.
        """
        return obj.get_word_count()

    def get_duration(self, obj):
        """
        Method to get the duration of the transcript.
        """
        return obj.get_duration()

# Human tasks:
# 1. Define the specific fields to be included in the serializer (Required)
# 2. Determine which fields should be read-only (Required)
# 3. Implement custom validation rules for transcript content and timestamps (Required)
# 4. Decide on any additional methods or properties needed for the serializer (Optional)