import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import useAuth from '../../hooks/useAuth';
import { login, register, logout, getCurrentUser } from '../../services/auth';
import { setUser, clearUser } from '../../store/slices/authSlice';

// Mock the auth service functions
jest.mock('../../services/auth', () => ({
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
  getCurrentUser: jest.fn(),
}));

// Mock the Redux store
const mockStore = configureStore({
  reducer: {
    auth: (state = { user: null, loading: false }, action) => {
      switch (action.type) {
        case 'auth/setUser':
          return { ...state, user: action.payload };
        case 'auth/clearUser':
          return { ...state, user: null };
        default:
          return state;
      }
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('useAuth hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('should handle login successfully', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (login as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBeFalsy();
  });

  it('should handle login failure', async () => {
    (login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await expect(result.current.login('test@example.com', 'wrong_password')).rejects.toThrow('Invalid credentials');
    });

    expect(login).toHaveBeenCalledWith('test@example.com', 'wrong_password');
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('should handle register successfully', async () => {
    const mockUser = { id: '1', email: 'newuser@example.com' };
    (register as jest.Mock).mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register('newuser@example.com', 'password');
    });

    expect(register).toHaveBeenCalledWith('newuser@example.com', 'password');
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBeFalsy();
  });

  it('should handle register failure', async () => {
    (register as jest.Mock).mockRejectedValue(new Error('Email already exists'));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await expect(result.current.register('existing@example.com', 'password')).rejects.toThrow('Email already exists');
    });

    expect(register).toHaveBeenCalledWith('existing@example.com', 'password');
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('should handle logout', async () => {
    (logout as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Set initial logged in state
    act(() => {
      mockStore.dispatch(setUser({ id: '1', email: 'test@example.com' }));
    });

    await act(async () => {
      await result.current.logout();
    });

    expect(logout).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBeFalsy();
  });

  it('should check authentication status on mount', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });

    await waitForNextUpdate();

    expect(getCurrentUser).toHaveBeenCalled();
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBeFalsy();
  });
});

// Human tasks:
// TODO: Add tests for error handling scenarios
// TODO: Implement tests for social media authentication once it's added to the useAuth hook
// TODO: Add tests for remember me functionality when implemented