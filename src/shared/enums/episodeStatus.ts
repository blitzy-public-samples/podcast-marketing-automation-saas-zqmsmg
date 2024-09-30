/**
 * Enum definition for podcast episode statuses in the Podcast Marketing Automation SaaS platform
 */
export enum EpisodeStatus {
  /**
   * Episode is in draft state and not yet published
   */
  DRAFT = 'DRAFT',

  /**
   * Episode is scheduled for future publication
   */
  SCHEDULED = 'SCHEDULED',

  /**
   * Episode is published and available to listeners
   */
  PUBLISHED = 'PUBLISHED',

  /**
   * Episode is archived and no longer actively promoted
   */
  ARCHIVED = 'ARCHIVED'
}

/**
 * Type guard to check if a string is a valid EpisodeStatus
 * @param status - The status string to check
 * @returns True if the status is a valid EpisodeStatus, false otherwise
 */
export function isValidEpisodeStatus(status: string): status is EpisodeStatus {
  return Object.values(EpisodeStatus).includes(status as EpisodeStatus);
}

/**
 * Get a human-readable description of an EpisodeStatus
 * @param status - The EpisodeStatus to describe
 * @returns A string description of the status
 */
export function getEpisodeStatusDescription(status: EpisodeStatus): string {
  switch (status) {
    case EpisodeStatus.DRAFT:
      return 'Episode is in draft state and not yet published';
    case EpisodeStatus.SCHEDULED:
      return 'Episode is scheduled for future publication';
    case EpisodeStatus.PUBLISHED:
      return 'Episode is published and available to listeners';
    case EpisodeStatus.ARCHIVED:
      return 'Episode is archived and no longer actively promoted';
    default:
      return 'Unknown status';
  }
}