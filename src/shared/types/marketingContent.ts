import { Episode } from './episode';

/**
 * Enum representing the status of marketing content
 */
export enum MarketingContentStatus {
    DRAFT = 'DRAFT',
    SCHEDULED = 'SCHEDULED',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}

/**
 * Enum representing the type of marketing content
 */
export enum MarketingContentType {
    SOCIAL_POST = 'SOCIAL_POST',
    EMAIL = 'EMAIL',
    BLOG_POST = 'BLOG_POST',
    NEWSLETTER = 'NEWSLETTER'
}

/**
 * Interface representing marketing content
 */
export interface MarketingContent {
    id: string;
    episodeId: string;
    type: MarketingContentType;
    content: string;
    status: MarketingContentStatus;
    createdAt: Date;
    updatedAt: Date;
    scheduledFor: Date | null;
}

/**
 * Type for creating marketing content, omitting auto-generated fields
 */
export type CreateMarketingContentPayload = Omit<MarketingContent, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Type for updating marketing content, allowing partial updates
 */
export type UpdateMarketingContentPayload = Partial<CreateMarketingContentPayload>;

/**
 * Interface extending MarketingContent to include the associated Episode
 */
export interface MarketingContentWithEpisode extends MarketingContent {
    episode: Episode;
}

// TODO: Review and confirm the MarketingContentType enum values
// TODO: Verify if additional properties are needed for the MarketingContent interface
// TODO: Confirm if the MarketingContentWithEpisode type is necessary and correctly defined