/**
 * API Endpoint Constants
 * 
 * This file contains all the API endpoint constants used for making requests to the backend
 * in the Podcast Marketing Automation SaaS platform. It provides a centralized location for
 * managing and accessing API URLs throughout the application.
 */

// Base URL for all API endpoints
export const BASE_URL = '/api/v1';

// Authentication endpoints
export const AUTH = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
};

// Podcast management endpoints
export const PODCASTS = {
  LIST: `${BASE_URL}/podcasts`,
  CREATE: `${BASE_URL}/podcasts`,
  DETAIL: (id: string | number) => `${BASE_URL}/podcasts/${id}`,
  UPDATE: (id: string | number) => `${BASE_URL}/podcasts/${id}`,
  DELETE: (id: string | number) => `${BASE_URL}/podcasts/${id}`,
};

// Episode management endpoints
export const EPISODES = {
  LIST: `${BASE_URL}/episodes`,
  CREATE: `${BASE_URL}/episodes`,
  DETAIL: (id: string | number) => `${BASE_URL}/episodes/${id}`,
  UPDATE: (id: string | number) => `${BASE_URL}/episodes/${id}`,
  DELETE: (id: string | number) => `${BASE_URL}/episodes/${id}`,
  UPLOAD: `${BASE_URL}/episodes/upload`,
};

// Transcript management endpoints
export const TRANSCRIPTS = {
  GET: (episodeId: string | number) => `${BASE_URL}/transcripts/${episodeId}`,
  GENERATE: (episodeId: string | number) => `${BASE_URL}/transcripts/generate/${episodeId}`,
};

// Marketing content management endpoints
export const MARKETING = {
  GENERATE_CONTENT: (episodeId: string | number) => `${BASE_URL}/marketing/generate/${episodeId}`,
  LIST_CONTENT: (episodeId: string | number) => `${BASE_URL}/marketing/content/${episodeId}`,
};

// Social media management endpoints
export const SOCIAL_MEDIA = {
  SCHEDULE_POST: `${BASE_URL}/social-media/schedule`,
  LIST_POSTS: `${BASE_URL}/social-media/posts`,
};

// Analytics endpoints
export const ANALYTICS = {
  PODCAST: (podcastId: string | number) => `${BASE_URL}/analytics/podcast/${podcastId}`,
  EPISODE: (episodeId: string | number) => `${BASE_URL}/analytics/episode/${episodeId}`,
};

// Export all endpoints as a single object for easy import in other files
export const API_ENDPOINTS = {
  BASE_URL,
  AUTH,
  PODCASTS,
  EPISODES,
  TRANSCRIPTS,
  MARKETING,
  SOCIAL_MEDIA,
  ANALYTICS,
};

// Human tasks (commented as requested)
/**
 * TODO: Human tasks
 * 1. [Required] Verify that all required API endpoints are included and correctly defined
 * 2. [Required] Ensure that the BASE_URL is correctly set for the production environment
 * 3. [Optional] Add any additional endpoints that may be required for future features
 */