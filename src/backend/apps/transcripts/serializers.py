from rest_framework import serializers
from apps.transcripts.models import Transcript

class TranscriptSerializer(serializers.ModelSerializer):
    word_count = serializers.SerializerMethodField()
    summary = serializers.SerializerMethodField()
    keywords = serializers.SerializerMethodField()

    class Meta:
        model = Transcript
        fields = '__all__'  # We'll include all fields from the Transcript model

    def validate_content(self, value):
        """
        Custom validation for the content field.
        """
        if not value:
            raise serializers.ValidationError("Content cannot be empty.")
        
        # TODO: Implement content cleaning or formatting logic here
        # This is a placeholder for future implementation
        cleaned_content = value.strip()
        
        return cleaned_content

    def get_word_count(self, obj):
        """
        Custom field to return the word count of the transcript.
        """
        return obj.get_word_count()

    def get_summary(self, obj):
        """
        Custom field to return the summary of the transcript.
        """
        return obj.get_summary()

    def get_keywords(self, obj):
        """
        Custom field to return the extracted keywords from the transcript.
        """
        return obj.extract_keywords()

# Human tasks (commented as requested):
# TODO: Implement content validation logic in the validate_content method
# TODO: Consider adding rate limiting or caching for resource-intensive methods like get_summary and get_keywords
# TODO: Evaluate the need for a separate serializer for creating transcripts vs. retrieving them