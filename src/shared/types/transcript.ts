import { Episode } from './episode';

/**
 * Enum representing the possible statuses of a transcript
 */
export enum TranscriptStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

/**
 * Interface representing a segment of the transcript with timing information
 */
export interface TranscriptSegment {
  startTime: number;
  endTime: number;
  text: string;
  speakerId: string | null;
}

/**
 * Interface representing a complete transcript of a podcast episode
 */
export interface Transcript {
  id: string;
  episodeId: string;
  content: string;
  segments: TranscriptSegment[];
  status: TranscriptStatus;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Implement the following human tasks:
// - Review and confirm the structure of the Transcript and TranscriptSegment interfaces
// - Verify if additional properties or types are needed for transcript handling
// - Confirm if the TranscriptStatus enum covers all possible statuses