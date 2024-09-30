import logging
from celery import shared_task
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

from src.api.tasks.celery import app
from src.api.services.transcription import TranscriptionService
from src.api.apps.episodes.models import Episode
from src.api.apps.transcripts.models import Transcript

logger = logging.getLogger(__name__)

@app.task(bind=True, max_retries=3)
def transcribe_episode(self, episode_id: int) -> dict:
    """
    Celery task to transcribe a podcast episode.

    Args:
        self: The Celery task instance.
        episode_id (int): The ID of the episode to transcribe.

    Returns:
        dict: A dictionary containing the success status and transcript ID or error message.
    """
    logger.info(f"Starting transcription task for episode ID: {episode_id}")

    try:
        # Retrieve the Episode instance
        episode = Episode.objects.get(id=episode_id)

        # Check if the episode audio file exists
        if not episode.audio_file_url:
            raise ValueError("Episode audio file does not exist")

        # Initialize the TranscriptionService
        transcription_service = TranscriptionService()

        # Call the transcription service to generate the transcript
        transcript_content = transcription_service.transcribe(episode.audio_file_url)

        # Create a new Transcript instance with the generated content
        with transaction.atomic():
            transcript = Transcript.objects.create(
                episode=episode,
                content=transcript_content
            )

            # Update the Episode status to indicate transcription completion
            episode.status = "TRANSCRIBED"  # Assuming there's a status field in the Episode model
            episode.save()

        logger.info(f"Transcription task completed successfully for episode ID: {episode_id}")
        return {
            "success": True,
            "transcript_id": transcript.id
        }

    except ObjectDoesNotExist:
        logger.error(f"Episode with ID {episode_id} not found")
        return {
            "success": False,
            "error": f"Episode with ID {episode_id} not found"
        }

    except ValueError as ve:
        logger.error(f"Error in transcription task for episode ID {episode_id}: {str(ve)}")
        return {
            "success": False,
            "error": str(ve)
        }

    except Exception as e:
        logger.error(f"Unexpected error in transcription task for episode ID {episode_id}: {str(e)}")
        # Retry the task with exponential backoff
        retry_count = self.request.retries
        max_retry_delay = 60 * 60  # 1 hour
        retry_delay = min(2 ** retry_count * 60, max_retry_delay)  # Exponential backoff with max delay of 1 hour
        raise self.retry(exc=e, countdown=retry_delay)

# Pending human tasks:
# TODO: Implement proper error handling and retrying mechanism for transcription failures
# TODO: Set up monitoring and alerting for transcription task failures
# TODO: Optimize transcription process for large audio files