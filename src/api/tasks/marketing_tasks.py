import logging
from celery import shared_task
from typing import List, Dict
from src.api.tasks.celery import app
from src.api.services import content_generation, social_media_integration
from src.api.apps.episodes.models import Episode
from src.api.apps.marketing.models import MarketingContent
from src.api.apps.social_media.models import SocialMediaPost

logger = logging.getLogger(__name__)

@app.task(bind=True, max_retries=3)
def generate_marketing_content(self, episode_id: int, platforms: List[str]) -> Dict[str, str]:
    """
    Celery task to generate marketing content for a given episode.

    Args:
        episode_id (int): The ID of the episode to generate content for.
        platforms (List[str]): List of social media platforms to generate content for.

    Returns:
        Dict[str, str]: Generated marketing content for each platform.
    """
    try:
        # Retrieve the episode from the database
        episode = Episode.objects.get(id=episode_id)

        generated_content = {}
        for platform in platforms:
            # Generate marketing content using the content generation service
            content = content_generation.generate_content(episode, platform)
            
            # Save the generated content to the MarketingContent model
            marketing_content = MarketingContent.objects.create(
                episode=episode,
                platform=platform,
                content=content,
                status='generated'
            )
            
            generated_content[platform] = content

        logger.info(f"Generated marketing content for episode {episode_id} on platforms: {', '.join(platforms)}")
        return generated_content

    except Episode.DoesNotExist:
        logger.error(f"Episode with id {episode_id} not found")
        raise self.retry(countdown=60 * 5, max_retries=3)
    except Exception as e:
        logger.error(f"Error generating marketing content for episode {episode_id}: {str(e)}")
        raise self.retry(exc=e, countdown=60 * 5, max_retries=3)

@app.task(bind=True, max_retries=3)
def schedule_social_media_posts(self, marketing_content_id: int) -> Dict[str, Dict]:
    """
    Celery task to schedule social media posts for generated marketing content.

    Args:
        marketing_content_id (int): The ID of the marketing content to schedule.

    Returns:
        Dict[str, Dict]: Scheduled post information for each platform.
    """
    try:
        # Retrieve the marketing content from the database
        marketing_content = MarketingContent.objects.get(id=marketing_content_id)

        scheduled_posts = {}
        # Schedule a post using the social media integration service
        post_info = social_media_integration.schedule_post(
            platform=marketing_content.platform,
            content=marketing_content.content,
            scheduled_time=marketing_content.scheduled_time
        )
        
        # Save the scheduled post information to the SocialMediaPost model
        social_media_post = SocialMediaPost.objects.create(
            marketing_content=marketing_content,
            platform=marketing_content.platform,
            post_id=post_info['post_id'],
            scheduled_time=post_info['scheduled_time'],
            status='scheduled'
        )
        
        scheduled_posts[marketing_content.platform] = post_info

        logger.info(f"Scheduled social media post for marketing content {marketing_content_id} on {marketing_content.platform}")
        return scheduled_posts

    except MarketingContent.DoesNotExist:
        logger.error(f"Marketing content with id {marketing_content_id} not found")
        raise self.retry(countdown=60 * 5, max_retries=3)
    except Exception as e:
        logger.error(f"Error scheduling social media post for marketing content {marketing_content_id}: {str(e)}")
        raise self.retry(exc=e, countdown=60 * 5, max_retries=3)

@app.task(bind=True)
def analyze_marketing_performance(self, episode_id: int) -> Dict[str, Dict]:
    """
    Celery task to analyze the performance of marketing content and social media posts.

    Args:
        episode_id (int): The ID of the episode to analyze.

    Returns:
        Dict[str, Dict]: Performance metrics for the episode's marketing efforts.
    """
    try:
        # Retrieve the episode and its associated marketing content and social media posts
        episode = Episode.objects.get(id=episode_id)
        marketing_contents = MarketingContent.objects.filter(episode=episode)
        social_media_posts = SocialMediaPost.objects.filter(marketing_content__episode=episode)

        performance_metrics = {}
        for platform in set(post.platform for post in social_media_posts):
            # Collect performance metrics from various social media platforms
            platform_metrics = social_media_integration.get_performance_metrics(
                platform=platform,
                post_ids=[post.post_id for post in social_media_posts if post.platform == platform]
            )
            
            # Analyze the collected data to generate insights
            insights = content_generation.analyze_performance(platform_metrics)
            
            performance_metrics[platform] = {
                'metrics': platform_metrics,
                'insights': insights
            }

        # Save the analysis results to the Analytics model
        # Note: Assuming an Analytics model exists, you may need to create it
        # analytics = Analytics.objects.create(
        #     episode=episode,
        #     performance_data=performance_metrics
        # )

        logger.info(f"Analyzed marketing performance for episode {episode_id}")
        return performance_metrics

    except Episode.DoesNotExist:
        logger.error(f"Episode with id {episode_id} not found")
        return {}
    except Exception as e:
        logger.error(f"Error analyzing marketing performance for episode {episode_id}: {str(e)}")
        return {}

# Human tasks (commented)
"""
TODO: Implement error handling and retry logic for external API calls
TODO: Set up monitoring and alerting for long-running or failing tasks
TODO: Optimize task performance and consider using task priority queues
"""