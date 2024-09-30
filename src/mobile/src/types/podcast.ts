/**
 * TypeScript type definitions for podcast-related data structures used in the mobile application
 * of the Podcast Marketing Automation SaaS platform
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
 * Represents a podcast item in a list view
 */
export interface PodcastListItem {
  id: string;
  title: string;
  coverImageUrl: string;
}

// Human tasks:
// TODO: Review and validate the podcast type definitions
// TODO: Consider adding additional podcast-related types if needed for the mobile app