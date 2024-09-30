from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from apps.podcasts.models import Podcast
from apps.podcasts.serializers import PodcastSerializer
from apps.utils.permissions import IsAuthenticated

class PodcastViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations on Podcast objects.
    """
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Returns the queryset of podcasts for the current user.
        """
        user = self.request.user
        return Podcast.objects.filter(user=user)

    def perform_create(self, serializer):
        """
        Associates the current user with the podcast being created.
        """
        serializer.save(user=self.request.user)

    def list(self, request):
        """
        Retrieves a list of podcasts for the current user.
        """
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        """
        Retrieves a single podcast instance.
        """
        try:
            podcast = self.get_queryset().get(pk=pk)
        except Podcast.DoesNotExist:
            return Response({"detail": "Podcast not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(podcast)
        return Response(serializer.data)

    def update(self, request, pk=None):
        """
        Updates a podcast instance.
        """
        try:
            podcast = self.get_queryset().get(pk=pk)
        except Podcast.DoesNotExist:
            return Response({"detail": "Podcast not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = self.serializer_class(podcast, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        """
        Deletes a podcast instance.
        """
        try:
            podcast = self.get_queryset().get(pk=pk)
        except Podcast.DoesNotExist:
            return Response({"detail": "Podcast not found."}, status=status.HTTP_404_NOT_FOUND)
        
        podcast.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# TODO: Implement additional custom actions for podcast-specific operations if needed
# TODO: Add filtering, searching, and ordering capabilities to the list view
# TODO: Implement pagination for the list view to handle large numbers of podcasts
# TODO: Add proper error handling and custom exception responses
# TODO: Implement caching mechanisms for frequently accessed podcast data