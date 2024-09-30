import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

// Define the initial state
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk for user login
export const login = createAsyncThunk<User, { email: string; password: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // TODO: Implement the actual API call for login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for user logout
export const logout = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Implement the actual API call for logout
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk<User, { email: string; password: string; name: string }>(
  'auth/register',
  async (userInfo, { rejectWithValue }) => {
    try {
      // TODO: Implement the actual API call for registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { setUser, setIsAuthenticated, setError, clearError } = authSlice.actions;
export default authSlice.reducer;

// Human tasks:
// TODO: Implement the actual API calls in the async thunks
// TODO: Set up proper error handling and error messages
// TODO: Implement token refresh logic if using JWT
// TODO: Review and approve the structure of the auth slice