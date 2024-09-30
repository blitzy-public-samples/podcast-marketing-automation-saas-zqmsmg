import { api, handleApiError } from './api';
import { MarketingContent, SocialMediaPost, MarketingAnalytics } from '../types/marketing';

/**
 * Marketing service for the Podcast Marketing Automation SaaS platform.
 * Provides functions to interact with the backend API for marketing-related operations.
 */

/**
 * Generates marketing content for a specific episode
 * @param episodeId - The ID of the episode
 * @param platform - The social media platform for content generation
 * @returns Promise resolving to the generated marketing content
 */
export const generateMarketingContent = async (
  episodeId: number,
  platform: string
): Promise<MarketingContent> => {
  try {
    const response = await api.post('/api/marketing/generate', { episodeId, platform });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Schedules a social media post
 * @param postData - The data for the social media post
 * @returns Promise resolving to the scheduled social media post
 */
export const schedulePost = async (postData: object): Promise<SocialMediaPost> => {
  try {
    const response = await api.post('/api/social-media/schedule', postData);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Retrieves marketing analytics for a specific episode or podcast
 * @param id - The ID of the episode or podcast
 * @param type - The type of content (episode or podcast)
 * @returns Promise resolving to the marketing analytics data
 */
export const getMarketingAnalytics = async (
  id: number,
  type: string
): Promise<MarketingAnalytics> => {
  try {
    const response = await api.get('/api/analytics/marketing', { params: { id, type } });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Retrieves a list of scheduled social media posts
 * @param podcastId - The ID of the podcast
 * @returns Promise resolving to an array of scheduled social media posts
 */
export const getScheduledPosts = async (podcastId: number): Promise<SocialMediaPost[]> => {
  try {
    const response = await api.get('/api/social-media/scheduled', { params: { podcastId } });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// Human tasks:
// TODO: Implement error handling for specific marketing-related errors
// TODO: Add pagination support for getScheduledPosts function
// TODO: Implement caching mechanism for frequently accessed marketing analytics