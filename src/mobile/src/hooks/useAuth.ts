import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as authService from '../services/auth';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
}

interface AuthMethods {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  resetPassword: (email: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const useAuth = (): AuthState & AuthMethods => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const authState = useSelector((state: any) => state.auth);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await authService.login(email, password);
      setUser(user);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      // TODO: Implement error handling
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const register = useCallback(async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const user = await authService.register(email, password, username);
      setUser(user);
      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      // TODO: Implement error handling
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      dispatch({ type: 'CLEAR_USER' });
    } catch (error) {
      // TODO: Implement error handling
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const getCurrentUser = useCallback(async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      dispatch({ type: 'SET_USER', payload: currentUser });
      return currentUser;
    } catch (error) {
      // TODO: Implement error handling
      console.error('Get current user error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setLoading(true);
      await authService.resetPassword(email);
      // TODO: Implement user feedback for successful password reset
    } catch (error) {
      // TODO: Implement error handling
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      await authService.changePassword(oldPassword, newPassword);
      // TODO: Implement user feedback for successful password change
    } catch (error) {
      // TODO: Implement error handling
      console.error('Change password error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return {
    user,
    loading,
    login,
    register,
    logout,
    getCurrentUser,
    resetPassword,
    changePassword,
  };
};

// TODO: Implement error handling and user feedback for authentication operations
// TODO: Add support for persisting authentication state across app restarts
// TODO: Implement token refresh logic to handle expired tokens
// TODO: Add support for biometric authentication if applicable