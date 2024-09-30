/**
 * This file defines TypeScript types and interfaces related to analytics data
 * for the Podcast Marketing Automation SaaS platform. It includes types for
 * various analytics metrics, time periods, and data structures used throughout
 * the application.
 */

/**
 * Enum representing different types of analytics metrics
 */
export enum AnalyticsMetric {
  DOWNLOADS = 'DOWNLOADS',
  LISTENS = 'LISTENS',
  LIKES = 'LIKES',
  SHARES = 'SHARES',
  COMMENTS = 'COMMENTS',
  FOLLOWERS = 'FOLLOWERS',
  ENGAGEMENT_RATE = 'ENGAGEMENT_RATE',
  RETENTION_RATE = 'RETENTION_RATE',
}

/**
 * Enum representing different time periods for analytics data
 */
export enum TimePeriod {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
  ALL_TIME = 'ALL_TIME',
}

/**
 * Interface representing a single data point in analytics
 */
export interface AnalyticsDataPoint {
  date: Date;
  metric: AnalyticsMetric;
  value: number;
}

/**
 * Interface representing analytics data for a single episode
 */
export interface EpisodeAnalytics {
  episodeId: string;
  title: string;
  publishDate: Date;
  metrics: AnalyticsDataPoint[];
}

/**
 * Interface representing analytics data for an entire podcast
 */
export interface PodcastAnalytics {
  podcastId: string;
  title: string;
  overallMetrics: AnalyticsDataPoint[];
  episodeAnalytics: EpisodeAnalytics[];
}

/**
 * Interface representing analytics data for a marketing campaign
 */
export interface MarketingCampaignAnalytics {
  campaignId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  metrics: AnalyticsDataPoint[];
  platformBreakdown: Record<string, AnalyticsDataPoint[]>;
}

/**
 * Interface representing overall analytics data for the user's account
 */
export interface OverallAnalytics {
  userId: string;
  totalPodcasts: number;
  totalEpisodes: number;
  totalDownloads: number;
  totalListens: number;
  aggregateMetrics: AnalyticsDataPoint[];
  podcastAnalytics: PodcastAnalytics[];
  marketingCampaignAnalytics: MarketingCampaignAnalytics[];
}

/**
 * TODO: Review and validate the analytics metrics to ensure they cover all necessary data points for the platform
 * TODO: Confirm that the time periods defined in the TimePeriod enum are sufficient for all reporting needs
 * TODO: Assess if any additional analytics-related types or interfaces are needed for comprehensive reporting
 */