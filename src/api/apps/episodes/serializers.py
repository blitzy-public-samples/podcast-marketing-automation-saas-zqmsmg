from rest_framework import serializers
from apps.episodes.models import Episode
from apps.podcasts.models import Podcast

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = ['id', 'title', 'description', 'audio_file_url', 'podcast', 'publish_date', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate(self, data):
        """
        Custom validation method for the serializer.
        """
        # Check for required fields
        required_fields = ['title', 'description', 'audio_file_url', 'podcast']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError(f"{field} is required.")

        # Validate relationships (e.g., podcast exists)
        podcast_id = data.get('podcast')
        if podcast_id and not Podcast.objects.filter(id=podcast_id).exists():
            raise serializers.ValidationError("The specified podcast does not exist.")

        return data

    def create(self, validated_data):
        """
        Custom create method to handle episode creation.
        """
        # Extract podcast data from validated_data
        podcast = validated_data.pop('podcast', None)

        # Create and save the new Episode instance
        episode = Episode.objects.create(podcast=podcast, **validated_data)

        # Handle any additional logic (e.g., triggering transcription)
        # This would typically be done in a Celery task
        # transcription_tasks.create_transcript.delay(episode.id)

        return episode

    def update(self, instance, validated_data):
        """
        Custom update method to handle episode updates.
        """
        # Update the Episode instance with validated data
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Handle any status changes or related data updates
        if 'status' in validated_data:
            # Implement any status-specific logic here
            pass

        instance.save()
        return instance

    def get_transcript(self, obj):
        """
        Method to retrieve the associated transcript data.
        """
        # Assuming there's a related Transcript model
        transcript = obj.transcript.first()  # Adjust based on your actual relationship
        if transcript:
            return {
                'id': transcript.id,
                'content': transcript.content,
                # Add other relevant transcript fields
            }
        return None

    def get_marketing_content(self, obj):
        """
        Method to retrieve associated marketing content.
        """
        # Assuming there's a related MarketingContent model
        marketing_contents = obj.marketing_contents.all()  # Adjust based on your actual relationship
        return [
            {
                'id': content.id,
                'platform': content.platform,
                'content': content.content,
                'status': content.status,
                # Add other relevant marketing content fields
            }
            for content in marketing_contents
        ]

    def get_social_media_posts(self, obj):
        """
        Method to retrieve associated social media posts.
        """
        # Assuming there's a related SocialMediaPost model
        social_media_posts = obj.social_media_posts.all()  # Adjust based on your actual relationship
        return [
            {
                'id': post.id,
                'platform': post.platform,
                'content': post.content,
                'scheduled_time': post.scheduled_time,
                'status': post.status,
                # Add other relevant social media post fields
            }
            for post in social_media_posts
        ]

    def get_analytics(self, obj):
        """
        Method to retrieve analytics data for the episode.
        """
        # Assuming there's a related Analytics model or method
        analytics = obj.get_analytics()  # Adjust based on your actual implementation
        return {
            'downloads': analytics.get('downloads', 0),
            'likes': analytics.get('likes', 0),
            'shares': analytics.get('shares', 0),
            'comments': analytics.get('comments', 0),
            # Add other relevant analytics data
        }

# Pending human tasks:
# 1. Define the exact fields to be included in the serializer's Meta class
# 2. Implement custom validation logic in the validate method
# 3. Determine the structure of the transcript, marketing content, and social media post data to be returned
# 4. Decide on the format and content of the analytics data to be returned
# 5. Implement error handling and appropriate status codes for API responses