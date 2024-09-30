from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import MarketingContent
from .serializers import MarketingContentSerializer
from apps.episodes.models import Episode
from django.shortcuts import get_object_or_404
from django.db.models import Q

class MarketingContentListCreateView(generics.ListCreateAPIView):
    queryset = MarketingContent.objects.all()
    serializer_class = MarketingContentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get the episode ID from the request data
        episode_id = self.request.data.get('episode_id')
        episode = get_object_or_404(Episode, id=episode_id)

        # Check if the user has permission to create content for this episode
        if episode.podcast.user != self.request.user:
            raise permissions.PermissionDenied("You don't have permission to create marketing content for this episode.")

        # Generate content using AI service
        # This is a placeholder and should be replaced with actual AI service call
        generated_content = self.generate_content(episode)

        # Save the marketing content with the generated content and associated episode
        serializer.save(content=generated_content, episode=episode)

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user
        # Return marketing content associated with the user's episodes
        return MarketingContent.objects.filter(episode__podcast__user=user)

    def generate_content(self, episode):
        # Placeholder for content generation
        # This should be replaced with actual AI service integration
        return f"Generated marketing content for episode: {episode.title}"


class MarketingContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MarketingContent.objects.all()
    serializer_class = MarketingContentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Get the authenticated user
        user = self.request.user
        # Return marketing content associated with the user's episodes
        return MarketingContent.objects.filter(episode__podcast__user=user)


class GenerateMarketingContentView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Get episode ID and platform from request data
        episode_id = request.data.get('episode_id')
        platform = request.data.get('platform')

        # Retrieve the Episode instance
        episode = get_object_or_404(Episode, id=episode_id)

        # Check if the user has permission to generate content for the episode
        if episode.podcast.user != request.user:
            return Response({"error": "You don't have permission to generate content for this episode."},
                            status=status.HTTP_403_FORBIDDEN)

        # Generate content using AI service
        # This is a placeholder and should be replaced with actual AI service call
        generated_content = self.generate_content(episode, platform)

        # Create and save new MarketingContent instance
        marketing_content = MarketingContent.objects.create(
            episode=episode,
            platform=platform,
            content=generated_content
        )

        # Serialize and return the created marketing content
        serializer = MarketingContentSerializer(marketing_content)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def generate_content(self, episode, platform):
        # Placeholder for content generation
        # This should be replaced with actual AI service integration
        return f"Generated {platform} marketing content for episode: {episode.title}"


# Pending human tasks:
# TODO: Implement error handling for cases where episode doesn't exist or user doesn't have permission
# TODO: Add pagination to the MarketingContentListCreateView if needed for large datasets
# TODO: Implement caching mechanism for frequently accessed marketing content
# TODO: Add filtering and sorting options for the marketing content list view