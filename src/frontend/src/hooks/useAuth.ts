import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout, getCurrentUser, isAuthenticated } from '../services/auth';
import { setUser, clearUser } from '../store/slices/authSlice';
import { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const useAuth = (): AuthState => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const userData = await login(email, password);
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleRegister = useCallback(async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const userData = await register(email, password, name);
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await logout();
      dispatch(clearUser());
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const isUserAuthenticated = await isAuthenticated();
      if (isUserAuthenticated) {
        const userData = await getCurrentUser();
        dispatch(setUser(userData));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      console.error('Auth check error:', error);
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    checkAuth,
  };
};

export default useAuth;

// Human tasks:
// TODO: Implement error handling and display error messages to the user
// TODO: Add support for social media authentication (e.g., Google, Facebook)
// TODO: Implement remember me functionality