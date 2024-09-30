/**
 * Utility functions for validating inputs related to podcasts, episodes, marketing content,
 * and analytics data in the mobile application of the Podcast Marketing Automation SaaS platform
 */

/**
 * Validates the title of a podcast
 * @param title The title to validate
 * @returns Whether the title is valid
 */
export function validatePodcastTitle(title: string): boolean {
  // Check if the title is not empty
  if (!title || title.trim().length === 0) {
    return false;
  }

  // Check if the title length is within the allowed range
  // Assuming a valid title length between 3 and 100 characters
  if (title.length < 3 || title.length > 100) {
    return false;
  }

  // Check if the title contains only allowed characters
  // Assuming allowed characters are alphanumeric, spaces, and common punctuation
  const allowedCharacters = /^[a-zA-Z0-9 .,!?-]+$/;
  return allowedCharacters.test(title);
}

/**
 * Validates the title of a podcast episode
 * @param title The title to validate
 * @returns Whether the title is valid
 */
export function validateEpisodeTitle(title: string): boolean {
  // Check if the title is not empty
  if (!title || title.trim().length === 0) {
    return false;
  }

  // Check if the title length is within the allowed range
  // Assuming a valid title length between 3 and 200 characters
  if (title.length < 3 || title.length > 200) {
    return false;
  }

  // Check if the title contains only allowed characters
  // Assuming allowed characters are alphanumeric, spaces, and common punctuation
  const allowedCharacters = /^[a-zA-Z0-9 .,!?-]+$/;
  return allowedCharacters.test(title);
}

/**
 * Validates the duration of a podcast episode
 * @param duration The duration to validate (in seconds)
 * @returns Whether the duration is valid
 */
export function validateEpisodeDuration(duration: number): boolean {
  // Check if the duration is a positive number
  if (typeof duration !== 'number' || duration <= 0) {
    return false;
  }

  // Check if the duration is within the allowed range
  // Assuming a valid duration between 1 minute and 4 hours
  const minDuration = 60; // 1 minute in seconds
  const maxDuration = 14400; // 4 hours in seconds
  return duration >= minDuration && duration <= maxDuration;
}

/**
 * Validates the marketing content for social media posts
 * @param content The content to validate
 * @param platform The social media platform
 * @returns Whether the content is valid for the specified platform
 */
export function validateMarketingContent(content: string, platform: string): boolean {
  // Check if the content is not empty
  if (!content || content.trim().length === 0) {
    return false;
  }

  // Check if the content length is within the allowed range for the specified platform
  let maxLength: number;
  switch (platform.toLowerCase()) {
    case 'twitter':
      maxLength = 280;
      break;
    case 'facebook':
    case 'linkedin':
      maxLength = 3000;
      break;
    case 'instagram':
      maxLength = 2200;
      break;
    default:
      return false; // Invalid platform
  }

  if (content.length > maxLength) {
    return false;
  }

  // Check if the content contains only allowed characters
  // Assuming allowed characters are alphanumeric, spaces, and common punctuation
  const allowedCharacters = /^[a-zA-Z0-9 .,!?#@$%&*()_+\-=\[\]{};':"\\|,.<>/?]+$/;
  return allowedCharacters.test(content);
}

/**
 * Validates the analytics data input
 * @param data The analytics data object to validate
 * @returns Whether the analytics data is valid
 */
export function validateAnalyticsData(data: Record<string, any>): boolean {
  // Check if all required fields are present in the data object
  const requiredFields = ['downloads', 'likes', 'shares', 'comments'];
  for (const field of requiredFields) {
    if (!(field in data)) {
      return false;
    }
  }

  // Validate each field according to its expected type and range
  if (typeof data.downloads !== 'number' || data.downloads < 0) {
    return false;
  }

  if (typeof data.likes !== 'number' || data.likes < 0) {
    return false;
  }

  if (typeof data.shares !== 'number' || data.shares < 0) {
    return false;
  }

  if (typeof data.comments !== 'number' || data.comments < 0) {
    return false;
  }

  return true;
}

// TODO: Define specific validation rules for each function (e.g., allowed character ranges, minimum/maximum lengths)
// TODO: Implement unit tests for each validation function
// TODO: Review and approve the validation functions and their logic