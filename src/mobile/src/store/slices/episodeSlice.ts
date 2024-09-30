import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Episode, EpisodeStatus, EpisodeCreateInput, EpisodeUpdateInput, EpisodeListItem } from '../../types/episode';

// Define the initial state
interface EpisodeState {
  episodes: EpisodeListItem[];
  currentEpisode: Episode | null;
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  episodes: [],
  currentEpisode: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchEpisodes = createAsyncThunk<EpisodeListItem[], string>(
  'episodes/fetchEpisodes',
  async (podcastId: string) => {
    // TODO: Implement API call to fetch episodes
    // This is a placeholder implementation
    const response = await fetch(`/api/podcasts/${podcastId}/episodes`);
    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }
    const data = await response.json();
    return data as EpisodeListItem[];
  }
);

export const createEpisode = createAsyncThunk<Episode, EpisodeCreateInput>(
  'episodes/createEpisode',
  async (episodeData: EpisodeCreateInput) => {
    // TODO: Implement API call to create a new episode
    // This is a placeholder implementation
    const response = await fetch('/api/episodes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) {
      throw new Error('Failed to create episode');
    }
    const data = await response.json();
    return data as Episode;
  }
);

export const updateEpisode = createAsyncThunk<Episode, { episodeId: string; episodeData: EpisodeUpdateInput }>(
  'episodes/updateEpisode',
  async ({ episodeId, episodeData }) => {
    // TODO: Implement API call to update an episode
    // This is a placeholder implementation
    const response = await fetch(`/api/episodes/${episodeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episodeData),
    });
    if (!response.ok) {
      throw new Error('Failed to update episode');
    }
    const data = await response.json();
    return data as Episode;
  }
);

export const deleteEpisode = createAsyncThunk<void, string>(
  'episodes/deleteEpisode',
  async (episodeId: string) => {
    // TODO: Implement API call to delete an episode
    // This is a placeholder implementation
    const response = await fetch(`/api/episodes/${episodeId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete episode');
    }
  }
);

// Create the episode slice
const episodeSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setCurrentEpisode: (state, action: PayloadAction<Episode>) => {
      state.currentEpisode = action.payload;
    },
    clearCurrentEpisode: (state) => {
      state.currentEpisode = null;
    },
    updateEpisodeInList: (state, action: PayloadAction<EpisodeListItem>) => {
      const index = state.episodes.findIndex(ep => ep.id === action.payload.id);
      if (index !== -1) {
        state.episodes[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch episodes';
      })
      .addCase(createEpisode.fulfilled, (state, action) => {
        state.episodes.push(action.payload as unknown as EpisodeListItem);
      })
      .addCase(updateEpisode.fulfilled, (state, action) => {
        const updatedEpisode = action.payload;
        const index = state.episodes.findIndex(ep => ep.id === updatedEpisode.id);
        if (index !== -1) {
          state.episodes[index] = updatedEpisode as unknown as EpisodeListItem;
        }
        if (state.currentEpisode && state.currentEpisode.id === updatedEpisode.id) {
          state.currentEpisode = updatedEpisode;
        }
      })
      .addCase(deleteEpisode.fulfilled, (state, action) => {
        state.episodes = state.episodes.filter(ep => ep.id !== action.meta.arg);
        if (state.currentEpisode && state.currentEpisode.id === action.meta.arg) {
          state.currentEpisode = null;
        }
      });
  },
});

export const { setCurrentEpisode, clearCurrentEpisode, updateEpisodeInList } = episodeSlice.actions;

export default episodeSlice.reducer;

// Human tasks:
// TODO: Implement error handling and retry logic for API calls in async thunks
// TODO: Add unit tests for the episodeSlice reducers and async thunks
// TODO: Consider implementing pagination for fetching episodes if the list can be large
// TODO: Review and optimize the state structure for performance in large datasets