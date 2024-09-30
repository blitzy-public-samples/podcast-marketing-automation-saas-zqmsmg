from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action

from src.api.apps.social_media.models import SocialMediaPlatform, SocialMediaPost
from src.api.apps.social_media.serializers import SocialMediaPlatformSerializer, SocialMediaPostSerializer
from src.api.utils.permissions import IsAuthenticated
from src.api.utils.pagination import CustomPagination

class SocialMediaPlatformViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing social media platforms.
    """
    queryset = SocialMediaPlatform.objects.all()
    serializer_class = SocialMediaPlatformSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This method should be implemented to return platforms
        associated with the authenticated user.
        """
        # TODO: Implement filtering by user
        return super().get_queryset()

class SocialMediaPostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing social media posts.
    """
    queryset = SocialMediaPost.objects.all()
    serializer_class = SocialMediaPostSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This method should be implemented to return posts
        associated with the authenticated user.
        """
        # TODO: Implement filtering by user
        return super().get_queryset()

    def perform_create(self, serializer):
        """
        Performs the creation of a new social media post.
        """
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def schedule_post(self, request, pk=None):
        """
        Schedules a social media post for future publication.
        """
        post = self.get_object()
        scheduled_time = request.data.get('scheduled_time')
        
        if not scheduled_time:
            return Response({'error': 'Scheduled time is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            post.scheduled_time = scheduled_time
            post.status = 'SCHEDULED'  # Assuming there's a status field
            post.save()
            return Response({'message': 'Post scheduled successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'])
    def update_metrics(self, request, pk=None):
        """
        Updates the metrics of a social media post.
        """
        post = self.get_object()
        metrics = {
            'likes': request.data.get('likes'),
            'shares': request.data.get('shares'),
            'comments': request.data.get('comments')
        }

        try:
            post.update_metrics(**metrics)
            return Response({'message': 'Metrics updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# TODO: Implement authentication and authorization checks for all endpoints
# TODO: Add error handling and appropriate HTTP status codes for all possible scenarios
# TODO: Implement rate limiting for API endpoints to prevent abuse
# TODO: Add filtering and searching capabilities to the list views
# TODO: Implement webhook functionality for real-time updates from social media platforms