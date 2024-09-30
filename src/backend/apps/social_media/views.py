from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import SocialMediaPost
from .serializers import SocialMediaPostSerializer
from apps.episodes.models import Episode

class SocialMediaPostListCreateView(generics.ListCreateAPIView):
    queryset = SocialMediaPost.objects.all()
    serializer_class = SocialMediaPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Get the episode ID from the validated data
        episode_id = serializer.validated_data.get('episode')
        
        # Retrieve the Episode instance
        episode = get_object_or_404(Episode, id=episode_id)
        
        # Check if the authenticated user has permission to create a post for this episode
        if episode.podcast.user != self.request.user:
            raise permissions.PermissionDenied("You don't have permission to create a post for this episode.")
        
        # Save the social media post with the associated episode
        serializer.save(user=self.request.user, episode=episode)

class SocialMediaPostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SocialMediaPost.objects.all()
    serializer_class = SocialMediaPostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        instance = self.get_object()
        
        # Check if the status or scheduled_time has changed
        status_changed = 'status' in serializer.validated_data and serializer.validated_data['status'] != instance.status
        time_changed = 'scheduled_time' in serializer.validated_data and serializer.validated_data['scheduled_time'] != instance.scheduled_time
        
        # Save the updated social media post
        updated_instance = serializer.save()
        
        # If status changed to 'scheduled', trigger scheduling task
        if status_changed and updated_instance.status == 'scheduled':
            # TODO: Implement scheduling task
            pass
        
        # If scheduled_time changed, update the scheduling task
        if time_changed:
            # TODO: Implement rescheduling task
            pass

class SocialMediaPostScheduleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(SocialMediaPost, pk=pk)
        
        # Check if the post is already scheduled
        if post.status == 'scheduled':
            return Response({"error": "This post is already scheduled."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate the scheduling time
        scheduled_time = request.data.get('scheduled_time')
        if not scheduled_time:
            return Response({"error": "Scheduled time is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # TODO: Implement validation for scheduled_time
        
        # Call the social media integration service to schedule the post
        # TODO: Implement social media integration service
        
        # Update the post status and save
        post.status = 'scheduled'
        post.scheduled_time = scheduled_time
        post.save()
        
        return Response({"message": "Post scheduled successfully."}, status=status.HTTP_200_OK)

class SocialMediaPostEngagementView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        post = get_object_or_404(SocialMediaPost, pk=pk)
        
        # Call the get_engagement_metrics method on the post
        # TODO: Implement get_engagement_metrics method in SocialMediaPost model
        engagement_metrics = post.get_engagement_metrics()
        
        return Response(engagement_metrics, status=status.HTTP_200_OK)

# TODO: Implement proper error handling and logging for API requests
# TODO: Add rate limiting to prevent abuse of the API endpoints
# TODO: Implement caching for frequently accessed data, such as engagement metrics
# TODO: Add support for bulk operations (e.g., scheduling multiple posts at once)
# TODO: Implement more granular permissions for different user roles (e.g., admin, editor, viewer)