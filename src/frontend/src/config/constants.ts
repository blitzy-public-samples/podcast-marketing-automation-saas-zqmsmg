/**
 * This file contains constant values used throughout the frontend application
 * of the Podcast Marketing Automation SaaS platform. It includes API endpoints,
 * UI-related constants, and configuration settings.
 */

// API Base URL
// TODO: Confirm the exact API_BASE_URL for the production environment
export const API_BASE_URL = 'https://api.podcastmarketingautomation.com/v1';

// Authentication
export const AUTH_TOKEN_KEY = 'pma_auth_token';

// UI Constants
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

// TODO: Verify the list of SUPPORTED_AUDIO_FORMATS with the backend team
export const SUPPORTED_AUDIO_FORMATS = ['.mp3', '.wav', '.m4a', '.ogg'];

export const DEFAULT_PAGINATION_LIMIT = 20;

export const SOCIAL_MEDIA_PLATFORMS = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'];

// TODO: Confirm the MAX_MARKETING_CONTENT_LENGTH for each social media platform
export const MAX_MARKETING_CONTENT_LENGTH: Record<string, number> = {
  Facebook: 63206,
  Twitter: 280,
  LinkedIn: 3000,
  Instagram: 2200,
};

export const ANALYTICS_CHART_COLORS = [
  '#4C51BF',
  '#ED8936',
  '#48BB78',
  '#4299E1',
  '#9F7AEA',
  '#ED64A6',
];

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm:ss';

export const DEFAULT_LANGUAGE = 'en';

// TODO: Review and finalize the list of SUPPORTED_LANGUAGES
export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh'];

export const ERROR_MESSAGES: Record<string, string> = {
  GENERIC: 'An error occurred. Please try again.',
  NETWORK: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
};

export const SUCCESS_MESSAGES: Record<string, string> = {
  GENERIC: 'Operation completed successfully.',
  SAVE: 'Your changes have been saved.',
  UPLOAD: 'File uploaded successfully.',
  DELETE: 'Item deleted successfully.',
};

export const ROLES: Record<string, string> = {
  ADMIN: 'admin',
  CREATOR: 'creator',
  COLLABORATOR: 'collaborator',
  VIEWER: 'viewer',
};

// File upload limit in bytes (100 MB)
export const FILE_SIZE_LIMIT = 100 * 1024 * 1024;

// Debounce delay for search inputs (in milliseconds)
export const DEBOUNCE_DELAY = 300;

// Refresh token threshold (in seconds)
export const REFRESH_TOKEN_THRESHOLD = 300; // 5 minutes

/**
 * TODO: Human Tasks
 * 1. Confirm the exact API_BASE_URL for the production environment
 * 2. Verify the list of SUPPORTED_AUDIO_FORMATS with the backend team
 * 3. Confirm the MAX_MARKETING_CONTENT_LENGTH for each social media platform
 * 4. Review and finalize the list of SUPPORTED_LANGUAGES
 */