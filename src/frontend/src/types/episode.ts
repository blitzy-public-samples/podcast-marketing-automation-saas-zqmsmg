import { Podcast } from './podcast';

/**
 * Enum representing the status of an episode
 */
export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED'
}

/**
 * Interface representing a podcast episode in the system
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
 * Interface for creating a new episode
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
 * Interface for updating an existing episode
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
 * Interface for filtering episodes
 */
export interface EpisodeFilters {
  podcastId?: string;
  status?: EpisodeStatus;
  publishedAfter?: Date;
  publishedBefore?: Date;
}

// Export all types
export type { Episode, EpisodeCreateInput, EpisodeUpdateInput, EpisodeFilters };