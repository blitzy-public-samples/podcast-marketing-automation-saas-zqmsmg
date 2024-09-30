from rest_framework import generics, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Podcast
from .serializers import PodcastSerializer

class PodcastListCreateView(generics.ListCreateAPIView):
    """
    View for listing and creating podcasts
    """
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns queryset of podcasts for the authenticated user
        """
        # Get the authenticated user
        user = self.request.user
        # Return queryset filtered by user
        return Podcast.objects.filter(user=user)

    def perform_create(self, serializer):
        """
        Associates the new podcast with the authenticated user
        """
        # Get the authenticated user
        user = self.request.user
        # Set the user field of the serializer
        serializer.save(user=user)


class PodcastRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    View for retrieving, updating, and deleting a specific podcast
    """
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns queryset of podcasts for the authenticated user
        """
        # Get the authenticated user
        user = self.request.user
        # Return queryset filtered by user
        return Podcast.objects.filter(user=user)

# TODO: Implement custom permissions if needed (e.g., to allow collaborators to access podcasts)
# TODO: Add filtering, searching, and sorting capabilities to the list view if required
# TODO: Implement pagination for the podcast list if dealing with a large number of podcasts
# TODO: Add any additional business logic or validation in the view methods if necessary