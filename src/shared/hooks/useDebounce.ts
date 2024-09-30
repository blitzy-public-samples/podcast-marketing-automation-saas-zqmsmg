import { useState, useEffect } from 'react';

/**
 * A custom React hook that provides debounce functionality to delay the execution of a function or update of a value.
 * 
 * @param value The value to be debounced
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number): T {
  // Create a state variable to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Create a timer to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Re-run the effect if value or delay changes

  // Return the debounced value
  return debouncedValue;
}

export default useDebounce;

// Human tasks:
// TODO: Consider adding unit tests for the useDebounce hook
// TODO: Review the implementation to ensure it handles edge cases (e.g., rapidly changing values)