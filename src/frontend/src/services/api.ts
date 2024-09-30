import axios, { AxiosInstance, AxiosError } from 'axios';

// TODO: Import these constants from the actual constants file once it's created
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
const AUTH_TOKEN_KEY = 'auth_token';

/**
 * Creates and configures an axios instance for API calls
 * @returns {AxiosInstance} Configured axios instance
 */
const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add authorization header
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO: Implement token refresh logic here
      return Promise.reject(error);
    }
  );

  return api;
};

/**
 * Handles API errors and formats them for consistent error reporting
 * @param {AxiosError} error - The error object from axios
 * @returns {object} Formatted error object
 */
export const handleApiError = (error: AxiosError): object => {
  if (axios.isAxiosError(error)) {
    const serverError = error.response?.data;
    // TODO: Add specific error codes and messages for known API errors
    return {
      message: serverError?.message || 'An unexpected error occurred',
      status: error.response?.status,
      data: serverError,
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500,
    data: null,
  };
};

// Create and export the API instance
export const api = createApiInstance();

// TODO: Implement request retry logic for network failures

/**
 * Human tasks:
 * 1. Implement token refresh logic in the request interceptor (Required)
 * 2. Add specific error codes and messages for known API errors (Required)
 * 3. Implement request retry logic for network failures (Optional)
 */