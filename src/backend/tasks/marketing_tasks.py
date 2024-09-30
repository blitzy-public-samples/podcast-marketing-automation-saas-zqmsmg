import logging
from celery import shared_task
from django.core.exceptions import ObjectDoesNotExist

from src.backend.apps.episodes.models import Episode
from src.backend.apps.marketing.models import MarketingContent
from src.backend.apps.social_media.models import SocialMediaPost
from src.backend.services.content_generation import generate_content
from src.backend.services.social_media_integration import schedule_social_media_post, check_post_status

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def generate_marketing_content(self, episode_id):
    """
    Asynchronous task to generate marketing content for a given episode.

    Args:
        self: The task instance (automatically injected by Celery).
        episode_id (int): The ID of the Episode for which to generate content.

    Returns:
        dict: Generated marketing content.
    """
    try:
        # Retrieve the Episode instance using the provided episode_id
        episode = Episode.objects.get(id=episode_id)

        # Call the content generation service to create marketing content
        generated_content = generate_content(episode)

        # Create and save MarketingContent instances for each generated content
        marketing_contents = []
        for content_type, content in generated_content.items():
            marketing_content = MarketingContent.objects.create(
                episode=episode,
                content_type=content_type,
                content=content
            )
            marketing_contents.append(marketing_content)

        # Log the successful generation of marketing content
        logger.info(f"Successfully generated marketing content for episode {episode_id}")

        # Return the generated content
        return {content.content_type: content.content for content in marketing_contents}

    except ObjectDoesNotExist:
        logger.error(f"Episode with id {episode_id} not found")
        raise self.retry(countdown=60 * 5, max_retries=3)
    except Exception as e:
        logger.error(f"Error generating marketing content for episode {episode_id}: {str(e)}")
        raise self.retry(exc=e, countdown=60 * 5, max_retries=3)

@shared_task(bind=True, max_retries=3)
def schedule_social_media_posts(self, marketing_content_id):
    """
    Asynchronous task to schedule social media posts for generated marketing content.

    Args:
        self: The task instance (automatically injected by Celery).
        marketing_content_id (int): The ID of the MarketingContent to schedule.

    Returns:
        dict: Scheduled social media post details.
    """
    try:
        # Retrieve the MarketingContent instance using the provided marketing_content_id
        marketing_content = MarketingContent.objects.get(id=marketing_content_id)

        # Call the social media integration service to schedule posts
        scheduled_posts = schedule_social_media_post(marketing_content)

        # Create and save SocialMediaPost instances for each scheduled post
        social_media_posts = []
        for platform, post_details in scheduled_posts.items():
            social_media_post = SocialMediaPost.objects.create(
                marketing_content=marketing_content,
                platform=platform,
                post_id=post_details['post_id'],
                scheduled_time=post_details['scheduled_time'],
                status='scheduled'
            )
            social_media_posts.append(social_media_post)

        # Log the successful scheduling of social media posts
        logger.info(f"Successfully scheduled social media posts for marketing content {marketing_content_id}")

        # Return the scheduled post details
        return {post.platform: {'post_id': post.post_id, 'scheduled_time': post.scheduled_time} for post in social_media_posts}

    except ObjectDoesNotExist:
        logger.error(f"MarketingContent with id {marketing_content_id} not found")
        raise self.retry(countdown=60 * 5, max_retries=3)
    except Exception as e:
        logger.error(f"Error scheduling social media posts for marketing content {marketing_content_id}: {str(e)}")
        raise self.retry(exc=e, countdown=60 * 5, max_retries=3)

@shared_task(bind=True, max_retries=3)
def update_social_media_post_status(self, social_media_post_id):
    """
    Asynchronous task to update the status of a scheduled social media post.

    Args:
        self: The task instance (automatically injected by Celery).
        social_media_post_id (int): The ID of the SocialMediaPost to update.

    Returns:
        dict: Updated social media post status.
    """
    try:
        # Retrieve the SocialMediaPost instance using the provided social_media_post_id
        social_media_post = SocialMediaPost.objects.get(id=social_media_post_id)

        # Call the social media integration service to check the post status
        updated_status = check_post_status(social_media_post.platform, social_media_post.post_id)

        # Update the SocialMediaPost instance with the new status
        social_media_post.status = updated_status
        social_media_post.save()

        # Log the status update of the social media post
        logger.info(f"Successfully updated status for social media post {social_media_post_id}")

        # Return the updated post status
        return {'post_id': social_media_post.post_id, 'status': updated_status}

    except ObjectDoesNotExist:
        logger.error(f"SocialMediaPost with id {social_media_post_id} not found")
        raise self.retry(countdown=60 * 5, max_retries=3)
    except Exception as e:
        logger.error(f"Error updating status for social media post {social_media_post_id}: {str(e)}")
        raise self.retry(exc=e, countdown=60 * 5, max_retries=3)

# TODO: Implement error handling and retrying logic for each task
# TODO: Set up monitoring and alerting for long-running or failing tasks
# TODO: Optimize task performance and resource usage
# TODO: Implement rate limiting for social media API calls