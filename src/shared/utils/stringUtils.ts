/**
 * Utility functions for string manipulation and formatting in the Podcast Marketing Automation SaaS platform
 */

/**
 * Capitalizes the first letter of a given string
 * @param input The input string to capitalize
 * @returns The input string with its first letter capitalized
 */
export function capitalizeFirstLetter(input: string): string {
  if (!input || input.length === 0) {
    return input;
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Truncates a string to a specified length and adds an ellipsis if truncated
 * @param input The input string to truncate
 * @param maxLength The maximum length of the truncated string
 * @returns The truncated string with an ellipsis if necessary
 */
export function truncateString(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength - 3) + '...';
}

/**
 * Converts a string into a URL-friendly slug
 * @param input The input string to convert to a slug
 * @returns A URL-friendly slug version of the input string
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Removes HTML tags from a given string
 * @param input The input string containing HTML tags
 * @returns The input string with all HTML tags removed
 */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '');
}

/**
 * Generates a random string of specified length
 * @param length The length of the random string to generate
 * @returns A random string of the specified length
 */
export function generateRandomString(length: number): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

/**
 * Human tasks:
 * - Review and approve the implemented string utility functions
 * - Add unit tests for each string utility function
 * - Consider adding more string utility functions as needed for the project
 */