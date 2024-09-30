// Import the Podcast type from the podcast file
// This import might need to be adjusted based on the actual location of the Podcast type
import { Podcast } from './podcast';

/**
 * Enum representing the possible statuses of an episode
 */
export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

/**
 * Interface representing a podcast episode
 */
export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  status: EpisodeStatus;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for creating a new episode
 */
export interface CreateEpisodeInput {
  podcastId: string;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  status: EpisodeStatus;
  publishDate?: Date;
}

/**
 * Interface for updating an existing episode
 */
export interface UpdateEpisodeInput {
  title?: string;
  description?: string;
  audioFileUrl?: string;
  duration?: number;
  status?: EpisodeStatus;
  publishDate?: Date;
}

/**
 * Interface representing an episode with its associated podcast
 */
export interface EpisodeWithPodcast {
  episode: Episode;
  podcast: Podcast;
}

// Human tasks:
// TODO: Review and confirm the Episode interface properties
// TODO: Verify if additional metadata fields are needed for episodes
// TODO: Confirm if the EpisodeStatus enum covers all possible states