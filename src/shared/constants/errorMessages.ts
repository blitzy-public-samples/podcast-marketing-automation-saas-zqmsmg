/**
 * This file contains constant error messages used throughout the Podcast Marketing Automation SaaS platform.
 * These messages provide consistent and user-friendly error feedback for various scenarios.
 */

const ErrorMessages = {
  NETWORK_ERROR: "Unable to connect to the server. Please check your internet connection and try again.",
  AUTHENTICATION_ERROR: "Authentication failed. Please check your credentials and try again.",
  UNAUTHORIZED_ERROR: "You are not authorized to perform this action. Please log in or contact support.",
  NOT_FOUND_ERROR: "The requested resource was not found. Please check the URL and try again.",
  SERVER_ERROR: "An unexpected error occurred on the server. Please try again later or contact support.",
  VALIDATION_ERROR: "Please check your input and try again. Some fields may be missing or invalid.",
  PODCAST_CREATION_ERROR: "Failed to create podcast. Please check your input and try again.",
  EPISODE_UPLOAD_ERROR: "Failed to upload episode. Please check your file and try again.",
  TRANSCRIPTION_ERROR: "Failed to generate transcript. Please try again or contact support.",
  MARKETING_CONTENT_GENERATION_ERROR: "Failed to generate marketing content. Please try again or adjust your input.",
  SOCIAL_MEDIA_POSTING_ERROR: "Failed to post to social media. Please check your account connection and try again.",
  ANALYTICS_FETCH_ERROR: "Failed to fetch analytics data. Please try again later.",
};

export default ErrorMessages;

/**
 * Human Tasks:
 * 1. Review and refine error messages to ensure they are clear, concise, and user-friendly (Required)
 * 2. Ensure all error messages are properly internationalized if multi-language support is required (Optional)
 */