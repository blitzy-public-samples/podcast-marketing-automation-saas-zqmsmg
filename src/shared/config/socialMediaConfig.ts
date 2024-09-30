/**
 * Configuration settings for social media integrations in the Podcast Marketing Automation SaaS platform.
 * This file includes API endpoints, authentication settings, and platform-specific configurations.
 */

// TODO: Import SocialMediaPlatform from '../constants/socialMediaPlatforms' when available

export const socialMediaConfig = {
  apiBaseUrl: "https://api.podcastmarketing.com/v1/social-media",
  platforms: {
    FACEBOOK: {
      apiEndpoint: "/facebook",
      authMethod: "oauth2",
      scopes: ["public_profile", "pages_manage_posts"],
    },
    TWITTER: {
      apiEndpoint: "/twitter",
      authMethod: "oauth1a",
      scopes: ["tweet.read", "tweet.write", "users.read"],
    },
    LINKEDIN: {
      apiEndpoint: "/linkedin",
      authMethod: "oauth2",
      scopes: ["r_liteprofile", "w_member_social"],
    },
    INSTAGRAM: {
      apiEndpoint: "/instagram",
      authMethod: "oauth2",
      scopes: ["instagram_basic", "instagram_content_publish"],
    },
  },
  defaultPostSettings: {
    retryAttempts: 3,
    retryDelay: 5000, // in milliseconds
    timeout: 30000, // in milliseconds
  },
};

// List of human tasks
/**
 * Human Tasks:
 * 1. Verify the API base URL and ensure it matches the production environment (Critical)
 * 2. Confirm that the OAuth scopes for each platform are up-to-date and provide the necessary permissions (Required)
 * 3. Review and adjust the default post settings (retry attempts, delay, and timeout) based on production requirements (Required)
 * 4. Ensure that the authentication methods specified for each platform align with the latest API requirements (Critical)
 */