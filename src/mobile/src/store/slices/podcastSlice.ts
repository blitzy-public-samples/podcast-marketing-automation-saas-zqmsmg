import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types based on the JSON specification
interface Podcast {
  id: string;
  title: string;
  description: string;
  // Add other relevant fields
}

interface PodcastListItem {
  id: string;
  title: string;
  // Add other relevant fields for list view
}

interface PodcastCreateInput {
  title: string;
  description: string;
  // Add other relevant fields for creation
}

interface PodcastUpdateInput {
  id: string;
  title?: string;
  description?: string;
  // Add other relevant fields for update
}

interface PodcastState {
  podcasts: PodcastListItem[];
  currentPodcast: Podcast | null;
  loading: boolean;
  error: string | null;
}

const initialState: PodcastState = {
  podcasts: [],
  currentPodcast: null,
  loading: false,
  error: null,
};

const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    setPodcasts: (state, action: PayloadAction<PodcastListItem[]>) => {
      state.podcasts = action.payload;
    },
    setCurrentPodcast: (state, action: PayloadAction<Podcast>) => {
      state.currentPodcast = action.payload;
    },
    addPodcast: (state, action: PayloadAction<Podcast>) => {
      state.podcasts.push(action.payload);
    },
    updatePodcast: (state, action: PayloadAction<Podcast>) => {
      const index = state.podcasts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.podcasts[index] = action.payload;
      }
      if (state.currentPodcast && state.currentPodcast.id === action.payload.id) {
        state.currentPodcast = action.payload;
      }
    },
    deletePodcast: (state, action: PayloadAction<string>) => {
      state.podcasts = state.podcasts.filter(p => p.id !== action.payload);
      if (state.currentPodcast && state.currentPodcast.id === action.payload) {
        state.currentPodcast = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPodcasts,
  setCurrentPodcast,
  addPodcast,
  updatePodcast,
  deletePodcast,
  setLoading,
  setError,
} = podcastSlice.actions;

export const podcastReducer = podcastSlice.reducer;

// Async thunks for API calls will be implemented here

// Selectors
export const selectPodcasts = (state: { podcast: PodcastState }) => state.podcast.podcasts;
export const selectCurrentPodcast = (state: { podcast: PodcastState }) => state.podcast.currentPodcast;
export const selectPodcastLoading = (state: { podcast: PodcastState }) => state.podcast.loading;
export const selectPodcastError = (state: { podcast: PodcastState }) => state.podcast.error;

// Export the actions and reducer
export const podcastActions = podcastSlice.actions;
export { podcastSlice };

// Commented list of human tasks
/*
Human tasks:
1. Implement async thunks for API calls (e.g., fetchPodcasts, createPodcast, updatePodcast, deletePodcast) [Required]
2. Add selectors for efficient state access [Required]
3. Consider adding additional actions or state properties specific to mobile app requirements [Optional]
4. Implement error handling and loading state management in async thunks [Required]
*/