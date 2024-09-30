import axios from 'axios';

// Define types based on the JSON specification
interface AnalyticsData {
  // Add properties based on your analytics data structure
  // This is a placeholder and should be replaced with actual properties
  [key: string]: any;
}

interface SocialMediaMetrics {
  // Add properties based on your social media metrics structure
  // This is a placeholder and should be replaced with actual properties
  [key: string]: any;
}

interface AnalyticsFilter {
  // Add properties based on your filter structure
  // This is a placeholder and should be replaced with actual properties
  [key: string]: any;
}

interface AnalyticsChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

// API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Fetches analytics data for a specific episode
 * @param episodeId - The ID of the episode
 * @param filter - The analytics filter parameters
 * @returns A promise that resolves to the episode analytics data
 */
export const getEpisodeAnalytics = async (episodeId: string, filter: AnalyticsFilter): Promise<AnalyticsData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/episodes/${episodeId}/analytics`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching episode analytics:', error);
    throw error;
  }
};

/**
 * Fetches aggregated analytics data for an entire podcast
 * @param podcastId - The ID of the podcast
 * @param filter - The analytics filter parameters
 * @returns A promise that resolves to an array of analytics data for each episode in the podcast
 */
export const getPodcastAnalytics = async (podcastId: string, filter: AnalyticsFilter): Promise<AnalyticsData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/podcasts/${podcastId}/analytics`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching podcast analytics:', error);
    throw error;
  }
};

/**
 * Fetches social media metrics for marketing content related to an episode or podcast
 * @param contentId - The ID of the content (episode or podcast)
 * @param filter - The analytics filter parameters
 * @returns A promise that resolves to an array of social media metrics for each platform
 */
export const getSocialMediaMetrics = async (contentId: string, filter: AnalyticsFilter): Promise<SocialMediaMetrics[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/${contentId}/social-media-metrics`, {
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching social media metrics:', error);
    throw error;
  }
};

/**
 * Processes raw analytics data into a format suitable for charts
 * @param rawData - The raw analytics data
 * @param metricKey - The key of the metric to be displayed in the chart
 * @returns Processed data ready for use in charts
 */
export const getAnalyticsChartData = (rawData: AnalyticsData[], metricKey: string): AnalyticsChartData => {
  const labels = rawData.map(data => data.date || ''); // Assuming each data point has a 'date' field
  const datasets = [{
    label: metricKey,
    data: rawData.map(data => data[metricKey] || 0),
  }];

  return { labels, datasets };
};

// Human tasks:
// TODO: Implement error handling and retries for API requests
// TODO: Add caching mechanism for frequently accessed analytics data
// TODO: Implement data normalization functions for consistent analytics processing