# Shared Directory

This README file provides an overview of the shared directory structure and its contents for the Podcast Marketing Automation SaaS platform. It explains the purpose of each subdirectory and key files, helping developers understand and navigate the shared resources.

## Overview

The shared directory contains common types, constants, utilities, and configurations used across the Podcast Marketing Automation SaaS platform. This centralized approach ensures consistency and reduces code duplication throughout the project.

## Directory Structure

- types/: Contains TypeScript type definitions
- constants/: Houses constant values used across the application
- utils/: Provides utility functions for common operations
- interfaces/: Defines shared interfaces for API responses and requests
- config/: Stores configuration files for various services
- hooks/: Contains custom React hooks for shared functionality

## Key Files

- types/index.ts: Main entry point for all shared types
- constants/index.ts: Centralizes constant values from various modules
- utils/index.ts: Exports utility functions for date formatting, string manipulation, validation, and analytics helpers
- interfaces/apiResponses.ts: Defines interfaces for API responses
- interfaces/apiRequests.ts: Defines interfaces for API requests
- config/apiConfig.ts: Contains configuration for API calls
- config/socialMediaConfig.ts: Stores configuration for social media integrations

## Usage

To use shared resources in your components or services, import them from the appropriate files in the shared directory. For example:

```typescript
import { User, Podcast } from '@shared/types';
import { ApiEndpoints } from '@shared/constants';
import { formatDate } from '@shared/utils';
```

## Contributing

When adding new shared resources, please follow these guidelines:
1. Place type definitions in the appropriate file within the types/ directory
2. Add new constants to the relevant file in the constants/ directory
3. Implement utility functions in the corresponding file within the utils/ directory
4. Update the respective index.ts files to export new additions
5. Document any new additions or changes in this README

<!-- TODO: Review and update the README content to ensure it accurately reflects the current state of the shared directory -->

<!-- TODO (Optional): Add examples of how to use key shared components in the README -->