import { AxiosResponse } from 'axios';
import api from './api';
import { Podcast, PodcastCreateInput, PodcastUpdateInput, PodcastListItem } from '../types/podcast';

/**
 * Service module for handling podcast-related API calls and data management
 * in the mobile application of the Podcast Marketing Automation SaaS platform
 */

/**
 * Fetches a list of podcasts for the authenticated user
 * @returns {Promise<PodcastListItem[]>} A promise that resolves to an array of PodcastListItem objects
 */
export const getPodcasts = async (): Promise<PodcastListItem[]> => {
  try {
    const response: AxiosResponse<PodcastListItem[]> = await api.get('/podcasts');
    return response.data;
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw error;
  }
};

/**
 * Fetches a single podcast by its ID
 * @param {string} id - The ID of the podcast to fetch
 * @returns {Promise<Podcast>} A promise that resolves to a Podcast object
 */
export const getPodcastById = async (id: string): Promise<Podcast> => {
  try {
    const response: AxiosResponse<Podcast> = await api.get(`/podcasts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching podcast with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new podcast
 * @param {PodcastCreateInput} podcastData - The data for creating a new podcast
 * @returns {Promise<Podcast>} A promise that resolves to the created Podcast object
 */
export const createPodcast = async (podcastData: PodcastCreateInput): Promise<Podcast> => {
  try {
    const response: AxiosResponse<Podcast> = await api.post('/podcasts', podcastData);
    return response.data;
  } catch (error) {
    console.error('Error creating podcast:', error);
    throw error;
  }
};

/**
 * Updates an existing podcast
 * @param {string} id - The ID of the podcast to update
 * @param {PodcastUpdateInput} podcastData - The data for updating the podcast
 * @returns {Promise<Podcast>} A promise that resolves to the updated Podcast object
 */
export const updatePodcast = async (id: string, podcastData: PodcastUpdateInput): Promise<Podcast> => {
  try {
    const response: AxiosResponse<Podcast> = await api.put(`/podcasts/${id}`, podcastData);
    return response.data;
  } catch (error) {
    console.error(`Error updating podcast with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a podcast
 * @param {string} id - The ID of the podcast to delete
 * @returns {Promise<void>} A promise that resolves when the podcast is successfully deleted
 */
export const deletePodcast = async (id: string): Promise<void> => {
  try {
    await api.delete(`/podcasts/${id}`);
  } catch (error) {
    console.error(`Error deleting podcast with id ${id}:`, error);
    throw error;
  }
};

// Human tasks:
// TODO: Implement error handling for API calls
// TODO: Add caching mechanism for frequently accessed podcast data
// TODO: Implement pagination for getPodcasts function if the API supports it