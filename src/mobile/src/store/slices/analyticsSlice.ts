import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MobileOverallAnalytics, MobileAnalyticsDataPoint, MobileSessionAnalytics, MobileUserAnalytics } from '../../types/analytics';

// Define the state interface
interface AnalyticsState {
  mobileAnalytics: MobileOverallAnalytics | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: AnalyticsState = {
  mobileAnalytics: null,
  loading: false,
  error: null,
};

// Create an async thunk for fetching mobile analytics
export const fetchMobileAnalytics = createAsyncThunk<
  MobileOverallAnalytics,
  { startDate: Date; endDate: Date }
>(
  'analytics/fetchMobileAnalytics',
  async ({ startDate, endDate }) => {
    // TODO: Implement the API call to fetch mobile analytics data
    // This is a placeholder implementation
    const response = await fetch(`/api/mobile-analytics?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch mobile analytics');
    }
    const data = await response.json();
    return data as MobileOverallAnalytics;
  }
);

// Create the analytics slice
const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setMobileAnalytics: (state, action: PayloadAction<MobileOverallAnalytics>) => {
      state.mobileAnalytics = action.payload;
    },
    updateMobileAnalyticsDataPoint: (state, action: PayloadAction<MobileAnalyticsDataPoint>) => {
      if (state.mobileAnalytics) {
        // Assuming MobileOverallAnalytics has a property 'dataPoints'
        // TODO: Update this logic based on the actual structure of MobileOverallAnalytics
        state.mobileAnalytics.dataPoints = state.mobileAnalytics.dataPoints.map(dp =>
          dp.id === action.payload.id ? action.payload : dp
        );
      }
    },
    addMobileSessionAnalytics: (state, action: PayloadAction<MobileSessionAnalytics>) => {
      if (state.mobileAnalytics) {
        // Assuming MobileOverallAnalytics has a property 'sessions'
        // TODO: Update this logic based on the actual structure of MobileOverallAnalytics
        state.mobileAnalytics.sessions.push(action.payload);
      }
    },
    updateMobileUserAnalytics: (state, action: PayloadAction<MobileUserAnalytics>) => {
      if (state.mobileAnalytics) {
        // Assuming MobileOverallAnalytics has a property 'userAnalytics'
        // TODO: Update this logic based on the actual structure of MobileOverallAnalytics
        state.mobileAnalytics.userAnalytics = state.mobileAnalytics.userAnalytics.map(ua =>
          ua.userId === action.payload.userId ? action.payload : ua
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobileAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobileAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.mobileAnalytics = action.payload;
      })
      .addCase(fetchMobileAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while fetching mobile analytics';
      });
  },
});

// Export actions
export const {
  setMobileAnalytics,
  updateMobileAnalyticsDataPoint,
  addMobileSessionAnalytics,
  updateMobileUserAnalytics,
} = analyticsSlice.actions;

// Export the reducer
export default analyticsSlice.reducer;

// TODO: Implement selector functions for accessing analytics state
// export const selectMobileAnalytics = (state: RootState) => state.analytics.mobileAnalytics;
// export const selectAnalyticsLoading = (state: RootState) => state.analytics.loading;
// export const selectAnalyticsError = (state: RootState) => state.analytics.error;