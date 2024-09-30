from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Analytics
from .serializers import AnalyticsSerializer
from apps.episodes.models import Episode
from rest_framework.permissions import IsAuthenticated
from utils.permissions import IsOwnerOrReadOnly

class AnalyticsList(generics.ListCreateAPIView):
    """
    API view for listing and creating analytics entries
    """
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Get the queryset for the current user
        """
        user = self.request.user
        # Filter Analytics objects by episodes owned by the user
        return Analytics.objects.filter(episode__podcast__user=user)

    def perform_create(self, serializer):
        """
        Associate the analytics entry with the correct episode
        """
        episode_id = serializer.validated_data.get('episode')
        try:
            episode = Episode.objects.get(id=episode_id)
            serializer.save(episode=episode)
        except Episode.DoesNotExist:
            raise serializers.ValidationError("Episode does not exist")

class AnalyticsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting individual analytics entries
    """
    queryset = Analytics.objects.all()
    serializer_class = AnalyticsSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

class EpisodeAnalyticsSummary(generics.RetrieveAPIView):
    """
    API view for retrieving a summary of analytics for a specific episode
    """
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def retrieve(self, request, pk=None):
        """
        Retrieve and summarize analytics data for an episode
        """
        try:
            episode = Episode.objects.get(pk=pk)
            self.check_object_permissions(request, episode)

            # Get all Analytics objects for the episode
            analytics = Analytics.objects.filter(episode=episode)

            # Calculate total downloads, likes, shares, and comments
            total_downloads = sum(a.downloads for a in analytics)
            total_likes = sum(a.likes for a in analytics)
            total_shares = sum(a.shares for a in analytics)
            total_comments = sum(a.comments for a in analytics)

            # Calculate average engagement per day
            days = analytics.count()
            avg_engagement = (total_likes + total_shares + total_comments) / days if days > 0 else 0

            summary_data = {
                'episode_id': episode.id,
                'episode_title': episode.title,
                'total_downloads': total_downloads,
                'total_likes': total_likes,
                'total_shares': total_shares,
                'total_comments': total_comments,
                'average_engagement_per_day': avg_engagement,
                'days_tracked': days
            }

            return Response(summary_data)
        except Episode.DoesNotExist:
            return Response({'error': 'Episode not found'}, status=status.HTTP_404_NOT_FOUND)

# TODO: Implement caching for frequently accessed analytics data to improve performance
# TODO: Add more advanced analytics views, such as trend analysis or comparison between episodes
# TODO: Implement rate limiting for analytics API endpoints to prevent abuse