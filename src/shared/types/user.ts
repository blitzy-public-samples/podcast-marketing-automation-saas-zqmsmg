/**
 * This file defines the TypeScript types and interfaces related to user entities
 * in the Podcast Marketing Automation SaaS platform. It includes types for user
 * authentication, profile information, and role-based access control.
 */

/**
 * Enum representing different user roles in the system
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  CREATOR = 'CREATOR',
  COLLABORATOR = 'COLLABORATOR',
  VIEWER = 'VIEWER'
}

/**
 * Interface for user authentication credentials
 */
export interface AuthCredentials {
  email: string;
  password: string;
}

/**
 * Interface for user profile information
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string | null;
  bio: string | null;
}

/**
 * Interface for user-specific settings
 */
export interface UserSettings {
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
  theme: string;
  language: string;
}

/**
 * Represents a user in the system
 */
export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

// Human tasks:
// TODO: Review and confirm the User interface properties
// TODO: Verify if additional user-related types are needed
// TODO: Ensure UserRole enum values align with the defined roles in the system