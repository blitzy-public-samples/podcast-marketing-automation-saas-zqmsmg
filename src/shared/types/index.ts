// This file serves as the main entry point for all shared types in the Podcast Marketing Automation SaaS platform.
// It exports types from various domain-specific files to provide a centralized location for importing shared types across the application.

// User types
export * from './user';

// Podcast types
export * from './podcast';

// Episode types
export * from './episode';

// Transcript types
export * from './transcript';

// Marketing Content types
export * from './marketingContent';

// Social Media Post types
export * from './socialMediaPost';

// Analytics types
export * from './analytics';

// TODO: Review and confirm the list of type files to be imported and exported
// TODO: Ensure that all referenced type files are created and properly typed

// Note: The actual type definitions are located in their respective files.
// This index file simply re-exports them for easier importing throughout the application.