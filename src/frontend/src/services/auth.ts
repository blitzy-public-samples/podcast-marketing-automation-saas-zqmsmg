import { api, handleApiError } from './api';
import { AUTH_TOKEN_KEY } from '../config/constants';
import { User } from '../types';

/**
 * Authenticates a user and stores the auth token
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to the authenticated user object
 */
export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return user;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Registers a new user
 * @param email User's email
 * @param password User's password
 * @param name User's name
 * @returns Promise resolving to the newly registered user object
 */
export const register = async (email: string, password: string, name: string): Promise<User> => {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    const { token, user } = response.data;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return user;
  } catch (error) {
    throw handleApiError(error);
  }
};

/**
 * Logs out the current user
 * @returns Promise resolving to void
 */
export const logout = async (): Promise<void> => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Error during logout:', error);
    // Even if the server request fails, we still want to remove the token
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

/**
 * Retrieves the current authenticated user's information
 * @returns Promise resolving to the current user object or null if not authenticated
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      return null;
    }
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};

/**
 * Checks if the user is currently authenticated
 * @returns boolean indicating if the user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

// Human tasks:
// TODO: Implement token refresh mechanism to handle expired tokens
// TODO: Add password reset functionality
// TODO: Implement multi-factor authentication (Optional)