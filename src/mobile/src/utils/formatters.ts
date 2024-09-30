/**
 * Utility functions for formatting data used in the mobile application of the Podcast Marketing Automation SaaS platform
 */

/**
 * Formats a date string or Date object into a user-friendly string
 * @param date - The date to format (string or Date object)
 * @param format - The desired format string (optional)
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, format: string = 'YYYY-MM-DD'): string {
  // Check if the input is a valid date
  const validDate = date instanceof Date ? date : new Date(date);
  if (isNaN(validDate.getTime())) {
    throw new Error('Invalid date input');
  }

  // Apply the specified format or use the default format
  // This is a simple implementation. For more complex formatting,
  // consider using a library like date-fns or moment.js
  const year = validDate.getFullYear();
  const month = String(validDate.getMonth() + 1).padStart(2, '0');
  const day = String(validDate.getDate()).padStart(2, '0');

  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Formats a duration in seconds into a human-readable string (e.g., '1h 30m')
 * @param seconds - The duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds}s`);

  return parts.join(' ');
}

/**
 * Formats a file size in bytes into a human-readable string (e.g., '1.5 MB')
 * @param bytes - The file size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Formats a podcast title, truncating if necessary and adding an ellipsis
 * @param title - The podcast title
 * @param maxLength - The maximum length of the title before truncation
 * @returns Formatted podcast title
 */
export function formatPodcastTitle(title: string, maxLength: number): string {
  if (title.length <= maxLength) {
    return title;
  }
  return `${title.slice(0, maxLength - 3)}...`;
}

/**
 * Formats an analytics value with appropriate suffixes (e.g., '1.5K' for 1500)
 * @param value - The analytics value
 * @returns Formatted analytics value
 */
export function formatAnalyticsValue(value: number): string {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let formattedValue = value;
  let suffixIndex = 0;

  while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  return `${formattedValue.toFixed(1)}${suffixes[suffixIndex]}`;
}

// Human tasks:
// TODO: Review and approve the formatting functions and their implementations
// TODO: Ensure that the date formatting function supports localization
// TODO: Add unit tests for each formatting function