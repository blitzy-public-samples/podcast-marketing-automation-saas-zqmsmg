// Central export file for all enum types used in the Podcast Marketing Automation SaaS platform

// Import enums from their respective files
import { UserRoles } from './userRoles';
import { EpisodeStatus } from './episodeStatus';
import { MarketingContentStatus } from './marketingContentStatus';

// Export all enums
export {
    UserRoles,
    EpisodeStatus,
    MarketingContentStatus
};

// Re-export individual enums for convenience
export { UserRoles } from './userRoles';
export { EpisodeStatus } from './episodeStatus';
export { MarketingContentStatus } from './marketingContentStatus';

// Add any additional exports or type definitions if needed in the future