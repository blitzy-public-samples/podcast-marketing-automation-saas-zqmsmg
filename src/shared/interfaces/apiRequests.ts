// TODO: Import actual enum types when files are created
type UserRole = string;
type EpisodeStatus = string;
type MarketingContentStatus = string;

/**
 * Interface for user login request
 */
export interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Interface for user registration request
 */
export interface RegisterRequest {
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
}

/**
 * Interface for creating a new podcast
 */
export interface CreatePodcastRequest {
    title: string;
    description: string;
    coverImageUrl: string;
}

/**
 * Interface for updating an existing podcast
 */
export interface UpdatePodcastRequest {
    id: number;
    title?: string;
    description?: string;
    coverImageUrl?: string;
}

/**
 * Interface for creating a new episode
 */
export interface CreateEpisodeRequest {
    podcastId: number;
    title: string;
    description: string;
    audioFileUrl: string;
    status: EpisodeStatus;
    publishDate: string;
}

/**
 * Interface for updating an existing episode
 */
export interface UpdateEpisodeRequest {
    id: number;
    title?: string;
    description?: string;
    audioFileUrl?: string;
    status?: EpisodeStatus;
    publishDate?: string;
}

/**
 * Interface for generating a transcript for an episode
 */
export interface GenerateTranscriptRequest {
    episodeId: number;
}

/**
 * Interface for generating marketing content for an episode
 */
export interface GenerateMarketingContentRequest {
    episodeId: number;
    platforms: string[];
}

/**
 * Interface for scheduling a social media post
 */
export interface ScheduleSocialMediaPostRequest {
    marketingContentId: number;
    platform: string;
    scheduledTime: string;
}

/**
 * Interface for retrieving analytics data
 */
export interface GetAnalyticsRequest {
    podcastId?: number;
    episodeId?: number;
    startDate: string;
    endDate: string;
}

// TODO: Review and validate all API request interfaces
// TODO: Ensure all necessary request interfaces are included
// TODO: Verify that the interfaces align with the backend API specifications