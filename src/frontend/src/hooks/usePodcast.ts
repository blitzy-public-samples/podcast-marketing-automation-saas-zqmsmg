import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Podcast, PodcastCreateInput, PodcastUpdateInput, PodcastFilters } from '../types/podcast';
import { getPodcasts, getPodcastById, createPodcast, updatePodcast, deletePodcast, uploadPodcastCoverImage } from '../services/podcast';

interface UsePodcastResult {
  podcasts: Podcast[];
  loading: boolean;
  error: string | null;
  fetchPodcasts: (filters?: PodcastFilters) => Promise<void>;
  fetchPodcastById: (id: string) => Promise<Podcast | null>;
  createNewPodcast: (input: PodcastCreateInput) => Promise<Podcast | null>;
  updateExistingPodcast: (id: string, input: PodcastUpdateInput) => Promise<Podcast | null>;
  deleteExistingPodcast: (id: string) => Promise<boolean>;
  uploadCoverImage: (id: string, file: File) => Promise<string | null>;
}

export const usePodcast = (): UsePodcastResult => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Assuming we have a podcastSlice in our Redux store
  const podcasts = useSelector((state: any) => state.podcast.podcasts);

  const fetchPodcasts = useCallback(async (filters?: PodcastFilters) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPodcasts = await getPodcasts(filters);
      dispatch({ type: 'podcast/setPodcasts', payload: fetchedPodcasts });
    } catch (err) {
      setError('Failed to fetch podcasts');
      console.error('Error fetching podcasts:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchPodcastById = useCallback(async (id: string): Promise<Podcast | null> => {
    setLoading(true);
    setError(null);
    try {
      const podcast = await getPodcastById(id);
      return podcast;
    } catch (err) {
      setError('Failed to fetch podcast');
      console.error('Error fetching podcast:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewPodcast = useCallback(async (input: PodcastCreateInput): Promise<Podcast | null> => {
    setLoading(true);
    setError(null);
    try {
      const newPodcast = await createPodcast(input);
      dispatch({ type: 'podcast/addPodcast', payload: newPodcast });
      return newPodcast;
    } catch (err) {
      setError('Failed to create podcast');
      console.error('Error creating podcast:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const updateExistingPodcast = useCallback(async (id: string, input: PodcastUpdateInput): Promise<Podcast | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedPodcast = await updatePodcast(id, input);
      dispatch({ type: 'podcast/updatePodcast', payload: updatedPodcast });
      return updatedPodcast;
    } catch (err) {
      setError('Failed to update podcast');
      console.error('Error updating podcast:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const deleteExistingPodcast = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deletePodcast(id);
      dispatch({ type: 'podcast/removePodcast', payload: id });
      return true;
    } catch (err) {
      setError('Failed to delete podcast');
      console.error('Error deleting podcast:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const uploadCoverImage = useCallback(async (id: string, file: File): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await uploadPodcastCoverImage(id, file);
      dispatch({ type: 'podcast/updatePodcastCoverImage', payload: { id, imageUrl } });
      return imageUrl;
    } catch (err) {
      setError('Failed to upload cover image');
      console.error('Error uploading cover image:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPodcasts();
  }, [fetchPodcasts]);

  return {
    podcasts,
    loading,
    error,
    fetchPodcasts,
    fetchPodcastById,
    createNewPodcast,
    updateExistingPodcast,
    deleteExistingPodcast,
    uploadCoverImage,
  };
};

// Human tasks:
// TODO: Implement proper error handling and display error messages to the user
// TODO: Add loading indicators for async operations
// TODO: Implement pagination or infinite scrolling for the podcast list
// TODO: Add unit tests for the usePodcast hook