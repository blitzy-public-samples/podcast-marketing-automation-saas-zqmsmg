import { MobileMarketingContent, CreateMarketingContentPayload, UpdateMarketingContentPayload, MarketingContentFilter, MarketingContentListItem } from '../types/marketing';
import { get, post, put, delete as httpDelete } from './api';

const BASE_URL = '/marketing';

export const getMarketingContents = async (filter: MarketingContentFilter): Promise<MarketingContentListItem[]> => {
  try {
    const response = await get(`${BASE_URL}/contents`, { params: filter });
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      platform: item.platform,
      status: item.status,
      scheduledDate: item.scheduledDate ? new Date(item.scheduledDate) : null,
    }));
  } catch (error) {
    console.error('Error fetching marketing contents:', error);
    throw error;
  }
};

export const getMarketingContent = async (id: string): Promise<MobileMarketingContent> => {
  try {
    const response = await get(`${BASE_URL}/contents/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching marketing content:', error);
    throw error;
  }
};

export const createMarketingContent = async (payload: CreateMarketingContentPayload): Promise<MobileMarketingContent> => {
  try {
    const response = await post(`${BASE_URL}/contents`, payload);
    return response.data;
  } catch (error) {
    console.error('Error creating marketing content:', error);
    throw error;
  }
};

export const updateMarketingContent = async (id: string, payload: UpdateMarketingContentPayload): Promise<MobileMarketingContent> => {
  try {
    const response = await put(`${BASE_URL}/contents/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating marketing content:', error);
    throw error;
  }
};

export const deleteMarketingContent = async (id: string): Promise<void> => {
  try {
    await httpDelete(`${BASE_URL}/contents/${id}`);
  } catch (error) {
    console.error('Error deleting marketing content:', error);
    throw error;
  }
};

export const generateMarketingContent = async (episodeId: string, options: object): Promise<MobileMarketingContent[]> => {
  try {
    const response = await post(`${BASE_URL}/generate`, { episodeId, options });
    return response.data;
  } catch (error) {
    console.error('Error generating marketing content:', error);
    throw error;
  }
};

export const scheduleMarketingContent = async (id: string, scheduledDate: Date): Promise<MobileMarketingContent> => {
  try {
    const response = await put(`${BASE_URL}/contents/${id}/schedule`, { scheduledDate });
    return response.data;
  } catch (error) {
    console.error('Error scheduling marketing content:', error);
    throw error;
  }
};

export const syncLocalDrafts = async (localDrafts: MobileMarketingContent[]): Promise<MobileMarketingContent[]> => {
  try {
    const draftsToSync = localDrafts.filter(draft => draft.needsSync);
    const response = await post(`${BASE_URL}/sync-drafts`, { drafts: draftsToSync });
    
    // Update local storage with synced content
    // This part would typically be handled by a state management solution like Redux
    // For now, we'll just return the synced data
    return response.data;
  } catch (error) {
    console.error('Error syncing local drafts:', error);
    throw error;
  }
};

// TODO: Implement error handling for API request failures
// TODO: Add offline support for creating and editing marketing content
// TODO: Implement a queueing system for syncing local drafts when the device comes online
// TODO: Add support for cancelling scheduled marketing content
// TODO: Implement pagination for getMarketingContents function