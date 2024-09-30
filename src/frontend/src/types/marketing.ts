// This file defines TypeScript types and interfaces related to marketing content
// for the Podcast Marketing Automation SaaS platform. It includes types for
// marketing content generation, social media posts, and scheduling.

// Enum representing the status of marketing content
export enum MarketingContentStatus {
  DRAFT = 'DRAFT',
  READY = 'READY',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  FAILED = 'FAILED'
}

// Enum representing supported social media platforms
export enum SocialMediaPlatform {
  TWITTER = 'TWITTER',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN'
}

// Interface representing a piece of marketing content generated for a podcast episode
export interface MarketingContent {
  id: string;
  episodeId: string;
  platform: SocialMediaPlatform;
  content: string;
  status: MarketingContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Interface representing a social media post scheduled for publication
export interface SocialMediaPost {
  id: string;
  marketingContentId: string;
  platform: SocialMediaPlatform;
  content: string;
  scheduledTime: Date;
  status: string;
  postId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Interface representing a request to generate marketing content for a podcast episode
export interface MarketingContentGenerationRequest {
  episodeId: string;
  platform: SocialMediaPlatform;
  contentType: string;
  targetAudience: string | null;
  keyPoints: string[] | null;
}

// Interface representing the response from the marketing content generation service
export interface MarketingContentGenerationResponse {
  success: boolean;
  content: MarketingContent | null;
  error: string | null;
}

// Human tasks (commented as requested):
/*
TODO: Human Tasks
- Required: Review and validate the MarketingContent and SocialMediaPost interfaces to ensure they cover all necessary fields for the application
- Required: Confirm that the SocialMediaPlatform enum includes all platforms that will be supported by the application
- Optional: Consider adding more specific types for different content types (e.g., tweet, long-form post) if needed
*/