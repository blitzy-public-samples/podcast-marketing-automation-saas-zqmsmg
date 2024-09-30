import axios, { AxiosInstance } from 'axios';
import {
  ApiResponse,
  AuthResponse,
  PodcastResponse,
  PodcastListResponse,
  EpisodeResponse,
  EpisodeListResponse,
  TranscriptResponse,
  MarketingContentResponse,
  MarketingContentListResponse,
  SocialMediaPostResponse,
  SocialMediaPostListResponse,
  AnalyticsResponse
} from '../interfaces/apiResponses';
import {
  Podcast,
  Episode,
  Transcript,
  MarketingContent,
  SocialMediaPost,
  Analytics
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

class ApiService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle global error responses (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
          // Redirect to login or refresh token
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.axios.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.axios.post<AuthResponse>('/auth/register', { email, password, name });
    return response.data;
  }

  async getPodcasts(page: number, pageSize: number): Promise<PodcastListResponse> {
    const response = await this.axios.get<PodcastListResponse>('/podcasts', {
      params: { page, pageSize },
    });
    return response.data;
  }

  async createPodcast(podcastData: Partial<Podcast>): Promise<PodcastResponse> {
    const response = await this.axios.post<PodcastResponse>('/podcasts', podcastData);
    return response.data;
  }

  async getEpisodes(podcastId: string, page: number, pageSize: number): Promise<EpisodeListResponse> {
    const response = await this.axios.get<EpisodeListResponse>(`/podcasts/${podcastId}/episodes`, {
      params: { page, pageSize },
    });
    return response.data;
  }

  async createEpisode(podcastId: string, episodeData: Partial<Episode>): Promise<EpisodeResponse> {
    const response = await this.axios.post<EpisodeResponse>(`/podcasts/${podcastId}/episodes`, episodeData);
    return response.data;
  }

  async getTranscript(episodeId: string): Promise<TranscriptResponse> {
    const response = await this.axios.get<TranscriptResponse>(`/episodes/${episodeId}/transcript`);
    return response.data;
  }

  async generateMarketingContent(episodeId: string): Promise<MarketingContentResponse> {
    const response = await this.axios.post<MarketingContentResponse>(`/episodes/${episodeId}/marketing-content`);
    return response.data;
  }

  async scheduleSocialMediaPost(postData: Partial<SocialMediaPost>): Promise<SocialMediaPostResponse> {
    const response = await this.axios.post<SocialMediaPostResponse>('/social-media/schedule', postData);
    return response.data;
  }

  async getAnalytics(podcastId: string, episodeId: string | null, startDate: string, endDate: string): Promise<AnalyticsResponse> {
    const response = await this.axios.get<AnalyticsResponse>('/analytics', {
      params: { podcastId, episodeId, startDate, endDate },
    });
    return response.data;
  }
}

export default new ApiService();
```

This implementation of the `ApiService` class provides methods for interacting with the backend API as specified in the JSON representation. Here are some key points about this implementation:

1. We've imported the necessary types and interfaces from `../interfaces/apiResponses` and `../types`. These files need to be created separately to define the structure of the API responses and data types.

2. The `API_BASE_URL` is set using an environment variable or a default value.

3. The constructor initializes an Axios instance with the base URL and default headers.

4. Interceptors are set up to handle authentication tokens and global error responses.

5. Each method corresponds to an API endpoint and returns a Promise with the appropriate response type.

6. Error handling is implemented at a basic level. You may want to enhance this based on your specific requirements.

7. The class is exported as a singleton instance, allowing easy import and use throughout the application.

Here are the pending human tasks related to this file:

```
// TODO: Implement error handling and retry logic for API calls
// TODO: Add request cancellation support for long-running operations
// TODO: Implement request/response logging for debugging purposes
// TODO: Consider adding support for WebSocket connections for real-time updates