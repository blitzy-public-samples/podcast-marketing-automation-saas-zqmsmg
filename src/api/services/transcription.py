import logging
from google.cloud import speech
from google.cloud.speech import RecognitionAudio, RecognitionConfig
from celery import shared_task
from typing import Optional

# Assuming these imports are correct based on the provided structure
from src.api.apps.episodes.models import Episode
from src.api.apps.transcripts.models import Transcript
from src.api.services.storage import StorageService

# Global constants
SAMPLE_RATE_HERTZ = 16000
LANGUAGE_CODE = "en-US"

logger = logging.getLogger(__name__)

class TranscriptionService:
    """
    A service class for handling podcast episode transcription using Google Cloud Speech-to-Text API.
    """

    def __init__(self, storage_service: StorageService):
        """
        Initializes the TranscriptionService with necessary dependencies.

        Args:
            storage_service (StorageService): An instance of the StorageService for handling file storage.
        """
        self.storage_service = storage_service
        self.speech_client = speech.SpeechClient()

    def transcribe_episode(self, episode: Episode) -> Optional[Transcript]:
        """
        Transcribes a given podcast episode using Google Cloud Speech-to-Text API.

        Args:
            episode (Episode): The episode to be transcribed.

        Returns:
            Optional[Transcript]: The generated transcript object, or None if transcription fails.
        """
        try:
            # Retrieve audio file from storage service
            audio_file = self.storage_service.get_file(episode.audio_file_url)

            # Configure recognition settings
            config = RecognitionConfig(
                encoding=RecognitionConfig.AudioEncoding.LINEAR16,
                sample_rate_hertz=SAMPLE_RATE_HERTZ,
                language_code=LANGUAGE_CODE,
            )

            # Send audio for transcription
            audio = RecognitionAudio(content=audio_file.read())
            response = self.speech_client.recognize(config=config, audio=audio)

            # Process and format the transcription result
            transcript_text = ""
            for result in response.results:
                transcript_text += result.alternatives[0].transcript + " "

            # Create and save Transcript object
            transcript = Transcript.objects.create(
                episode=episode,
                content=transcript_text.strip()
            )

            return transcript

        except Exception as e:
            logger.error(f"Error transcribing episode {episode.id}: {str(e)}")
            return None

    def get_transcript(self, episode: Episode) -> Optional[Transcript]:
        """
        Retrieves the transcript for a given episode if it exists, otherwise triggers transcription.

        Args:
            episode (Episode): The episode for which to get or create a transcript.

        Returns:
            Optional[Transcript]: The retrieved or generated transcript object, or None if it fails.
        """
        try:
            # Check if transcript exists for the episode
            transcript = Transcript.objects.filter(episode=episode).first()

            if transcript:
                return transcript

            # If not, call transcribe_episode method
            return self.transcribe_episode(episode)

        except Exception as e:
            logger.error(f"Error getting transcript for episode {episode.id}: {str(e)}")
            return None

    def update_transcript(self, episode: Episode, new_content: str) -> Optional[Transcript]:
        """
        Updates the transcript for a given episode.

        Args:
            episode (Episode): The episode whose transcript needs to be updated.
            new_content (str): The new content for the transcript.

        Returns:
            Optional[Transcript]: The updated transcript object, or None if it fails.
        """
        try:
            # Retrieve existing transcript for the episode
            transcript = Transcript.objects.filter(episode=episode).first()

            if not transcript:
                logger.warning(f"No transcript found for episode {episode.id}")
                return None

            # Update transcript content
            transcript.content = new_content
            transcript.save()

            return transcript

        except Exception as e:
            logger.error(f"Error updating transcript for episode {episode.id}: {str(e)}")
            return None

@shared_task
def transcribe_episode_task(episode_id: int):
    """
    Celery task for asynchronous transcription of an episode.

    Args:
        episode_id (int): The ID of the episode to be transcribed.
    """
    try:
        episode = Episode.objects.get(id=episode_id)
        storage_service = StorageService()  # Assuming StorageService doesn't require any arguments
        transcription_service = TranscriptionService(storage_service)
        transcription_service.transcribe_episode(episode)
    except Episode.DoesNotExist:
        logger.error(f"Episode with id {episode_id} not found")
    except Exception as e:
        logger.error(f"Error in transcribe_episode_task for episode {episode_id}: {str(e)}")

# TODO: Implement error handling for API rate limits and quotas
# TODO: Add support for multiple languages in transcription
# TODO: Implement caching mechanism for frequently accessed transcripts