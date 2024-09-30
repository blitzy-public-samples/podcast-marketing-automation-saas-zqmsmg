import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// TODO: Import these types from '../../types/analytics' once they are defined
type AnalyticsData = any;
type SocialMediaMetrics = any;
type AnalyticsFilter = any;
type AnalyticsChartData = {
  labels: string[];
  datasets: any[];
};

interface AnalyticsState {
  analyticsData: AnalyticsData[];
  socialMediaMetrics: SocialMediaMetrics[];
  chartData: AnalyticsChartData;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  analyticsData: [],
  socialMediaMetrics: [],
  chartData: { labels: [], datasets: [] },
  loading: false,
  error: null,
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchAnalyticsData',
  async (filter: AnalyticsFilter) => {
    // TODO: Implement API call to fetch analytics data
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    return response.json() as Promise<AnalyticsData[]>;
  }
);

export const fetchSocialMediaMetrics = createAsyncThunk(
  'analytics/fetchSocialMediaMetrics',
  async (filter: AnalyticsFilter) => {
    // TODO: Implement API call to fetch social media metrics
    const response = await fetch('/api/social-media-metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filter),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch social media metrics');
    }
    return response.json() as Promise<SocialMediaMetrics[]>;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action: PayloadAction<AnalyticsData[]>) => {
      state.analyticsData = action.payload;
    },
    setSocialMediaMetrics: (state, action: PayloadAction<SocialMediaMetrics[]>) => {
      state.socialMediaMetrics = action.payload;
    },
    setChartData: (state, action: PayloadAction<AnalyticsChartData>) => {
      state.chartData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.analyticsData = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics data';
      })
      .addCase(fetchSocialMediaMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSocialMediaMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.socialMediaMetrics = action.payload;
      })
      .addCase(fetchSocialMediaMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch social media metrics';
      });
  },
});

export const {
  setAnalyticsData,
  setSocialMediaMetrics,
  setChartData,
  setLoading,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;

// TODO: Implement error handling and retry logic for failed API requests in the async thunks
// TODO: Add unit tests for the analyticsSlice reducers and async thunks
// TODO: Consider implementing data caching to improve performance and reduce API calls