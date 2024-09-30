import { AxiosResponse } from 'axios';
import api from './api';

// Define types based on the JSON specification
export interface Episode {
  id: string;
  title: string;
  description: string;
  audioFileUrl: string;
  publishDate: string;
  // Add other relevant fields
}

export interface EpisodeListItem {
  id: string;
  title: string;
  publishDate: string;
  // Add other relevant fields for list view
}

export interface EpisodeCreateInput {
  title: string;
  description: string;
  // Add other fields required for episode creation
}

export interface EpisodeUpdateInput {
  title?: string;
  description?: string;
  // Add other fields that can be updated
}

/**
 * Service module for handling episode-related API calls and data management
 * in the mobile application of the Podcast Marketing Automation SaaS platform
 */
export const episodeService = {
  /**
   * Fetches a list of episodes for a given podcast
   * @param podcastId The ID of the podcast
   * @returns A promise that resolves to an array of EpisodeListItem objects
   */
  getEpisodes: async (podcastId: string): Promise<EpisodeListItem[]> => {
    try {
      const response: AxiosResponse<EpisodeListItem[]> = await api.get(`/podcasts/${podcastId}/episodes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      throw error;
    }
  },

  /**
   * Fetches a single episode by its ID
   * @param episodeId The ID of the episode
   * @returns A promise that resolves to an Episode object
   */
  getEpisodeById: async (episodeId: string): Promise<Episode> => {
    try {
      const response: AxiosResponse<Episode> = await api.get(`/episodes/${episodeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching episode:', error);
      throw error;
    }
  },

  /**
   * Creates a new episode
   * @param episodeData The data for the new episode
   * @returns A promise that resolves to the newly created Episode object
   */
  createEpisode: async (episodeData: EpisodeCreateInput): Promise<Episode> => {
    try {
      const response: AxiosResponse<Episode> = await api.post('/episodes', episodeData);
      return response.data;
    } catch (error) {
      console.error('Error creating episode:', error);
      throw error;
    }
  },

  /**
   * Updates an existing episode
   * @param episodeId The ID of the episode to update
   * @param episodeData The updated data for the episode
   * @returns A promise that resolves to the updated Episode object
   */
  updateEpisode: async (episodeId: string, episodeData: EpisodeUpdateInput): Promise<Episode> => {
    try {
      const response: AxiosResponse<Episode> = await api.put(`/episodes/${episodeId}`, episodeData);
      return response.data;
    } catch (error) {
      console.error('Error updating episode:', error);
      throw error;
    }
  },

  /**
   * Deletes an episode
   * @param episodeId The ID of the episode to delete
   * @returns A promise that resolves when the episode is successfully deleted
   */
  deleteEpisode: async (episodeId: string): Promise<void> => {
    try {
      await api.delete(`/episodes/${episodeId}`);
    } catch (error) {
      console.error('Error deleting episode:', error);
      throw error;
    }
  },

  /**
   * Uploads audio file for an episode
   * @param episodeId The ID of the episode
   * @param audioFile The audio file to upload
   * @returns A promise that resolves to the URL of the uploaded audio file
   */
  uploadEpisodeAudio: async (episodeId: string, audioFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioFile);
      const response: AxiosResponse<{ url: string }> = await api.post(`/episodes/${episodeId}/audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (error) {
      console.error('Error uploading episode audio:', error);
      throw error;
    }
  },
};

export default episodeService;

// TODO: Implement error handling for API calls
// TODO: Add caching mechanism for frequently accessed episode data
// TODO: Implement pagination for the getEpisodes function if handling large datasets
// TODO: Add unit tests for all functions in the episode service