import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { AnalyticsMetric, TimePeriod, AnalyticsDataPoint, EpisodeAnalytics, PodcastAnalytics, MarketingCampaignAnalytics, OverallAnalytics } from '../types/analytics';

/**
 * Calculates the growth rate between two values
 * @param currentValue The current value
 * @param previousValue The previous value
 * @returns The growth rate as a percentage
 */
export const calculateGrowthRate = (currentValue: number, previousValue: number): number => {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }
  return ((currentValue - previousValue) / previousValue) * 100;
};

/**
 * Aggregates analytics data points by a specified time period
 * @param dataPoints Array of analytics data points
 * @param period The time period to aggregate by
 * @returns Array of aggregated data points
 */
export const aggregateMetricsByTimePeriod = (dataPoints: AnalyticsDataPoint[], period: TimePeriod): AnalyticsDataPoint[] => {
  const groupedData: { [key: string]: AnalyticsDataPoint } = {};

  dataPoints.forEach((point) => {
    const periodKey = getPeriodKey(point.date, period);
    if (!groupedData[periodKey]) {
      groupedData[periodKey] = { ...point, value: 0 };
    }
    groupedData[periodKey].value += point.value;
  });

  return Object.values(groupedData);
};

/**
 * Calculates the total value for a specific metric across all data points
 * @param dataPoints Array of analytics data points
 * @param metric The specific metric to calculate
 * @returns The total value of the specified metric
 */
export const calculateTotalMetric = (dataPoints: AnalyticsDataPoint[], metric: AnalyticsMetric): number => {
  return dataPoints
    .filter((point) => point.metric === metric)
    .reduce((total, point) => total + point.value, 0);
};

/**
 * Calculates the average value for a specific metric across all data points
 * @param dataPoints Array of analytics data points
 * @param metric The specific metric to calculate
 * @returns The average value of the specified metric
 */
export const calculateAverageMetric = (dataPoints: AnalyticsDataPoint[], metric: AnalyticsMetric): number => {
  const filteredPoints = dataPoints.filter((point) => point.metric === metric);
  const total = filteredPoints.reduce((sum, point) => sum + point.value, 0);
  return filteredPoints.length > 0 ? total / filteredPoints.length : 0;
};

/**
 * Formats a date for display in analytics reports
 * @param date The date to format
 * @returns Formatted date string
 */
export const formatAnalyticsDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Generates start and end dates for a given time period
 * @param period The time period
 * @returns An object with startDate and endDate
 */
export const getAnalyticsDateRange = (period: TimePeriod): { startDate: Date; endDate: Date } => {
  const endDate = new Date();
  let startDate: Date;

  switch (period) {
    case 'day':
      startDate = startOfDay(endDate);
      break;
    case 'week':
      startDate = subDays(endDate, 7);
      break;
    case 'month':
      startDate = subDays(endDate, 30);
      break;
    case 'year':
      startDate = subDays(endDate, 365);
      break;
    default:
      throw new Error('Invalid time period');
  }

  return { startDate, endDate };
};

/**
 * Calculates the engagement rate for a set of analytics data points
 * @param dataPoints Array of analytics data points
 * @returns Engagement rate as a percentage
 */
export const calculateEngagementRate = (dataPoints: AnalyticsDataPoint[]): number => {
  const interactions = calculateTotalMetric(dataPoints, 'likes') +
                       calculateTotalMetric(dataPoints, 'shares') +
                       calculateTotalMetric(dataPoints, 'comments');
  const reach = calculateTotalMetric(dataPoints, 'downloads') +
                calculateTotalMetric(dataPoints, 'listens');

  return reach > 0 ? (interactions / reach) * 100 : 0;
};

/**
 * Sorts episodes based on their performance for a specific metric
 * @param episodes Array of episode analytics
 * @param metric The specific metric to sort by
 * @returns Sorted array of episodes
 */
export const sortEpisodesByPerformance = (episodes: EpisodeAnalytics[], metric: AnalyticsMetric): EpisodeAnalytics[] => {
  return [...episodes].sort((a, b) => {
    const aValue = calculateTotalMetric(a.dataPoints, metric);
    const bValue = calculateTotalMetric(b.dataPoints, metric);
    return bValue - aValue;
  });
};

/**
 * Helper function to get a period key for aggregation
 * @param date The date to get the key for
 * @param period The time period
 * @returns A string key representing the period
 */
const getPeriodKey = (date: Date, period: TimePeriod): string => {
  switch (period) {
    case 'day':
      return format(date, 'yyyy-MM-dd');
    case 'week':
      return `${format(date, 'yyyy')}-W${format(date, 'ww')}`;
    case 'month':
      return format(date, 'yyyy-MM');
    case 'year':
      return format(date, 'yyyy');
    default:
      throw new Error('Invalid time period');
  }
};

// Human tasks (commented)
/**
 * TODO: Human Tasks
 * 1. Review and validate the utility functions to ensure they cover all necessary analytics calculations
 * 2. Confirm that the date formatting and range calculations align with the desired analytics reporting format
 * 3. Assess if any additional utility functions are needed for comprehensive analytics processing
 */