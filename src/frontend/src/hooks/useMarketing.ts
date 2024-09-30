import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateMarketingContent, schedulePost, getMarketingAnalytics, getScheduledPosts } from '../services/marketing';
import { MarketingContent, SocialMediaPost, MarketingAnalytics } from '../types/marketing';
import { setMarketingContent, setScheduledPosts, setMarketingAnalytics } from '../store/slices/marketingSlice';
import { RootState } from '../store';

const useMarketing = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const marketingContent = useSelector((state: RootState) => state.marketing.marketingContent);
  const scheduledPosts = useSelector((state: RootState) => state.marketing.scheduledPosts);
  const marketingAnalytics = useSelector((state: RootState) => state.marketing.marketingAnalytics);

  const generateContent = useCallback(async (episodeId: number, platform: string) => {
    setLoading(true);
    setError(null);
    try {
      const content = await generateMarketingContent(episodeId, platform);
      dispatch(setMarketingContent(content));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating marketing content');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const schedulePostContent = useCallback(async (postData: SocialMediaPost) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPosts = await schedulePost(postData);
      dispatch(setScheduledPosts(updatedPosts));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while scheduling the post');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchMarketingAnalytics = useCallback(async (id: number, type: string) => {
    setLoading(true);
    setError(null);
    try {
      const analytics = await getMarketingAnalytics(id, type);
      dispatch(setMarketingAnalytics(analytics));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching marketing analytics');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchScheduledPosts = useCallback(async (podcastId: number) => {
    setLoading(true);
    setError(null);
    try {
      const posts = await getScheduledPosts(podcastId);
      dispatch(setScheduledPosts(posts));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching scheduled posts');
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    loading,
    error,
    generateContent,
    schedulePost: schedulePostContent,
    fetchMarketingAnalytics,
    fetchScheduledPosts,
    marketingContent,
    scheduledPosts,
    marketingAnalytics,
  };
};

export default useMarketing;

// Human tasks:
// TODO: Implement proper error handling and user feedback for marketing operations
// TODO: Add unit tests for the useMarketing hook
// TODO: Consider implementing a caching mechanism for marketing analytics to reduce API calls
// TODO: Evaluate the need for pagination in fetchScheduledPosts function