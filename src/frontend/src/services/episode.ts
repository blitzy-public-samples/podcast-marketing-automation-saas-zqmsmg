import { api, handleApiError } from './api';
import { Episode, CreateEpisodeDto, UpdateEpisodeDto } from '../types/episode';

/**
 * Fetches a list of episodes for a specific podcast
 * @param podcastId - The ID of the podcast
 * @param params - Optional parameters for pagination and filtering
 * @returns Promise<Episode[]> - Array of Episode objects
 */
export const getEpisodes = async (podcastId: number, params?: Record<string, any>): Promise<Episode[]> => {
  try {
    const response = await api.get(`/podcasts/${podcastId}/episodes`, { params });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Fetches a single episode by its ID
 * @param episodeId - The ID of the episode
 * @returns Promise<Episode> - Single Episode object
 */
export const getEpisodeById = async (episodeId: number): Promise<Episode> => {
  try {
    const response = await api.get(`/episodes/${episodeId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Creates a new episode for a specific podcast
 * @param podcastId - The ID of the podcast
 * @param episodeData - The data for creating the new episode
 * @returns Promise<Episode> - Newly created Episode object
 */
export const createEpisode = async (podcastId: number, episodeData: CreateEpisodeDto): Promise<Episode> => {
  try {
    const response = await api.post(`/podcasts/${podcastId}/episodes`, episodeData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Updates an existing episode
 * @param episodeId - The ID of the episode to update
 * @param episodeData - The data for updating the episode
 * @returns Promise<Episode> - Updated Episode object
 */
export const updateEpisode = async (episodeId: number, episodeData: UpdateEpisodeDto): Promise<Episode> => {
  try {
    const response = await api.put(`/episodes/${episodeId}`, episodeData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Deletes an episode
 * @param episodeId - The ID of the episode to delete
 * @returns Promise<void>
 */
export const deleteEpisode = async (episodeId: number): Promise<void> => {
  try {
    await api.delete(`/episodes/${episodeId}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Uploads audio file for an episode
 * @param episodeId - The ID of the episode
 * @param audioFile - The audio file to upload
 * @returns Promise<{ audioUrl: string }> - Object containing the URL of the uploaded audio
 */
export const uploadEpisodeAudio = async (episodeId: number, audioFile: File): Promise<{ audioUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);
    const response = await api.post(`/episodes/${episodeId}/audio`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Generates a transcript for an episode
 * @param episodeId - The ID of the episode
 * @returns Promise<{ transcriptId: string }> - Object containing the ID of the generated transcript
 */
export const generateTranscript = async (episodeId: number): Promise<{ transcriptId: string }> => {
  try {
    const response = await api.post(`/episodes/${episodeId}/generate-transcript`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Human tasks (commented as requested):
// TODO: Implement error handling for specific API error codes related to episode operations
// TODO: Add support for cancelling ongoing file uploads (Optional)
// TODO: Implement progress tracking for audio file uploads (Optional)