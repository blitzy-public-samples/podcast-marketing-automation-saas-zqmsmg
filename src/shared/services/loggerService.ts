// Import and re-export all types from individual files
export * from './user';
export * from './podcast';
export * from './episode';
export * from './transcript';
export * from './marketingContent';
export * from './socialMediaPost';
export * from './analytics';

// Define any additional shared types that don't fit into specific files

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Pagination type
export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// Generic error type
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Date range type for filtering
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Generic status type
export type Status = 'pending' | 'in_progress' | 'completed' | 'failed';

// Generic sorting options
export type SortOrder = 'asc' | 'desc';

export interface SortOption {
  field: string;
  order: SortOrder;
}

// Generic filter type
export interface Filter {
  field: string;
  value: string | number | boolean | Date | string[];
  operator?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains';
}

// Generic query params type
export interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: SortOption;
  filters?: Filter[];
  search?: string;
  dateRange?: DateRange;
}

// File upload type
export interface FileUpload {
  file: File;
  progress: number;
  status: Status;
  error?: string;
}

// Generic notification type
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

// Export any constants or enums that might be used across the application
export enum UserRole {
  ADMIN = 'admin',
  CREATOR = 'creator',
  COLLABORATOR = 'collaborator',
  VIEWER = 'viewer',
}

export enum ContentType {
  AUDIO = 'audio',
  VIDEO = 'video',
  TEXT = 'text',
}

// Add any other shared types, interfaces, or enums as needed for the application