import { AxiosResponse } from 'axios';
import api from './api';
import { Podcast, PodcastCreateInput, PodcastUpdateInput, PodcastFilters } from '../types/podcast';

/**
 * Fetches a list of podcasts based on optional filters
 * @param filters Optional filters to apply to the podcast list
 * @returns A promise that resolves to an array of Podcast objects
 */
export const getPodcasts = async (filters?: PodcastFilters): Promise<AxiosResponse<Podcast[]>> => {
  const queryParams = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });
  }
  return api.get(`/podcasts?${queryParams.toString()}`);
};

/**
 * Fetches a single podcast by its ID
 * @param id The ID of the podcast to fetch
 * @returns A promise that resolves to a single Podcast object
 */
export const getPodcastById = async (id: string): Promise<AxiosResponse<Podcast>> => {
  return api.get(`/podcasts/${id}`);
};

/**
 * Creates a new podcast
 * @param podcastData The data for the new podcast
 * @returns A promise that resolves to the created Podcast object
 */
export const createPodcast = async (podcastData: PodcastCreateInput): Promise<AxiosResponse<Podcast>> => {
  return api.post('/podcasts', podcastData);
};

/**
 * Updates an existing podcast
 * @param id The ID of the podcast to update
 * @param podcastData The updated data for the podcast
 * @returns A promise that resolves to the updated Podcast object
 */
export const updatePodcast = async (id: string, podcastData: PodcastUpdateInput): Promise<AxiosResponse<Podcast>> => {
  return api.put(`/podcasts/${id}`, podcastData);
};

/**
 * Deletes a podcast
 * @param id The ID of the podcast to delete
 * @returns A promise that resolves when the podcast is successfully deleted
 */
export const deletePodcast = async (id: string): Promise<AxiosResponse<void>> => {
  return api.delete(`/podcasts/${id}`);
};

/**
 * Uploads a cover image for a podcast
 * @param id The ID of the podcast
 * @param image The image file to upload
 * @returns A promise that resolves to an object containing the URL of the uploaded cover image
 */
export const uploadPodcastCoverImage = async (id: string, image: File): Promise<AxiosResponse<{ coverImageUrl: string }>> => {
  const formData = new FormData();
  formData.append('image', image);
  return api.post(`/podcasts/${id}/cover-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Human tasks:
// TODO: Implement error handling and retry logic for API calls
// TODO: Add caching mechanism for frequently accessed podcasts to improve performance
// TODO: Implement pagination for the getPodcasts function if the API supports it
// TODO: Add unit tests for each function in the podcast service