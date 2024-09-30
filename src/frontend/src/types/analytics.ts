/**
 * This file contains TypeScript type definitions for analytics-related data structures
 * used in the Podcast Marketing Automation SaaS platform frontend.
 */

/**
 * Represents the structure of analytics data for a podcast episode
 */
export interface AnalyticsData {
  episodeId: string;
  downloads: number;
  uniqueListeners: number;
  averageListenTime: number;
  completionRate: number;
  geographicDistribution: Record<string, number>;
}

/**
 * Represents social media engagement metrics for marketing content
 */
export interface SocialMediaMetrics {
  platform: string;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
}

/**
 * Represents the time period for analytics data
 */
export type AnalyticsPeriod = "day" | "week" | "month" | "year";

/**
 * Represents filters for analytics data retrieval
 */
export interface AnalyticsFilter {
  startDate: Date;
  endDate: Date;
  period: AnalyticsPeriod;
  podcastId?: string;
  episodeId?: string;
}

/**
 * Represents data structure for analytics charts
 */
export interface AnalyticsChartData {
  labels: string[];
  datasets: Array<{ label: string; data: number[] }>;
}

// Human tasks:
// TODO: Review and validate the analytics types to ensure they cover all required metrics for the platform
// TODO (Optional): Consider adding more specific types for different kinds of analytics charts (e.g., line chart, bar chart) if needed