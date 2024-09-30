import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import reducers from slice files
import authReducer from './slices/authSlice';
import podcastReducer from './slices/podcastSlice';
import episodeReducer from './slices/episodeSlice';
import marketingReducer from './slices/marketingSlice';
import analyticsReducer from './slices/analyticsSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    podcast: podcastReducer,
    episode: episodeReducer,
    marketing: marketingReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define hooks with the correct types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store as the default export
export default store;

// Human tasks (commented)
/*
TODO: Implement proper error handling middleware
TODO (Optional): Set up Redux persist for maintaining state across page reloads if needed
TODO (Optional): Configure Redux DevTools Extension for better debugging experience
TODO (Optional): Implement performance optimizations like memoization if needed
*/