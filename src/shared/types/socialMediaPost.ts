/**
 * This file defines the types and interfaces related to social media posts
 * in the Podcast Marketing Automation SaaS platform. It includes types for
 * different social media platforms, post statuses, and the main SocialMediaPost interface.
 */

/**
 * Enum representing supported social media platforms
 */
export enum SocialMediaPlatform {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  INSTAGRAM = 'INSTAGRAM'
}

/**
 * Enum representing the status of a social media post
 */
export enum PostStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  FAILED = 'FAILED'
}

/**
 * Interface representing a social media post
 */
export interface SocialMediaPost {
  id: string;
  marketingContentId: string;
  platform: SocialMediaPlatform;
  content: string;
  scheduledTime: Date;
  status: PostStatus;
  postUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Human tasks:
// TODO: Review and confirm the list of supported social media platforms
// TODO: Verify that the SocialMediaPost interface includes all necessary properties for integration with social media APIs
// TODO: Consider adding platform-specific properties to the SocialMediaPost interface if needed