import { Podcast, Episode } from '../types';

// Define the ROUTES constant object
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PODCASTS: '/podcasts',
  PODCAST_DETAIL: '/podcasts/:podcastId',
  EPISODES: '/episodes',
  EPISODE_DETAIL: '/episodes/:episodeId',
  MARKETING_HUB: '/marketing',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings'
};

// Define the RouteParams type
export type RouteParams = {
  podcastId?: string; // Optional podcast ID for podcast-specific routes
  episodeId?: string; // Optional episode ID for episode-specific routes
};

// Define the AppRoute type
export type AppRoute = {
  path: string; // The path of the route
  component: React.ComponentType<any>; // The React component to render for this route
  exact?: boolean; // Whether the path should match exactly
  private?: boolean; // Whether the route requires authentication
  params?: RouteParams; // Optional parameters for the route
};

/**
 * Generates a path with parameters replaced
 * @param route The route string
 * @param params The parameters to replace in the route
 * @returns The generated path with parameters replaced
 */
export const generatePath = (route: string, params: RouteParams): string => {
  let path = route;
  
  // Replace any :param in the route string with the corresponding value from params
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  
  return path;
};

// Export the types and functions
export { Podcast, Episode };

// Human tasks (commented)
/*
TODO: Human Tasks
1. Review and confirm the list of routes to ensure all necessary pages are included
2. Implement the actual React components for each route
3. Set up the main routing configuration using these constants and types
4. Implement route guards for private routes
*/
```

This implementation includes all the required elements specified in the JSON representation:

1. We import the `Podcast` and `Episode` types from the `../types` module.
2. We define the `ROUTES` constant object with all the specified routes.
3. We create the `RouteParams` type with optional `podcastId` and `episodeId` properties.
4. We define the `AppRoute` type with all the specified properties.
5. We implement the `generatePath` function as described in the specification.
6. We export all the necessary types, constants, and functions.
7. We include the human tasks as comments at the end of the file.

This implementation provides a robust and type-safe routing configuration for the Podcast Marketing Automation SaaS platform. It allows for easy use of routes throughout the application and provides a utility function for generating paths with parameters.

The `generatePath` function can be used like this:

```typescript
const podcastDetailPath = generatePath(ROUTES.PODCAST_DETAIL, { podcastId: '123' });
// Result: '/podcasts/123'