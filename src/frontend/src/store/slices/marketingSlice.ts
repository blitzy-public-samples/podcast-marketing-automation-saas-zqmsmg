import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types based on the specification
interface MarketingContent {
  id: string;
  content: string;
  status: MarketingContentStatus;
  // Add other relevant fields
}

interface SocialMediaPost {
  id: string;
  content: string;
  platform: SocialMediaPlatform;
  scheduledTime: string;
  status: string;
  // Add other relevant fields
}

enum MarketingContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
}

enum SocialMediaPlatform {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
}

interface MarketingContentGenerationRequest {
  // Define the structure of the request
  podcastId: string;
  episodeId: string;
  platform: SocialMediaPlatform;
  // Add other relevant fields
}

interface MarketingContentGenerationResponse {
  content: MarketingContent;
  // Add other relevant fields
}

interface MarketingState {
  marketingContents: MarketingContent[];
  socialMediaPosts: SocialMediaPost[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketingState = {
  marketingContents: [],
  socialMediaPosts: [],
  loading: false,
  error: null,
};

// Async thunk for generating marketing content
export const generateMarketingContent = createAsyncThunk<
  MarketingContentGenerationResponse,
  MarketingContentGenerationRequest
>('marketing/generateContent', async (request) => {
  // Implement the API call to generate marketing content
  // This is a placeholder and should be replaced with actual API call
  const response = await fetch('/api/marketing/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Failed to generate marketing content');
  }
  return response.json();
});

// Async thunk for scheduling a social media post
export const schedulePost = createAsyncThunk<SocialMediaPost, SocialMediaPost>(
  'marketing/schedulePost',
  async (post) => {
    // Implement the API call to schedule the social media post
    // This is a placeholder and should be replaced with actual API call
    const response = await fetch('/api/marketing/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to schedule social media post');
    }
    return response.json();
  }
);

const marketingSlice = createSlice({
  name: 'marketing',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateMarketingContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMarketingContent.fulfilled, (state, action) => {
        state.loading = false;
        state.marketingContents.push(action.payload.content);
      })
      .addCase(generateMarketingContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to generate marketing content';
      })
      .addCase(schedulePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(schedulePost.fulfilled, (state, action) => {
        state.loading = false;
        state.socialMediaPosts.push(action.payload);
      })
      .addCase(schedulePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to schedule social media post';
      });
  },
});

export const marketingReducer = marketingSlice.reducer;
export const marketingActions = marketingSlice.actions;

// Selectors
export const selectMarketingContents = (state: { marketing: MarketingState }) => state.marketing.marketingContents;
export const selectSocialMediaPosts = (state: { marketing: MarketingState }) => state.marketing.socialMediaPosts;
export const selectMarketingLoading = (state: { marketing: MarketingState }) => state.marketing.loading;
export const selectMarketingError = (state: { marketing: MarketingState }) => state.marketing.error;