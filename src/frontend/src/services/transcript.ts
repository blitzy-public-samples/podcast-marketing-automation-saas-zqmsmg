import { api, handleApiError } from './api';
import { Transcript, TranscriptCreateRequest } from '../types/transcript';

/**
 * Fetches a transcript for a specific episode
 * @param episodeId - The ID of the episode
 * @returns Promise<Transcript> - The transcript data
 */
export const getTranscript = async (episodeId: number): Promise<Transcript> => {
  try {
    const response = await api.get(`/api/episodes/${episodeId}/transcript`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Creates a new transcript for an episode
 * @param episodeId - The ID of the episode
 * @param transcriptData - The data for creating the transcript
 * @returns Promise<Transcript> - The created transcript data
 */
export const createTranscript = async (
  episodeId: number,
  transcriptData: TranscriptCreateRequest
): Promise<Transcript> => {
  try {
    const response = await api.post(`/api/episodes/${episodeId}/transcript`, transcriptData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Updates an existing transcript
 * @param transcriptId - The ID of the transcript to update
 * @param transcriptData - The data for updating the transcript
 * @returns Promise<Transcript> - The updated transcript data
 */
export const updateTranscript = async (
  transcriptId: number,
  transcriptData: Partial<TranscriptCreateRequest>
): Promise<Transcript> => {
  try {
    const response = await api.put(`/api/transcripts/${transcriptId}`, transcriptData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Deletes a transcript
 * @param transcriptId - The ID of the transcript to delete
 * @returns Promise<void> - Confirmation of deletion
 */
export const deleteTranscript = async (transcriptId: number): Promise<void> => {
  try {
    await api.delete(`/api/transcripts/${transcriptId}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

// Human tasks:
// TODO: Implement error handling for specific transcript-related errors
// TODO: Add functionality to handle large transcript files, possibly with streaming or chunked uploads
// TODO: Implement caching mechanism for frequently accessed transcripts