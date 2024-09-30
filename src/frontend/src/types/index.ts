// This file serves as the main entry point for exporting all types used in the frontend
// of the Podcast Marketing Automation SaaS platform. It aggregates and re-exports types
// from various domain-specific type files.

// Re-export all types from podcast-related types
export * from './podcast';

// Re-export all types from episode-related types
export * from './episode';

// Re-export all types from marketing-related types
export * from './marketing';

// Re-export all types from analytics-related types
export * from './analytics';

// TODO: Review and ensure all necessary types are exported from this index file
// once the individual type files are created

// TODO: Consider adding any shared or utility types directly in this file
// if they are used across multiple domains

// Example of a shared type that might be useful across different modules
export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Example of a utility type that could be used in multiple places
export type UUID = string;

// Example of a common status enum that might be used across different entities
export enum Status {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// Note: As the individual type files (podcast.ts, episode.ts, etc.) are created,
// make sure to update this file to correctly re-export all necessary types.
// Remove placeholder comments and add actual type exports as they become available.