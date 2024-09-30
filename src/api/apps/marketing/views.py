from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import MarketingContent
from .serializers import MarketingContentSerializer
from src.api.services import content_generation

class MarketingContentListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating marketing content
    """
    queryset = MarketingContent.objects.all()
    serializer_class = MarketingContentSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        """
        Custom method to handle the creation of marketing content
        """
        # Save the serializer instance
        instance = serializer.save()

        # Get the episode from the saved instance
        episode = instance.episode

        # Generate marketing content using the content_generation service
        generated_content = content_generation.generate_content(episode)

        # Update the saved instance with the generated content
        instance.content = generated_content
        instance.save()

class MarketingContentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting specific marketing content
    """
    queryset = MarketingContent.objects.all()
    serializer_class = MarketingContentSerializer
    permission_classes = (permissions.IsAuthenticated,)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def generate_marketing_content(request, episode_id):
    """
    Function to generate marketing content for a given episode
    """
    try:
        # Retrieve the episode using the provided episode_id
        episode = Episode.objects.get(id=episode_id)

        # Generate marketing content using the content_generation service
        generated_content = content_generation.generate_content(episode)

        # Create a new MarketingContent instance with the generated content
        marketing_content = MarketingContent.objects.create(
            episode=episode,
            content=generated_content,
            user=request.user
        )

        # Serialize the marketing content data
        serializer = MarketingContentSerializer(marketing_content)

        # Return a response with the serialized marketing content data
        return Response(serializer.data, status=201)

    except Episode.DoesNotExist:
        return Response({"error": "Episode not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

# Human tasks:
# TODO: Implement proper error handling for content generation failures
# TODO: Add pagination to the MarketingContentListCreateView if needed
# TODO: Implement filtering and searching capabilities for marketing content