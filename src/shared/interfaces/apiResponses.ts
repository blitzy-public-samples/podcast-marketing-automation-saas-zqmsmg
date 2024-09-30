import { Podcast, Episode, Transcript, MarketingContent, SocialMediaPost, Analytics } from "../types";

/**
 * Generic API response interface
 */
export interface ApiResponse {
  success: boolean;
  message: string;
  data: any;
}

/**
 * Authentication response interface
 */
export interface AuthResponse extends ApiResponse {
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

/**
 * Podcast response interface
 */
export interface PodcastResponse extends ApiResponse {
  data: Podcast;
}

/**
 * Podcast list response interface
 */
export interface PodcastListResponse extends ApiResponse {
  data: Podcast[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Episode response interface
 */
export interface EpisodeResponse extends ApiResponse {
  data: Episode;
}

/**
 * Episode list response interface
 */
export interface EpisodeListResponse extends ApiResponse {
  data: Episode[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Transcript response interface
 */
export interface TranscriptResponse extends ApiResponse {
  data: Transcript;
}

/**
 * Marketing content response interface
 */
export interface MarketingContentResponse extends ApiResponse {
  data: MarketingContent;
}

/**
 * Marketing content list response interface
 */
export interface MarketingContentListResponse extends ApiResponse {
  data: MarketingContent[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Social media post response interface
 */
export interface SocialMediaPostResponse extends ApiResponse {
  data: SocialMediaPost;
}

/**
 * Social media post list response interface
 */
export interface SocialMediaPostListResponse extends ApiResponse {
  data: SocialMediaPost[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Analytics response interface
 */
export interface AnalyticsResponse extends ApiResponse {
  data: Analytics;
}

// Human tasks:
// TODO: Review and ensure all necessary API response interfaces are included
// TODO: Verify that the imported types (Podcast, Episode, etc.) match the actual type definitions
// TODO: Consider adding more specific error response interfaces if needed