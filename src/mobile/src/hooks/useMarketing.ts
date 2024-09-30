import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MobileMarketingContent,
  CreateMarketingContentPayload,
  UpdateMarketingContentPayload,
  MarketingContentFilter,
  MarketingContentListItem
} from '../types/marketing';
import {
  getMarketingContents,
  getMarketingContent,
  createMarketingContent,
  updateMarketingContent,
  deleteMarketingContent,
  generateMarketingContent,
  scheduleMarketingContent,
  syncLocalDrafts
} from '../services/marketing';

interface UseMarketingResult {
  marketingContents: MarketingContentListItem[];
  selectedContent: MobileMarketingContent | null;
  loading: boolean;
  error: string | null;
  fetchMarketingContents: (filter?: MarketingContentFilter) => Promise<void>;
  fetchMarketingContent: (id: string) => Promise<void>;
  createContent: (payload: CreateMarketingContentPayload) => Promise<void>;
  updateContent: (id: string, payload: UpdateMarketingContentPayload) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
  generateContent: (episodeId: string) => Promise<void>;
  scheduleContent: (id: string) => Promise<void>;
  syncDrafts: () => Promise<void>;
}

export const useMarketing = (): UseMarketingResult => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Assuming we have a marketingSlice in the Redux store
  const marketingContents = useSelector((state: any) => state.marketing.contents);
  const selectedContent = useSelector((state: any) => state.marketing.selectedContent);

  const fetchMarketingContents = useCallback(async (filter?: MarketingContentFilter) => {
    setLoading(true);
    setError(null);
    try {
      const contents = await getMarketingContents(filter);
      dispatch({ type: 'marketing/setContents', payload: contents });
    } catch (err) {
      setError('Failed to fetch marketing contents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchMarketingContent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const content = await getMarketingContent(id);
      dispatch({ type: 'marketing/setSelectedContent', payload: content });
    } catch (err) {
      setError('Failed to fetch marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const createContent = useCallback(async (payload: CreateMarketingContentPayload) => {
    setLoading(true);
    setError(null);
    try {
      const newContent = await createMarketingContent(payload);
      dispatch({ type: 'marketing/addContent', payload: newContent });
    } catch (err) {
      setError('Failed to create marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateContent = useCallback(async (id: string, payload: UpdateMarketingContentPayload) => {
    setLoading(true);
    setError(null);
    try {
      const updatedContent = await updateMarketingContent(id, payload);
      dispatch({ type: 'marketing/updateContent', payload: updatedContent });
    } catch (err) {
      setError('Failed to update marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const deleteContent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMarketingContent(id);
      dispatch({ type: 'marketing/removeContent', payload: id });
    } catch (err) {
      setError('Failed to delete marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const generateContent = useCallback(async (episodeId: string) => {
    setLoading(true);
    setError(null);
    try {
      const generatedContent = await generateMarketingContent(episodeId);
      dispatch({ type: 'marketing/addContent', payload: generatedContent });
    } catch (err) {
      setError('Failed to generate marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const scheduleContent = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const scheduledContent = await scheduleMarketingContent(id);
      dispatch({ type: 'marketing/updateContent', payload: scheduledContent });
    } catch (err) {
      setError('Failed to schedule marketing content');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const syncDrafts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const syncedDrafts = await syncLocalDrafts();
      dispatch({ type: 'marketing/updateContents', payload: syncedDrafts });
    } catch (err) {
      setError('Failed to sync local drafts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMarketingContents();
  }, [fetchMarketingContents]);

  return {
    marketingContents,
    selectedContent,
    loading,
    error,
    fetchMarketingContents,
    fetchMarketingContent,
    createContent,
    updateContent,
    deleteContent,
    generateContent,
    scheduleContent,
    syncDrafts,
  };
};

// Human tasks (commented):
/*
TODO: Implement caching mechanism for marketing contents to improve performance
TODO: Add support for offline mode and local storage of marketing contents
TODO: Implement error handling and retry logic for failed API requests
TODO: Add support for pagination when fetching marketing contents
*/