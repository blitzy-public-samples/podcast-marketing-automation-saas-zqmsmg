from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from apps.podcasts.models import Podcast
from apps.episodes.models import Episode

class PodcastAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, podcast_id):
        """
        Retrieves analytics data for a specific podcast.
        """
        podcast = get_object_or_404(Podcast, id=podcast_id)
        # Assuming PodcastAnalytics model exists
        analytics, created = PodcastAnalytics.objects.get_or_create(podcast=podcast)
        
        # Serialize the analytics data
        serialized_data = {
            'podcast_id': podcast.id,
            'total_listens': analytics.total_listens,
            'unique_listeners': analytics.unique_listeners,
            'average_listen_duration': analytics.average_listen_duration,
            # Add more fields as needed
        }
        
        return Response(serialized_data)

    def post(self, request, podcast_id):
        """
        Updates analytics data for a specific podcast.
        """
        podcast = get_object_or_404(Podcast, id=podcast_id)
        # Assuming PodcastAnalytics model exists
        analytics, created = PodcastAnalytics.objects.get_or_create(podcast=podcast)
        
        # Update analytics data
        analytics.total_listens = request.data.get('total_listens', analytics.total_listens)
        analytics.unique_listeners = request.data.get('unique_listeners', analytics.unique_listeners)
        analytics.average_listen_duration = request.data.get('average_listen_duration', analytics.average_listen_duration)
        # Update more fields as needed
        
        analytics.save()
        
        return Response({'message': 'Podcast analytics updated successfully'}, status=status.HTTP_200_OK)

class EpisodeAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, episode_id):
        """
        Retrieves analytics data for a specific episode.
        """
        episode = get_object_or_404(Episode, id=episode_id)
        # Assuming EpisodeAnalytics model exists
        analytics, created = EpisodeAnalytics.objects.get_or_create(episode=episode)
        
        # Serialize the analytics data
        serialized_data = {
            'episode_id': episode.id,
            'total_listens': analytics.total_listens,
            'unique_listeners': analytics.unique_listeners,
            'average_listen_duration': analytics.average_listen_duration,
            # Add more fields as needed
        }
        
        return Response(serialized_data)

    def post(self, request, episode_id):
        """
        Updates analytics data for a specific episode.
        """
        episode = get_object_or_404(Episode, id=episode_id)
        # Assuming EpisodeAnalytics model exists
        analytics, created = EpisodeAnalytics.objects.get_or_create(episode=episode)
        
        # Update analytics data
        analytics.total_listens = request.data.get('total_listens', analytics.total_listens)
        analytics.unique_listeners = request.data.get('unique_listeners', analytics.unique_listeners)
        analytics.average_listen_duration = request.data.get('average_listen_duration', analytics.average_listen_duration)
        # Update more fields as needed
        
        analytics.save()
        
        return Response({'message': 'Episode analytics updated successfully'}, status=status.HTTP_200_OK)

class MarketingAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, episode_id, platform):
        """
        Retrieves marketing analytics data for a specific episode and platform.
        """
        episode = get_object_or_404(Episode, id=episode_id)
        # Assuming MarketingAnalytics model exists
        analytics, created = MarketingAnalytics.objects.get_or_create(episode=episode, platform=platform)
        
        # Serialize the analytics data
        serialized_data = {
            'episode_id': episode.id,
            'platform': platform,
            'impressions': analytics.impressions,
            'clicks': analytics.clicks,
            'conversions': analytics.conversions,
            # Add more fields as needed
        }
        
        return Response(serialized_data)

    def post(self, request, episode_id, platform):
        """
        Updates marketing analytics data for a specific episode and platform.
        """
        episode = get_object_or_404(Episode, id=episode_id)
        # Assuming MarketingAnalytics model exists
        analytics, created = MarketingAnalytics.objects.get_or_create(episode=episode, platform=platform)
        
        # Update analytics data
        analytics.impressions = request.data.get('impressions', analytics.impressions)
        analytics.clicks = request.data.get('clicks', analytics.clicks)
        analytics.conversions = request.data.get('conversions', analytics.conversions)
        # Update more fields as needed
        
        analytics.save()
        
        return Response({'message': 'Marketing analytics updated successfully'}, status=status.HTTP_200_OK)

class AnalyticsDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieves aggregated analytics data for the user's podcasts and episodes.
        """
        user = request.user
        podcasts = Podcast.objects.filter(user=user)
        
        aggregated_data = {
            'total_podcasts': podcasts.count(),
            'total_episodes': Episode.objects.filter(podcast__in=podcasts).count(),
            'total_listens': 0,
            'total_unique_listeners': 0,
            'average_listen_duration': 0,
            'marketing_performance': {},
        }
        
        for podcast in podcasts:
            # Aggregate podcast analytics
            podcast_analytics = PodcastAnalytics.objects.filter(podcast=podcast).first()
            if podcast_analytics:
                aggregated_data['total_listens'] += podcast_analytics.total_listens
                aggregated_data['total_unique_listeners'] += podcast_analytics.unique_listeners
                aggregated_data['average_listen_duration'] += podcast_analytics.average_listen_duration
            
            # Aggregate episode analytics
            episodes = Episode.objects.filter(podcast=podcast)
            for episode in episodes:
                episode_analytics = EpisodeAnalytics.objects.filter(episode=episode).first()
                if episode_analytics:
                    aggregated_data['total_listens'] += episode_analytics.total_listens
                    aggregated_data['total_unique_listeners'] += episode_analytics.unique_listeners
                    aggregated_data['average_listen_duration'] += episode_analytics.average_listen_duration
                
                # Aggregate marketing analytics
                marketing_analytics = MarketingAnalytics.objects.filter(episode=episode)
                for ma in marketing_analytics:
                    if ma.platform not in aggregated_data['marketing_performance']:
                        aggregated_data['marketing_performance'][ma.platform] = {
                            'impressions': 0,
                            'clicks': 0,
                            'conversions': 0,
                        }
                    aggregated_data['marketing_performance'][ma.platform]['impressions'] += ma.impressions
                    aggregated_data['marketing_performance'][ma.platform]['clicks'] += ma.clicks
                    aggregated_data['marketing_performance'][ma.platform]['conversions'] += ma.conversions
        
        # Calculate averages
        if aggregated_data['total_podcasts'] > 0:
            aggregated_data['average_listen_duration'] /= aggregated_data['total_podcasts']
        
        return JsonResponse(aggregated_data)

# Human tasks (to be implemented):
# 1. Implement data visualization endpoints for charts and graphs
# 2. Add filtering and date range selection for analytics data
# 3. Implement caching mechanism for frequently accessed analytics data
# 4. Add rate limiting to prevent abuse of analytics endpoints