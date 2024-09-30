import { api, handleApiError } from './api';
import { SocialMediaPost, SocialMediaPlatform } from '../types';

/**
 * Schedules a social media post for a specific platform
 * @param post The social media post to be scheduled
 * @returns A promise with the result of the scheduling operation
 */
export const schedulePost = async (post: SocialMediaPost): Promise<{ success: boolean; postId: string }> => {
  try {
    const response = await api.post('/social-media/schedule', post);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Retrieves the status of a scheduled social media post
 * @param postId The ID of the post to retrieve the status for
 * @returns A promise with the status of the post and the platform
 */
export const getPostStatus = async (postId: string): Promise<{ status: string; platform: SocialMediaPlatform }> => {
  try {
    const response = await api.get(`/social-media/status/${postId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Retrieves the list of connected social media accounts
 * @returns A promise with the list of connected accounts
 */
export const getSocialMediaAccounts = async (): Promise<Array<{ platform: SocialMediaPlatform; accountName: string }>> => {
  try {
    const response = await api.get('/social-media/accounts');
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Initiates the process to connect a new social media account
 * @param platform The social media platform to connect
 * @returns A promise with the result of the connection initiation
 */
export const connectSocialMediaAccount = async (platform: SocialMediaPlatform): Promise<{ success: boolean; authUrl: string }> => {
  try {
    const response = await api.post('/social-media/connect', { platform });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Human tasks:
// TODO: Implement error handling for specific social media platform errors
// TODO: Add support for bulk scheduling of posts across multiple platforms
// TODO: Implement a method to disconnect social media accounts