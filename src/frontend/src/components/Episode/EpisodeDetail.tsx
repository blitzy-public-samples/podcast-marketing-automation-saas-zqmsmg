import { Podcast } from './podcast';
import { Transcript } from './transcript';
import { MarketingContent } from './marketing';

export enum EpisodeStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface Episode {
  id: number;
  podcastId: number;
  podcast?: Podcast;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number; // in seconds
  status: EpisodeStatus;
  publishDate: Date;
  createdAt: Date;
  updatedAt: Date;
  transcript?: Transcript;
  marketingContent?: MarketingContent[];
}

export interface EpisodeCreateInput {
  podcastId: number;
  title: string;
  description: string;
  audioFileUrl: string;
  duration: number;
  status: EpisodeStatus;
  publishDate?: Date;
}

export interface EpisodeUpdateInput {
  title?: string;
  description?: string;
  audioFileUrl?: string;
  duration?: number;
  status?: EpisodeStatus;
  publishDate?: Date;
}

export interface EpisodeFilters {
  podcastId?: number;
  status?: EpisodeStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface EpisodeStats {
  totalListens: number;
  averageListenDuration: number;
  completionRate: number;
}

// Helper function to format episode duration
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [
    hours > 0 ? `${hours}:` : '',
    minutes.toString().padStart(2, '0'),
    ':',
    remainingSeconds.toString().padStart(2, '0')
  ].join('');
}

// Helper function to get human-readable status
export function getStatusLabel(status: EpisodeStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
}