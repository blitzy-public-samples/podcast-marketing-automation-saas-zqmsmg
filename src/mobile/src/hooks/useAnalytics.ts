import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchAnalytics, updateAnalytics } from '../store/slices/analyticsSlice';
import api from '../services/api';

// Assuming these types are defined in '../types/analytics'
interface MobileOverallAnalytics {
  // Define the structure of overall analytics
}

interface MobileAnalyticsMetric {
  // Define the structure of analytics metric
}

interface MobileAnalyticsDataPoint {
  // Define the structure of analytics data point
}

interface MobileSessionAnalytics {
  // Define the structure of session analytics
}

interface MobileUserAnalytics {
  // Define the structure of user analytics
}

interface AnalyticsHookResult {
  loading: boolean;
  error: string | null;
  analytics: MobileOverallAnalytics | null;
  fetchAnalytics: () => Promise<void>;
  updateAnalytics: (data: Partial<MobileOverallAnalytics>) => Promise<void>;
  getSessionAnalytics: (sessionId: string) => MobileSessionAnalytics | undefined;
  getUserAnalytics: (userId: string) => MobileUserAnalytics | undefined;
  getMetricData: (metric: MobileAnalyticsMetric) => MobileAnalyticsDataPoint[];
  getActiveUsers: () => { daily: number; weekly: number; monthly: number };
}

export const useAnalytics = (): AnalyticsHookResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const analytics = useAppSelector((state) => state.analytics.data);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/analytics');
      dispatch(fetchAnalytics(response.data));
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateAnalyticsData = useCallback(async (data: Partial<MobileOverallAnalytics>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put('/analytics', data);
      dispatch(updateAnalytics(response.data));
    } catch (err) {
      setError('Failed to update analytics data');
      console.error('Error updating analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const { refetch } = useQuery('analytics', fetchAnalyticsData, {
    enabled: false,
  });

  const { mutate: updateMutation } = useMutation(updateAnalyticsData);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const getSessionAnalytics = useCallback((sessionId: string) => {
    return analytics?.sessions?.find(session => session.id === sessionId);
  }, [analytics]);

  const getUserAnalytics = useCallback((userId: string) => {
    return analytics?.users?.find(user => user.id === userId);
  }, [analytics]);

  const getMetricData = useCallback((metric: MobileAnalyticsMetric) => {
    return analytics?.metrics?.[metric] || [];
  }, [analytics]);

  const getActiveUsers = useCallback(() => {
    return {
      daily: analytics?.activeUsers?.daily || 0,
      weekly: analytics?.activeUsers?.weekly || 0,
      monthly: analytics?.activeUsers?.monthly || 0,
    };
  }, [analytics]);

  return {
    loading,
    error,
    analytics,
    fetchAnalytics: refetch,
    updateAnalytics: updateMutation,
    getSessionAnalytics,
    getUserAnalytics,
    getMetricData,
    getActiveUsers,
  };
};

// Commented list of human tasks
/*
Human tasks:
1. Implement error handling and retry logic for API calls in the useAnalytics hook (Required)
2. Add caching mechanism for analytics data to reduce API calls and improve performance (Optional)
3. Implement real-time updates for analytics data using WebSocket or Server-Sent Events (Optional)
4. Review and optimize the performance of analytics data processing in the hook (Required)
*/