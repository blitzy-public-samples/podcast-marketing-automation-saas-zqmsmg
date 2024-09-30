/**
 * TypeScript type definitions for episode-related data structures used in the mobile application
 * of the Podcast Marketing Automation SaaS platform
 */

/**
 * Represents the status of an episode
 */
export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED'
}

/**
 * Represents a podcast episode in the system
 */
export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  publishDate: Date;
  status: EpisodeStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Input type for creating a new episode
 */
export interface EpisodeCreateInput {
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  publishDate?: Date;
}

/**
 * Input type for updating an existing episode
 */
export interface EpisodeUpdateInput {
  title?: string;
  description?: string;
  audioFileUrl?: string;
  duration?: number;
  publishDate?: Date;
  status?: EpisodeStatus;
}

/**
 * Represents an episode item in a list view
 */
export interface EpisodeListItem {
  id: string;
  title: string;
  publishDate: Date;
  duration: number;
  status: EpisodeStatus;
}

/**
 * Human tasks:
 * - Review and validate the episode type definitions (Required)
 * - Consider adding additional episode-related types if needed for the mobile app (Optional)
 * - Ensure that the EpisodeStatus enum values align with the backend implementation (Required)
 */