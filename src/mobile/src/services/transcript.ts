import * as Types from '../types';
import { api } from './api';

/**
 * Transcript service for the mobile application of the Podcast Marketing Automation SaaS platform.
 * Provides functions to interact with the transcript-related API endpoints.
 */

/**
 * Fetches the transcript for a specific episode
 * @param episodeId - The ID of the episode
 * @returns Promise resolving to the transcript data
 */
export const getTranscript = async (episodeId: number): Promise<Types.Transcript> => {
  try {
    const response = await api.get(`/transcripts/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};

/**
 * Initiates the transcript generation process for a specific episode
 * @param episodeId - The ID of the episode
 * @returns Promise resolving to the job ID for the transcript generation task
 */
export const generateTranscript = async (episodeId: number): Promise<{ jobId: string }> => {
  try {
    const response = await api.post(`/transcripts/generate`, { episodeId });
    return response.data;
  } catch (error) {
    console.error('Error generating transcript:', error);
    throw error;
  }
};

/**
 * Checks the status of a transcript generation job
 * @param jobId - The ID of the transcript generation job
 * @returns Promise resolving to the status and progress of the transcript generation job
 */
export const getTranscriptStatus = async (jobId: string): Promise<{ status: string; progress: number }> => {
  try {
    const response = await api.get(`/transcripts/status/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transcript status:', error);
    throw error;
  }
};

/**
 * Updates the transcript for a specific episode
 * @param episodeId - The ID of the episode
 * @param transcriptData - The updated transcript data
 * @returns Promise resolving to the updated transcript data
 */
export const updateTranscript = async (episodeId: number, transcriptData: object): Promise<Types.Transcript> => {
  try {
    const response = await api.put(`/transcripts/${episodeId}`, transcriptData);
    return response.data;
  } catch (error) {
    console.error('Error updating transcript:', error);
    throw error;
  }
};

// TODO: Implement error handling for API request failures
// TODO: Add caching mechanism for frequently accessed transcripts
// TODO: Implement offline support for viewing previously fetched transcripts