/**
 * This file contains TypeScript type definitions related to podcasts for the Podcast Marketing Automation SaaS platform frontend.
 */

/**
 * Represents a podcast in the system
 */
export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

/**
 * Input type for creating a new podcast
 */
export interface PodcastCreateInput {
  title: string;
  description: string;
  coverImageUrl: string;
}

/**
 * Input type for updating an existing podcast
 */
export interface PodcastUpdateInput {
  title?: string;
  description?: string;
  coverImageUrl?: string;
}

/**
 * Filters for querying podcasts
 */
export interface PodcastFilters {
  userId?: string;
  title?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

/**
 * Human tasks:
 * TODO: Review and validate the podcast types to ensure they match the backend API and database schema
 * TODO (Optional): Consider adding more specific types or enums for podcast categories or genres if applicable
 */