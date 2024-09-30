// This file defines the TypeScript types and interfaces related to podcasts in the Podcast Marketing Automation SaaS platform.
// It includes types for podcast metadata, creation, and management.

// Importing dependencies
import { User } from './user';
import { Episode } from './episode';

// Enum for podcast status
export enum PodcastStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived'
}

// Enum for podcast categories
export enum PodcastCategory {
  Technology = 'Technology',
  Business = 'Business',
  Entertainment = 'Entertainment',
  Education = 'Education',
  News = 'News',
  Comedy = 'Comedy',
  Other = 'Other'
}

// Interface for Podcast
export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  category: PodcastCategory;
  status: PodcastStatus;
  author: User;
  episodes: Episode[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for creating a new podcast
export interface CreatePodcastInput {
  title: string;
  description: string;
  category: PodcastCategory;
  coverImageUrl?: string;
}

// Interface for updating an existing podcast
export interface UpdatePodcastInput {
  title?: string;
  description?: string;
  category?: PodcastCategory;
  coverImageUrl?: string;
  status?: PodcastStatus;
}

// Human tasks (commented as requested)
/*
Human tasks:
1. Review and confirm the podcast categories to ensure they cover all necessary options (Required)
2. Validate that the Podcast interface includes all necessary fields for the application's requirements (Required)
3. Consider adding additional metadata fields to the Podcast interface if required (e.g., language, explicit content flag) (Optional)
*/