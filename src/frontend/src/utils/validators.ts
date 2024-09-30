/**
 * This file contains utility functions for validating various inputs and data structures
 * used in the Podcast Marketing Automation SaaS platform frontend.
 */

/**
 * Validates if the given string is a valid email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if the given password meets the required criteria
 * @param password The password to validate
 * @returns True if the password is valid, false otherwise
 */
export const isValidPassword = (password: string): boolean => {
  // Check if the password is at least 8 characters long
  if (password.length < 8) return false;

  // Ensure it contains at least one uppercase letter, one lowercase letter, one number, and one special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
};

/**
 * Validates if the given podcast title meets the required criteria
 * @param title The podcast title to validate
 * @returns True if the title is valid, false otherwise
 */
export const isValidPodcastTitle = (title: string): boolean => {
  // Check if the title is not empty
  if (!title.trim()) return false;

  // Ensure the title length is within the allowed range (e.g., 1 to 100 characters)
  return title.length >= 1 && title.length <= 100;
};

/**
 * Checks if the given episode duration is within acceptable limits
 * @param durationInSeconds The episode duration in seconds
 * @returns True if the duration is valid, false otherwise
 */
export const isValidEpisodeDuration = (durationInSeconds: number): boolean => {
  // Check if the duration is a positive number
  if (durationInSeconds <= 0) return false;

  // Ensure the duration is within acceptable limits (e.g., between 1 minute and 4 hours)
  const minDuration = 60; // 1 minute
  const maxDuration = 14400; // 4 hours

  return durationInSeconds >= minDuration && durationInSeconds <= maxDuration;
};

/**
 * Validates if the given marketing content meets the platform-specific requirements
 * @param content The marketing content to validate
 * @param platform The social media platform for which the content is intended
 * @returns True if the content is valid for the specified platform, false otherwise
 */
export const isValidMarketingContent = (content: any, platform: string): boolean => {
  // Check if the content object has the required fields for the specified platform
  if (!content || typeof content !== 'object') return false;

  switch (platform.toLowerCase()) {
    case 'twitter':
      return isValidTwitterContent(content);
    case 'facebook':
      return isValidFacebookContent(content);
    case 'linkedin':
      return isValidLinkedInContent(content);
    case 'instagram':
      return isValidInstagramContent(content);
    default:
      return false;
  }
};

/**
 * Validates Twitter-specific content
 * @param content The Twitter content to validate
 * @returns True if the content is valid for Twitter, false otherwise
 */
const isValidTwitterContent = (content: any): boolean => {
  if (!content.text || typeof content.text !== 'string') return false;
  return content.text.length <= 280; // Twitter's character limit
};

/**
 * Validates Facebook-specific content
 * @param content The Facebook content to validate
 * @returns True if the content is valid for Facebook, false otherwise
 */
const isValidFacebookContent = (content: any): boolean => {
  if (!content.text || typeof content.text !== 'string') return false;
  return content.text.length <= 63206; // Facebook's character limit
};

/**
 * Validates LinkedIn-specific content
 * @param content The LinkedIn content to validate
 * @returns True if the content is valid for LinkedIn, false otherwise
 */
const isValidLinkedInContent = (content: any): boolean => {
  if (!content.text || typeof content.text !== 'string') return false;
  return content.text.length <= 3000; // LinkedIn's character limit for posts
};

/**
 * Validates Instagram-specific content
 * @param content The Instagram content to validate
 * @returns True if the content is valid for Instagram, false otherwise
 */
const isValidInstagramContent = (content: any): boolean => {
  if (!content.text || typeof content.text !== 'string') return false;
  if (!content.image || typeof content.image !== 'string') return false;
  return content.text.length <= 2200; // Instagram's caption character limit
};

// Human tasks:
// TODO: Review and adjust the validation criteria for each function based on specific business requirements
// TODO: Add any additional validation functions that may be needed for other data types or user inputs
// TODO: Consider implementing more complex validation logic for marketing content based on AI-generated suggestions