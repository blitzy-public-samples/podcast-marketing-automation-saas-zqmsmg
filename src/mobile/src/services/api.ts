import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, TIMEOUT_DURATION } from '../config/constants';

// Global API instance
let api: AxiosInstance;

/**
 * Creates and configures an Axios instance for API calls
 * @returns {AxiosInstance} Configured Axios instance
 */
export const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: TIMEOUT_DURATION,
  });

  // Request interceptor for authentication
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      // Handle global error responses here
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Sets the authentication token for API requests
 * @param {string} token - The authentication token
 */
export const setAuthToken = (token: string): void => {
  if (api) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

/**
 * Clears the authentication token from API requests
 */
export const clearAuthToken = (): void => {
  if (api) {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Performs a GET request to the API
 * @param {string} url - The endpoint URL
 * @param {object} params - The query parameters
 * @returns {Promise<any>} Promise resolving to the API response data
 */
export const get = async (url: string, params?: object): Promise<any> => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

/**
 * Performs a POST request to the API
 * @param {string} url - The endpoint URL
 * @param {object} data - The request payload
 * @returns {Promise<any>} Promise resolving to the API response data
 */
export const post = async (url: string, data: object): Promise<any> => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

/**
 * Performs a PUT request to the API
 * @param {string} url - The endpoint URL
 * @param {object} data - The request payload
 * @returns {Promise<any>} Promise resolving to the API response data
 */
export const put = async (url: string, data: object): Promise<any> => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

/**
 * Performs a DELETE request to the API
 * @param {string} url - The endpoint URL
 * @returns {Promise<any>} Promise resolving to the API response data
 */
export const del = async (url: string): Promise<any> => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};

// Initialize the API instance
api = createApiInstance();

// Export the api instance for use in other parts of the application
export default api;

// Human tasks:
// TODO: Implement proper error handling and logging for API requests
// TODO: Add retry logic for failed requests
// TODO: Implement request caching strategy
// TODO: Add support for multipart form data for file uploads