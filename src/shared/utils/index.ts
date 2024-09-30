// Import and re-export all utility functions from the utils directory

// Date formatting utilities
export * from './dateFormatter';

// String manipulation utilities
export * from './stringUtils';

// Validation utilities
export * from './validationUtils';

// Analytics helper functions
export * from './analyticsHelpers';

// TODO: Implement utility functions in dateFormatter.ts, stringUtils.ts, validationUtils.ts, and analyticsHelpers.ts

/**
 * This index file serves as a central point for exporting all utility functions
 * from the utils directory. It allows for easier imports in other parts of the application.
 * 
 * Example usage:
 * import { formatDate, capitalizeString, validateEmail, calculateEngagementRate } from '@/shared/utils';
 * 
 * Note: The actual utility functions need to be implemented in their respective files.
 */

// Add any shared utility functions that don't fit into the above categories here
// For example:

/**
 * Safely access nested object properties
 * @param obj The object to access
 * @param path The path to the property, separated by dots
 * @param defaultValue The default value to return if the path doesn't exist
 * @returns The value at the end of the path, or the default value
 */
export function getNestedValue(obj: any, path: string, defaultValue: any = undefined): any {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @returns A debounced version of the passed function
 */
export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(this: any, ...args: Parameters<F>) {
    const context = this;

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as F;
}

// Add more shared utility functions as needed