// Enum for marketing content status
export enum MarketingContentStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

// Enum for marketing content type
export enum MarketingContentType {
  SOCIAL_POST = 'SOCIAL_POST',
  EMAIL = 'EMAIL',
  BLOG_POST = 'BLOG_POST',
  VIDEO = 'VIDEO'
}

// Interface for basic marketing content
export interface MarketingContent {
  id: string;
  type: MarketingContentType;
  status: MarketingContentStatus;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  scheduledFor: Date | null;
}

// Type for creating marketing content
export type CreateMarketingContentPayload = Omit<MarketingContent, 'id' | 'createdAt' | 'updatedAt'>;

// Type for updating marketing content
export type UpdateMarketingContentPayload = Partial<Omit<MarketingContent, 'id' | 'createdAt' | 'updatedAt'>>;

// Interface for marketing content with associated episode
export interface MarketingContentWithEpisode extends MarketingContent {
  episodeId: string;
  episodeTitle: string;
}

// Interface for mobile-specific marketing content
export interface MobileMarketingContent extends MarketingContent {
  localDraftId: string | null;
  isSync: boolean;
}

// Interface for simplified marketing content list item
export interface MarketingContentListItem {
  id: string;
  type: MarketingContentType;
  status: MarketingContentStatus;
  scheduledFor: Date | null;
  episodeTitle: string;
}

// Interface for marketing content filter options
export interface MarketingContentFilter {
  type: MarketingContentType | null;
  status: MarketingContentStatus | null;
  dateRange: { start: Date; end: Date } | null;
}

// Human tasks (commented as requested)
/*
Human tasks:
1. Review and confirm the additional properties in MobileMarketingContent (Required)
2. Verify if MarketingContentListItem contains all necessary fields for mobile list views (Required)
3. Confirm if additional filter options are needed for MarketingContentFilter (Optional)
*/