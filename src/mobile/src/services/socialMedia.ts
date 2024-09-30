import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, TIMEOUT_DURATION, SOCIAL_MEDIA_PLATFORMS } from '../config/constants';
import { MobileMarketingContent, MarketingContentStatus } from '../types/marketing';

// Create an axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT_DURATION,
});

/**
 * Schedules a social media post for a specific platform
 * @param content The marketing content to be posted
 * @param platform The social media platform to post on
 * @param scheduledDate The date and time to schedule the post
 * @returns A promise with the result of the scheduling operation
 */
export const scheduleSocialMediaPost = async (
  content: MobileMarketingContent,
  platform: string,
  scheduledDate: Date
): Promise<{ success: boolean; postId: string }> => {
  try {
    // Validate input parameters
    if (!content || !platform || !scheduledDate) {
      throw new Error('Invalid input parameters');
    }

    // Send a POST request to the API to schedule the post
    const response = await api.post('/social-media/schedule', {
      content,
      platform,
      scheduledDate: scheduledDate.toISOString(),
    });

    return response.data;
  } catch (error) {
    console.error('Error scheduling social media post:', error);
    throw error;
  }
};

/**
 * Retrieves the status of a scheduled social media post
 * @param postId The ID of the scheduled post
 * @param platform The social media platform of the post
 * @returns A promise with the current status of the post
 */
export const getSocialMediaPostStatus = async (
  postId: string,
  platform: string
): Promise<{ status: MarketingContentStatus; details: string }> => {
  try {
    // Send a GET request to the API to fetch the post status
    const response = await api.get(`/social-media/status/${platform}/${postId}`);

    return response.data;
  } catch (error) {
    console.error('Error getting social media post status:', error);
    throw error;
  }
};

/**
 * Updates an existing scheduled social media post
 * @param postId The ID of the post to update
 * @param updatedContent The updated marketing content
 * @param platform The social media platform of the post
 * @returns A promise with the result of the update operation
 */
export const updateSocialMediaPost = async (
  postId: string,
  updatedContent: MobileMarketingContent,
  platform: string
): Promise<{ success: boolean }> => {
  try {
    // Validate input parameters
    if (!postId || !updatedContent || !platform) {
      throw new Error('Invalid input parameters');
    }

    // Send a PUT request to the API to update the post
    const response = await api.put(`/social-media/update/${platform}/${postId}`, updatedContent);

    return response.data;
  } catch (error) {
    console.error('Error updating social media post:', error);
    throw error;
  }
};

/**
 * Deletes a scheduled social media post
 * @param postId The ID of the post to delete
 * @param platform The social media platform of the post
 * @returns A promise with the result of the deletion operation
 */
export const deleteSocialMediaPost = async (
  postId: string,
  platform: string
): Promise<{ success: boolean }> => {
  try {
    // Send a DELETE request to the API to remove the scheduled post
    const response = await api.delete(`/social-media/delete/${platform}/${postId}`);

    return response.data;
  } catch (error) {
    console.error('Error deleting social media post:', error);
    throw error;
  }
};

/**
 * Retrieves the list of supported social media platforms
 * @returns An array of supported platform names
 */
export const getSupportedPlatforms = (): string[] => {
  return SOCIAL_MEDIA_PLATFORMS;
};

// TODO: Implement error handling and retry logic for network failures
// TODO: Add authentication token handling to API requests
// TODO: Implement caching mechanism for getSupportedPlatforms to reduce API calls