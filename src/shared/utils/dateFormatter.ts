import { format, parse, formatDistanceToNow, isFuture } from 'date-fns';

/**
 * Utility functions for formatting and manipulating dates in the Podcast Marketing Automation SaaS platform
 */

/**
 * Formats a date into a specified string format
 * @param date The date to format
 * @param formatString The desired format string
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatString: string): string {
  return format(date, formatString);
}

/**
 * Parses a date string into a Date object
 * @param dateString The date string to parse
 * @param formatString The format of the date string
 * @returns Parsed Date object
 */
export function parseDate(dateString: string, formatString: string): Date {
  return parse(dateString, formatString, new Date());
}

/**
 * Returns a human-readable relative time string (e.g., '2 days ago')
 * @param date The date to compare against the current date
 * @returns Relative time string
 */
export function getRelativeTimeString(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Checks if a given date is in the future
 * @param date The date to check
 * @returns True if the date is in the future, false otherwise
 */
export function isDateInFuture(date: Date): boolean {
  return isFuture(date);
}

// Human tasks:
// TODO: Review and approve the date formatting utility functions
// TODO: Ensure that the date-fns library is added to the project dependencies
// TODO: Consider adding more specific date formatting functions based on the podcast and episode management requirements