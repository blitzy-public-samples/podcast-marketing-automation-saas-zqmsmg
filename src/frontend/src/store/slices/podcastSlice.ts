import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';

// Define types
export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PodcastCreateInput {
  title: string;
  description: string;
  coverImageUrl: string;
}

export interface PodcastUpdateInput {
  title?: string;
  description?: string;
  coverImageUrl?: string;
}

export interface PodcastFilters {
  search?: string;
  sortBy?: 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

interface PodcastState {
  podcasts: Podcast[];
  loading: boolean;
  error: string | null;
}

const initialState: PodcastState = {
  podcasts: [],
  loading: false,
  error: null,
};

const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    fetchPodcastsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPodcastsSuccess(state, action: PayloadAction<Podcast[]>) {
      state.podcasts = action.payload;
      state.loading = false;
    },
    fetchPodcastsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createPodcastStart(state) {
      state.loading = true;
      state.error = null;
    },
    createPodcastSuccess(state, action: PayloadAction<Podcast>) {
      state.podcasts.push(action.payload);
      state.loading = false;
    },
    createPodcastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePodcastStart(state) {
      state.loading = true;
      state.error = null;
    },
    updatePodcastSuccess(state, action: PayloadAction<Podcast>) {
      const index = state.podcasts.findIndex(podcast => podcast.id === action.payload.id);
      if (index !== -1) {
        state.podcasts[index] = action.payload;
      }
      state.loading = false;
    },
    updatePodcastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deletePodcastStart(state) {
      state.loading = true;
      state.error = null;
    },
    deletePodcastSuccess(state, action: PayloadAction<string>) {
      state.podcasts = state.podcasts.filter(podcast => podcast.id !== action.payload);
      state.loading = false;
    },
    deletePodcastFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPodcastsStart,
  fetchPodcastsSuccess,
  fetchPodcastsFailure,
  createPodcastStart,
  createPodcastSuccess,
  createPodcastFailure,
  updatePodcastStart,
  updatePodcastSuccess,
  updatePodcastFailure,
  deletePodcastStart,
  deletePodcastSuccess,
  deletePodcastFailure,
} = podcastSlice.actions;

// Thunk actions
export const fetchPodcasts = (
  filters: PodcastFilters
): ThunkAction<void, RootState, unknown, PayloadAction<Podcast[] | string>> => async dispatch => {
  try {
    dispatch(fetchPodcastsStart());
    // TODO: Implement API call to fetch podcasts with filters
    const podcasts: Podcast[] = []; // Replace with actual API call
    dispatch(fetchPodcastsSuccess(podcasts));
  } catch (error) {
    dispatch(fetchPodcastsFailure(error.message));
  }
};

export const createPodcast = (
  podcastData: PodcastCreateInput
): ThunkAction<void, RootState, unknown, PayloadAction<Podcast | string>> => async dispatch => {
  try {
    dispatch(createPodcastStart());
    // TODO: Implement API call to create a new podcast
    const createdPodcast: Podcast = {} as Podcast; // Replace with actual API call
    dispatch(createPodcastSuccess(createdPodcast));
  } catch (error) {
    dispatch(createPodcastFailure(error.message));
  }
};

export const updatePodcast = (
  podcastId: string,
  podcastData: PodcastUpdateInput
): ThunkAction<void, RootState, unknown, PayloadAction<Podcast | string>> => async dispatch => {
  try {
    dispatch(updatePodcastStart());
    // TODO: Implement API call to update the podcast
    const updatedPodcast: Podcast = {} as Podcast; // Replace with actual API call
    dispatch(updatePodcastSuccess(updatedPodcast));
  } catch (error) {
    dispatch(updatePodcastFailure(error.message));
  }
};

export const deletePodcast = (
  podcastId: string
): ThunkAction<void, RootState, unknown, PayloadAction<string>> => async dispatch => {
  try {
    dispatch(deletePodcastStart());
    // TODO: Implement API call to delete the podcast
    await Promise.resolve(); // Replace with actual API call
    dispatch(deletePodcastSuccess(podcastId));
  } catch (error) {
    dispatch(deletePodcastFailure(error.message));
  }
};

export default podcastSlice.reducer;

// TODO: Implement error handling and retry logic for API calls in thunk actions
// TODO: Add unit tests for reducers and thunk actions
// TODO: Consider implementing pagination for fetchPodcasts action if dealing with large datasets
// TODO: Review and optimize state structure for performance if needed