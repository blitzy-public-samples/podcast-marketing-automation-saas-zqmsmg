import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Import reducers
import authReducer from './slices/authSlice';
import podcastReducer from './slices/podcastSlice';
import episodeReducer from './slices/episodeSlice';
import marketingReducer from './slices/marketingSlice';
import analyticsReducer from './slices/analyticsSlice';

// Configure the store
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

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store as default
export default store;

// Human tasks (commented as requested):
/*
TODO: Review the store configuration to ensure all necessary slices are included
TODO: Determine if any additional middleware is needed for the mobile app (e.g., for logging or async operations)
TODO: Verify that the RootState interface correctly represents all slices of the store
TODO: Consider implementing a persistConfig for offline support if needed
TODO: Set up proper error handling and logging middleware for production builds
*/