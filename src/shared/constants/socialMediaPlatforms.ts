/**
 * This file contains constants related to supported social media platforms
 * for the Podcast Marketing Automation SaaS platform. It defines an enum of
 * platform names and an object with platform-specific details.
 */

/**
 * Enum of supported social media platforms
 */
export enum SocialMediaPlatform {
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER',
  LINKEDIN = 'LINKEDIN',
  INSTAGRAM = 'INSTAGRAM',
}

/**
 * Object containing details for each supported social media platform
 */
export const SOCIAL_MEDIA_PLATFORMS = {
  [SocialMediaPlatform.FACEBOOK]: {
    name: 'Facebook',
    icon: 'facebook-icon',
    color: '#1877F2',
    maxPostLength: 63206,
  },
  [SocialMediaPlatform.TWITTER]: {
    name: 'Twitter',
    icon: 'twitter-icon',
    color: '#1DA1F2',
    maxPostLength: 280,
  },
  [SocialMediaPlatform.LINKEDIN]: {
    name: 'LinkedIn',
    icon: 'linkedin-icon',
    color: '#0A66C2',
    maxPostLength: 3000,
  },
  [SocialMediaPlatform.INSTAGRAM]: {
    name: 'Instagram',
    icon: 'instagram-icon',
    color: '#E4405F',
    maxPostLength: 2200,
  },
} as const;

/**
 * Type for the SOCIAL_MEDIA_PLATFORMS object to ensure type safety when accessing platform details
 */
export type SocialMediaPlatformDetails = typeof SOCIAL_MEDIA_PLATFORMS[SocialMediaPlatform];

// Human tasks:
// TODO: Verify the accuracy of maxPostLength values for each platform and update if necessary
// TODO: Confirm the color codes used for each platform's branding
// TODO: Ensure that the icon names correspond to actual icon assets in the project