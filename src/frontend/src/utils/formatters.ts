import { format, formatDuration } from 'date-fns';
import { Episode, Podcast } from '../types';

// TODO: Import DATE_FORMAT and TIME_FORMAT from '../config/constants' when available

// Placeholder constants (replace with actual imports when available)
const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm:ss';

/**
 * Formats a date string or Date object to the application's standard date format
 * @param date - The date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date');
  }
  return format(dateObj, DATE_FORMAT);
};

/**
 * Formats a time string or Date object to the application's standard time format
 * @param time - The time to format
 * @returns Formatted time string
 */
export const formatTime = (time: Date | string): string => {
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  if (isNaN(timeObj.getTime())) {
    throw new Error('Invalid time');
  }
  return format(timeObj, TIME_FORMAT);
};

/**
 * Formats a duration in seconds to a human-readable string (e.g., '1h 30m')
 * @param seconds - The duration in seconds
 * @returns Formatted duration string
 */
export const formatDurationFromSeconds = (seconds: number): string => {
  const duration = formatDuration({
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60
  });

  return duration
    .replace(/(\d+) seconds?/, '$1s')
    .replace(/(\d+) minutes?/, '$1m')
    .replace(/(\d+) hours?/, '$1h')
    .trim();
};

/**
 * Formats a file size in bytes to a human-readable string (e.g., '1.5 MB')
 * @param bytes - The file size in bytes
 * @returns Formatted file size string
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

/**
 * Truncates text to a specified length and adds an ellipsis if necessary
 * @param text - The text to truncate
 * @param maxLength - The maximum length of the truncated text
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 3)}...`;
};

/**
 * Formats an episode title with its number (e.g., 'Ep. 1: Title')
 * @param episode - The Episode object
 * @returns Formatted episode title
 */
export const formatEpisodeTitle = (episode: Episode): string => {
  return `Ep. ${episode.number}: ${episode.title}`;
};

/**
 * Formats podcast information for display (e.g., 'Title - Host')
 * @param podcast - The Podcast object
 * @returns Formatted podcast information
 */
export const formatPodcastInfo = (podcast: Podcast): string => {
  return `${podcast.title} - ${podcast.host}`;
};

// Human tasks (commented as requested)
/*
Human tasks:
1. [Required] Confirm the exact date and time format requirements with the design team
2. [Optional] Verify the file size formatting preferences (binary vs. decimal units)
3. [Required] Review and approve the episode title and podcast info formatting patterns
*/