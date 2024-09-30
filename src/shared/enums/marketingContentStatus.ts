/**
 * Enum representing the possible states of marketing content in the Podcast Marketing Automation SaaS platform.
 * This enum is used to track the lifecycle of marketing content from creation to archival.
 */
export enum MarketingContentStatus {
  /**
   * Content is in draft state and not ready for publishing.
   * This is typically the initial state when content is being created or edited.
   */
  DRAFT = 'DRAFT',

  /**
   * Content is scheduled for future publishing.
   * This state indicates that the content has been finalized but is set to be published at a later date.
   */
  SCHEDULED = 'SCHEDULED',

  /**
   * Content has been published and is live.
   * This state represents active marketing content that is currently visible to the audience.
   */
  PUBLISHED = 'PUBLISHED',

  /**
   * Content has been archived and is no longer active.
   * This state is used for content that is no longer relevant or has been removed from active use.
   */
  ARCHIVED = 'ARCHIVED',
}

// Human tasks:
// TODO: Review and confirm if additional status values are needed for MarketingContentStatus
// TODO: Verify if the status transitions align with the business logic of the marketing workflow