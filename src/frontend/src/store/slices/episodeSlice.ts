import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import {
  getEpisodes,
  getEpisodeById,
  createEpisode,
  updateEpisode,
  deleteEpisode,
  uploadEpisodeAudio,
  generateTranscript,
} from '../../services/episode';

// Define types based on the JSON specification
export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  status: EpisodeStatus;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
}

export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface EpisodeCreateInput {
  title: string;
  description: string;
  podcastId: string;
}

export interface EpisodeUpdateInput {
  title?: string;
  description?: string;
  status?: EpisodeStatus;
}

export interface EpisodeFilters {
  status?: EpisodeStatus;
  startDate?: string;
  endDate?: string;
}

interface EpisodeState {
  episodes: Episode[];
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

export const fetchEpisodes = createAsyncThunk(
  'episodes/fetchEpisodes',
  async ({ podcastId, filters }: { podcastId: string; filters?: EpisodeFilters }) => {
    const response = await getEpisodes(podcastId, filters);
    return response;
  }
);

export const fetchEpisodeById = createAsyncThunk(
  'episodes/fetchEpisodeById',
  async (episodeId: string) => {
    const response = await getEpisodeById(episodeId);
    return response;
  }
);

export const createNewEpisode = createAsyncThunk(
  'episodes/createNewEpisode',
  async ({ podcastId, episodeData }: { podcastId: string; episodeData: EpisodeCreateInput }) => {
    const response = await createEpisode(podcastId, episodeData);
    return response;
  }
);

export const updateExistingEpisode = createAsyncThunk(
  'episodes/updateExistingEpisode',
  async ({ episodeId, episodeData }: { episodeId: string; episodeData: EpisodeUpdateInput }) => {
    const response = await updateEpisode(episodeId, episodeData);
    return response;
  }
);

export const deleteExistingEpisode = createAsyncThunk(
  'episodes/deleteExistingEpisode',
  async (episodeId: string) => {
    await deleteEpisode(episodeId);
    return episodeId;
  }
);

export const uploadAudioForEpisode = createAsyncThunk(
  'episodes/uploadAudioForEpisode',
  async ({ episodeId, audioFile }: { episodeId: string; audioFile: File }) => {
    const response = await uploadEpisodeAudio(episodeId, audioFile);
    return response;
  }
);

export const generateTranscriptForEpisode = createAsyncThunk(
  'episodes/generateTranscriptForEpisode',
  async (episodeId: string) => {
    const response = await generateTranscript(episodeId);
    return response;
  }
);

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
      .addCase(fetchEpisodeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEpisode = action.payload;
      })
      .addCase(fetchEpisodeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch episode';
      })
      .addCase(createNewEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes.push(action.payload);
      })
      .addCase(createNewEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create episode';
      })
      .addCase(updateExistingEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingEpisode.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.episodes.findIndex((episode) => episode.id === action.payload.id);
        if (index !== -1) {
          state.episodes[index] = action.payload;
        }
        if (state.currentEpisode && state.currentEpisode.id === action.payload.id) {
          state.currentEpisode = action.payload;
        }
      })
      .addCase(updateExistingEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update episode';
      })
      .addCase(deleteExistingEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExistingEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = state.episodes.filter((episode) => episode.id !== action.payload);
        if (state.currentEpisode && state.currentEpisode.id === action.payload) {
          state.currentEpisode = null;
        }
      })
      .addCase(deleteExistingEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete episode';
      })
      .addCase(uploadAudioForEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAudioForEpisode.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentEpisode) {
          state.currentEpisode.audioUrl = action.payload.audioUrl;
        }
      })
      .addCase(uploadAudioForEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload audio';
      })
      .addCase(generateTranscriptForEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateTranscriptForEpisode.fulfilled, (state, action) => {
        state.loading = false;
        // Handle transcript generation success (e.g., update episode with transcript ID)
      })
      .addCase(generateTranscriptForEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to generate transcript';
      });
  },
});

export const { setCurrentEpisode, clearCurrentEpisode } = episodeSlice.actions;

export const selectEpisodes = (state: RootState) => state.episodes.episodes;
export const selectCurrentEpisode = (state: RootState) => state.episodes.currentEpisode;
export const selectEpisodeLoading = (state: RootState) => state.episodes.loading;
export const selectEpisodeError = (state: RootState) => state.episodes.error;

export default episodeSlice.reducer;

// Human tasks:
// TODO: Implement optimistic updates for episode creation and deletion to improve user experience
// TODO: Add error handling and retry logic for failed API requests in async thunks
// TODO: Implement caching strategy for episodes to reduce unnecessary API calls