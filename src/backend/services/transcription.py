import os
from google.cloud import speech, storage
from celery import shared_task
from typing import Dict, Any

# Assuming StorageService is implemented elsewhere
from .storage import StorageService

# Global constants
SAMPLE_RATE_HERTZ = 16000
LANGUAGE_CODE = "en-US"

class TranscriptionService:
    """Service class for handling podcast episode transcription"""

    def __init__(self):
        """Initializes the TranscriptionService with necessary clients and services"""
        self.storage_service = StorageService()
        self.speech_client = speech.SpeechClient()

    def transcribe_episode(self, episode_id: int, audio_file_url: str) -> str:
        """
        Initiates the transcription process for a podcast episode

        Args:
            episode_id (int): The ID of the episode to transcribe
            audio_file_url (str): The URL of the audio file to transcribe

        Returns:
            str: Task ID of the initiated Celery task
        """
        # Validate input parameters
        if not isinstance(episode_id, int) or not isinstance(audio_file_url, str):
            raise ValueError("Invalid input parameters")

        # Call transcribe_audio Celery task asynchronously
        task = transcribe_audio.delay(audio_file_url, episode_id)

        # Return the task ID
        return task.id

    def get_transcription_status(self, task_id: str) -> Dict[str, Any]:
        """
        Checks the status of a transcription task

        Args:
            task_id (str): The ID of the Celery task to check

        Returns:
            dict: Status information of the transcription task
        """
        # Retrieve task status from Celery
        task = transcribe_audio.AsyncResult(task_id)

        # Return status information
        return {
            "task_id": task_id,
            "status": task.status,
            "result": task.result if task.successful() else None,
        }


@shared_task
def transcribe_audio(audio_file_url: str, episode_id: int) -> Dict[str, Any]:
    """
    Celery task for asynchronous transcription of audio files

    Args:
        audio_file_url (str): The URL of the audio file to transcribe
        episode_id (int): The ID of the episode being transcribed

    Returns:
        dict: Transcription result containing text and confidence
    """
    # Retrieve audio file from StorageService
    storage_service = StorageService()
    audio_content = storage_service.get_file_content(audio_file_url)

    # Configure Google Cloud Speech client
    client = speech.SpeechClient()

    # Perform long-running recognition on audio file
    audio = speech.RecognitionAudio(content=audio_content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=SAMPLE_RATE_HERTZ,
        language_code=LANGUAGE_CODE,
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print(f"Waiting for operation to complete... for episode_id: {episode_id}")
    response = operation.result(timeout=90)

    # Process and format transcription results
    transcript = ""
    confidence = 0.0

    for result in response.results:
        transcript += result.alternatives[0].transcript + " "
        confidence += result.alternatives[0].confidence

    if response.results:
        confidence /= len(response.results)

    # Save transcription to database
    # This step would typically involve interacting with a database model
    # For now, we'll just print the result
    print(f"Transcription for episode {episode_id} completed.")

    # Return transcription result
    return {
        "episode_id": episode_id,
        "transcript": transcript.strip(),
        "confidence": confidence,
    }

# Pending human tasks:
# TODO: Set up Google Cloud Speech-to-Text API credentials and permissions
# TODO: Implement error handling and retries for transcription tasks
# TODO: Optimize audio file processing for large files
# TODO: Implement support for multiple languages in transcription