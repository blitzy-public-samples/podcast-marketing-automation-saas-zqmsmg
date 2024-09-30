import { useState, useEffect } from 'react';

/**
 * A custom React hook for interacting with the browser's localStorage API,
 * providing a convenient way to store and retrieve data with automatic
 * serialization and deserialization.
 * 
 * @param key The key under which the value will be stored in localStorage
 * @param initialValue The initial value to use if no value is found in localStorage
 * @returns An array containing the stored value and a setter function
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Check if window is defined to ensure we're running in a browser environment
  const isBrowser = typeof window !== 'undefined';

  // Define a function to get the value from localStorage
  const getStoredValue = (): T => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  // Use useState to create a state variable for the stored value
  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Define a function to update the stored value
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Use useEffect to update localStorage when the value changes
  useEffect(() => {
    if (isBrowser) {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key && event.newValue !== JSON.stringify(storedValue)) {
          setStoredValue(JSON.parse(event.newValue || 'null'));
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key, storedValue, isBrowser]);

  return [storedValue, setValue];
}

export default useLocalStorage;

// Human tasks:
// TODO: Implement error handling for cases where localStorage is not available or throws an error
// TODO: Add unit tests for the useLocalStorage hook
// TODO: Consider adding options for custom serialization/deserialization methods