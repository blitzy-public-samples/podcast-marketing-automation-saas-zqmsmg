/**
 * UserRole enum represents the different user roles in the Podcast Marketing Automation SaaS platform.
 * It is used for role-based access control throughout the application.
 */
export enum UserRole {
    /**
     * ADMIN: Full system access and management capabilities
     */
    ADMIN = 'ADMIN',

    /**
     * CREATOR: Podcast creator with full access to own content and limited platform features
     */
    CREATOR = 'CREATOR',

    /**
     * COLLABORATOR: Limited access to assigned podcasts and features
     */
    COLLABORATOR = 'COLLABORATOR',

    /**
     * VIEWER: Read-only access to specific podcasts and analytics
     */
    VIEWER = 'VIEWER'
}

// TODO: Review and confirm the UserRole enum values align with the defined roles in the system
// TODO: Consider adding comments to describe the permissions associated with each role