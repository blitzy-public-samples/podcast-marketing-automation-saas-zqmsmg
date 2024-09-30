// Mobile-specific analytics types for the Podcast Marketing Automation SaaS platform

// Enum representing mobile-specific analytics metrics
export enum MobileAnalyticsMetric {
  APP_OPENS = 'APP_OPENS',
  SESSION_DURATION = 'SESSION_DURATION',
  SCREEN_VIEWS = 'SCREEN_VIEWS',
  FEATURE_USAGE = 'FEATURE_USAGE',
  OFFLINE_LISTENS = 'OFFLINE_LISTENS',
  NOTIFICATION_INTERACTIONS = 'NOTIFICATION_INTERACTIONS',
  APP_CRASHES = 'APP_CRASHES'
}

// Interface representing a single mobile-specific data point in analytics
export interface MobileAnalyticsDataPoint {
  date: Date;
  metric: MobileAnalyticsMetric;
  value: number;
}

// Interface representing analytics data for a single mobile app session
export interface MobileSessionAnalytics {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  deviceInfo: {
    os: string;
    version: string;
    model: string;
  };
  metrics: MobileAnalyticsDataPoint[];
}

// Interface representing mobile-specific analytics data for a user
export interface MobileUserAnalytics {
  userId: string;
  totalSessions: number;
  averageSessionDuration: number;
  lastActive: Date;
  deviceTypes: string[];
  metrics: MobileAnalyticsDataPoint[];
}

// Interface representing overall mobile-specific analytics data
export interface MobileOverallAnalytics {
  totalUsers: number;
  activeUsers: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  averageSessionDuration: number;
  topDevices: {
    os: string;
    version: string;
    model: string;
    count: number;
  }[];
  metrics: MobileAnalyticsDataPoint[];
  userAnalytics: MobileUserAnalytics[];
  overallAnalytics: OverallAnalytics; // This type should be imported from the shared analytics types
}

// TODO: Import shared analytics types when available
// import { AnalyticsMetric, TimePeriod, AnalyticsDataPoint, EpisodeAnalytics, PodcastAnalytics, MarketingCampaignAnalytics, OverallAnalytics } from '../../../shared/types/analytics';

// Placeholder for OverallAnalytics until the shared type is available
interface OverallAnalytics {
  // Define properties based on the shared analytics type when available
}

// Human tasks:
// TODO: Review and validate the mobile-specific analytics metrics to ensure they cover all necessary data points for the mobile platform
// TODO: Confirm that the mobile session and user analytics interfaces capture all relevant data for mobile app usage analysis
// TODO: Assess if any additional mobile-specific analytics types or interfaces are needed for comprehensive mobile reporting
// TODO: Ensure that the integration between shared analytics types and mobile-specific types is seamless and doesn't introduce any conflicts