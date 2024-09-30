import { useState, useEffect, useCallback } from 'react';
import { getEpisodeAnalytics, getPodcastAnalytics, getSocialMediaMetrics, getAnalyticsChartData } from '../services/analytics';
import { AnalyticsData, SocialMediaMetrics, AnalyticsFilter, AnalyticsChartData } from '../types/analytics';

const useAnalytics = () => {
  const [episodeAnalytics, setEpisodeAnalytics] = useState<AnalyticsData | null>(null);
  const [podcastAnalytics, setPodcastAnalytics] = useState<AnalyticsData | null>(null);
  const [socialMediaMetrics, setSocialMediaMetrics] = useState<SocialMediaMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEpisodeAnalytics = useCallback(async (episodeId: string, filter: AnalyticsFilter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEpisodeAnalytics(episodeId, filter);
      setEpisodeAnalytics(data);
    } catch (err) {
      setError('Failed to fetch episode analytics');
      console.error('Error fetching episode analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPodcastAnalytics = useCallback(async (podcastId: string, filter: AnalyticsFilter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPodcastAnalytics(podcastId, filter);
      setPodcastAnalytics(data);
    } catch (err) {
      setError('Failed to fetch podcast analytics');
      console.error('Error fetching podcast analytics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSocialMediaMetrics = useCallback(async (contentId: string, filter: AnalyticsFilter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSocialMediaMetrics(contentId, filter);
      setSocialMediaMetrics(data);
    } catch (err) {
      setError('Failed to fetch social media metrics');
      console.error('Error fetching social media metrics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const processChartData = useCallback(async (data: AnalyticsData): Promise<AnalyticsChartData> => {
    try {
      return await getAnalyticsChartData(data);
    } catch (err) {
      console.error('Error processing chart data:', err);
      throw new Error('Failed to process chart data');
    }
  }, []);

  // Implement data refresh mechanism
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (episodeAnalytics) {
        fetchEpisodeAnalytics(episodeAnalytics.id, episodeAnalytics.filter);
      }
      if (podcastAnalytics) {
        fetchPodcastAnalytics(podcastAnalytics.id, podcastAnalytics.filter);
      }
      if (socialMediaMetrics) {
        fetchSocialMediaMetrics(socialMediaMetrics.id, socialMediaMetrics.filter);
      }
    }, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [episodeAnalytics, podcastAnalytics, socialMediaMetrics, fetchEpisodeAnalytics, fetchPodcastAnalytics, fetchSocialMediaMetrics]);

  return {
    episodeAnalytics,
    podcastAnalytics,
    socialMediaMetrics,
    loading,
    error,
    fetchEpisodeAnalytics,
    fetchPodcastAnalytics,
    fetchSocialMediaMetrics,
    processChartData,
  };
};

export default useAnalytics;

// TODO: Implement data caching mechanism to reduce unnecessary API calls