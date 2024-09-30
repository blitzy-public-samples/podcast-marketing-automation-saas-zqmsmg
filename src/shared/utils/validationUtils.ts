/**
 * This file contains utility functions for validating various data types and structures
 * used throughout the Podcast Marketing Automation SaaS platform. It provides reusable
 * validation logic to ensure data integrity and consistency across the application.
 */

/**
 * Validates if the given string is a valid email address
 * @param email The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if the given password meets the required criteria
 * @param password The password to validate
 * @returns True if the password is valid, false otherwise
 */
export function isValidPassword(password: string): boolean {
  // Check if the password length is at least 12 characters
  if (password.length < 12) {
    return false;
  }

  // Verify that the password contains at least one uppercase letter, one lowercase letter,
  // one number, and one special character
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
}

/**
 * Validates if the given podcast title meets the required criteria
 * @param title The podcast title to validate
 * @returns True if the title is valid, false otherwise
 */
export function isValidPodcastTitle(title: string): boolean {
  // Check if the title length is between 3 and 100 characters
  if (title.length < 3 || title.length > 100) {
    return false;
  }

  // Verify that the title doesn't contain any prohibited characters or words
  const prohibitedChars = /[<>{}]/; // Add more prohibited characters if needed
  const prohibitedWords = ['explicit', 'offensive']; // Add more prohibited words if needed

  if (prohibitedChars.test(title)) {
    return false;
  }

  const lowerCaseTitle = title.toLowerCase();
  return !prohibitedWords.some(word => lowerCaseTitle.includes(word));
}

/**
 * Checks if the given episode duration is within acceptable limits
 * @param durationInSeconds The episode duration in seconds
 * @returns True if the duration is valid, false otherwise
 */
export function isValidEpisodeDuration(durationInSeconds: number): boolean {
  // Check if the duration is a positive number
  if (durationInSeconds <= 0) {
    return false;
  }

  // Verify that the duration is within the acceptable range (e.g., between 1 minute and 4 hours)
  const minDuration = 60; // 1 minute
  const maxDuration = 14400; // 4 hours

  return durationInSeconds >= minDuration && durationInSeconds <= maxDuration;
}

/**
 * Validates if the given platform is a supported social media platform
 * @param platform The social media platform to validate
 * @returns True if the platform is supported, false otherwise
 */
export function isValidSocialMediaPlatform(platform: string): boolean {
  const supportedPlatforms = ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'];
  return supportedPlatforms.includes(platform);
}

/**
 * Checks if the given time range for analytics is valid
 * @param startDate The start date of the time range
 * @param endDate The end date of the time range
 * @returns True if the time range is valid, false otherwise
 */
export function isValidAnalyticsTimeRange(startDate: Date, endDate: Date): boolean {
  // Check if both startDate and endDate are valid Date objects
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return false;
  }

  // Verify that the startDate is before the endDate
  if (startDate >= endDate) {
    return false;
  }

  // Ensure that the time range doesn't exceed the maximum allowed period (e.g., 1 year)
  const maxRangeInMs = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
  const actualRangeInMs = endDate.getTime() - startDate.getTime();

  return actualRangeInMs <= maxRangeInMs;
}

// TODO: Review and adjust the validation criteria for each function based on specific business requirements
// TODO: Add any additional validation functions that may be needed for the platform
// TODO: Ensure that the regular expressions used for validation are thoroughly tested and optimized