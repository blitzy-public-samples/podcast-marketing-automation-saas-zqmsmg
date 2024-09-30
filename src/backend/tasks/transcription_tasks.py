import logging
from celery import shared_task
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

# Assuming these imports are correct based on the specification
from src.backend.tasks.celery import app
from src.backend.apps.episodes.models import Episode
from src.backend.apps.transcripts.models import Transcript
from src.backend.services.transcription import transcription_service

logger = logging.getLogger(__name__)

@app.task(bind=True, max_retries=3)
def transcribe_episode(self, episode_id):
    """
    Celery task to transcribe a podcast episode.

    Args:
        self: The task instance (automatically injected by Celery).
        episode_id (int): The ID of the episode to transcribe.

    Returns:
        bool: True if transcription was successful, False otherwise.
    """
    try:
        # Retrieve the Episode instance using the provided episode_id
        episode = Episode.objects.get(id=episode_id)

        # Check if a Transcript already exists for the episode
        if Transcript.objects.filter(episode=episode).exists():
            logger.warning(f"Transcript already exists for episode {episode_id}. Skipping transcription.")
            return False

        # Call the transcription service to generate the transcript
        transcript_content = transcription_service.transcribe(episode.audio_file_url)

        # Create a new Transcript instance with the generated content
        with transaction.atomic():
            transcript = Transcript.objects.create(
                episode=episode,
                content=transcript_content
            )

            # Update the Episode status to indicate transcription is complete
            episode.status = 'TRANSCRIBED'  # Assuming there's a status field
            episode.save()

        # Log the successful transcription
        logger.info(f"Successfully transcribed episode {episode_id}")
        return True

    except ObjectDoesNotExist:
        logger.error(f"Episode with id {episode_id} not found")
        return False
    except Exception as e:
        logger.error(f"Error transcribing episode {episode_id}: {str(e)}")
        # Retry the task with exponential backoff
        retry_count = self.request.retries
        retry_delay = 60 * 2 ** retry_count  # 2 minutes, 4 minutes, 8 minutes
        raise self.retry(exc=e, countdown=retry_delay, max_retries=3)

@app.task
def batch_transcribe_episodes(episode_ids):
    """
    Celery task to transcribe multiple podcast episodes in batch.

    Args:
        episode_ids (list): A list of episode IDs to transcribe.

    Returns:
        dict: A dictionary with episode_ids as keys and transcription success status as values.
    """
    results = {}
    for episode_id in episode_ids:
        # Call the transcribe_episode task for each episode
        success = transcribe_episode.delay(episode_id)
        results[episode_id] = success

    # Log the batch transcription process completion
    logger.info(f"Batch transcription completed for episodes: {episode_ids}")
    return results

# Commented list of human tasks
"""
Human tasks:
1. Implement error handling and notification system for failed transcriptions (Required)
2. Set up monitoring and alerting for transcription task performance (Required)
3. Optimize batch transcription process for large numbers of episodes (Optional)
4. Implement a mechanism to handle different audio formats and quality levels (Required)
"""