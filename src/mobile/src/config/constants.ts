/**
 * This file contains constant values and configuration settings for the mobile application
 * of the Podcast Marketing Automation SaaS platform.
 */

// API base URL for the backend services
export const API_BASE_URL = "https://api.podcastmarketingautomation.com/v1";

// Application name
export const APP_NAME = "Podcast Marketing Automation";

// Current version of the mobile application
export const VERSION = "1.0.0";

// Storage keys for local data persistence
export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  USER_ID: "user_id",
};

// Supported social media platforms for content distribution
export const SOCIAL_MEDIA_PLATFORMS = [
  "Facebook",
  "Twitter",
  "LinkedIn",
  "Instagram",
];

// Maximum allowed audio file size in bytes (e.g., 100MB)
export const MAX_AUDIO_FILE_SIZE = 104857600;

// Supported audio formats for podcast episodes
export const SUPPORTED_AUDIO_FORMATS = ["mp3", "wav", "m4a", "ogg"];

// Default pagination limit for list views
export const DEFAULT_PAGINATION_LIMIT = 20;

// Color scheme for analytics charts
export const ANALYTICS_CHART_COLORS = {
  PRIMARY: "#1E40AF",
  SECONDARY: "#0D9488",
  TERTIARY: "#7C3AED",
};

// Common error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Unable to connect to the server. Please check your internet connection and try again.",
  AUTHENTICATION_FAILED: "Authentication failed. Please log in again.",
  INVALID_INPUT: "Please check your input and try again.",
};

// Default timeout duration for API requests (in milliseconds)
export const TIMEOUT_DURATION = 30000;

/**
 * TODO: Human Tasks
 * 1. Confirm the actual API base URL for the production environment
 * 2. Verify the supported audio formats and maximum file size with the backend team
 * 3. Decide on the specific color codes for analytics charts
 */