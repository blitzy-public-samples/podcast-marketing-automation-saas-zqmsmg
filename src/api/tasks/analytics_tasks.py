from celery import shared_task
from datetime import datetime, timedelta
from django.db.models import Avg, Sum
from src.api.tasks.celery import app
from src.api.apps.episodes.models import Episode
from src.api.apps.analytics.models import Analytics

@app.task
def update_episode_analytics(episode_id: int) -> dict:
    """
    Celery task to update analytics data for a specific episode.

    Args:
        episode_id (int): The ID of the episode to update analytics for.

    Returns:
        dict: Updated analytics data.
    """
    try:
        episode = Episode.objects.get(id=episode_id)
    except Episode.DoesNotExist:
        return {"error": f"Episode with id {episode_id} not found"}

    # Fetch the latest analytics data from external sources
    # This is a placeholder and should be replaced with actual API calls
    new_analytics_data = fetch_latest_analytics(episode)

    # Create or update the Analytics instance for the episode
    analytics, created = Analytics.objects.update_or_create(
        episode=episode,
        defaults=new_analytics_data
    )

    return {
        "episode_id": episode.id,
        "title": episode.title,
        "analytics": new_analytics_data,
        "updated_at": datetime.now().isoformat()
    }

@app.task
def aggregate_podcast_analytics(podcast_id: int) -> dict:
    """
    Celery task to aggregate analytics data for all episodes of a podcast.

    Args:
        podcast_id (int): The ID of the podcast to aggregate analytics for.

    Returns:
        dict: Aggregated analytics data.
    """
    episodes = Episode.objects.filter(podcast_id=podcast_id)
    if not episodes:
        return {"error": f"No episodes found for podcast with id {podcast_id}"}

    aggregated_data = Analytics.objects.filter(episode__podcast_id=podcast_id).aggregate(
        total_downloads=Sum('downloads'),
        total_likes=Sum('likes'),
        total_shares=Sum('shares'),
        total_comments=Sum('comments'),
        avg_likes=Avg('likes'),
        avg_shares=Avg('shares'),
        avg_comments=Avg('comments')
    )

    # Update the Podcast instance with the aggregated data
    # This assumes there's a Podcast model with these fields
    podcast = episodes.first().podcast
    for key, value in aggregated_data.items():
        setattr(podcast, key, value)
    podcast.save()

    return {
        "podcast_id": podcast_id,
        "title": podcast.title,
        "aggregated_analytics": aggregated_data,
        "updated_at": datetime.now().isoformat()
    }

@app.task
@app.on_after_finalize.connect
def schedule_analytics_update():
    """
    Celery task to schedule regular updates of analytics data for all episodes.
    This task doesn't return a value.
    """
    active_episodes = Episode.objects.filter(status='published')
    
    for episode in active_episodes:
        update_episode_analytics.apply_async(
            args=[episode.id],
            countdown=timedelta(hours=6).total_seconds()
        )

def fetch_latest_analytics(episode):
    """
    Placeholder function to fetch latest analytics from external sources.
    This should be replaced with actual implementation.
    """
    # TODO: Implement API clients for external analytics data sources
    return {
        "downloads": 1000,
        "likes": 50,
        "shares": 25,
        "comments": 10
    }

# TODO: Set up proper error handling and retry mechanisms for API calls
# TODO: Configure Celery beat schedule for periodic analytics updates