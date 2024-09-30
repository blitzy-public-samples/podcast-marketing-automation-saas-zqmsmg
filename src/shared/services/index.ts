/**
 * This file serves as the main entry point for all shared services in the Podcast Marketing Automation SaaS platform.
 * It exports services that will be used across the application for API communication, logging, and potentially other shared functionalities.
 */

// Import services
import apiService from './apiService';
import loggerService from './loggerService';

// Export services
export {
  apiService,
  loggerService
};

/**
 * apiService: Service for handling API communications with the backend
 * loggerService: Service for centralized logging across the application
 */

// TODO: Consider adding additional shared services as needed for the application

/**
 * Human Tasks:
 * 1. [Required] Implement apiService.ts with functions for API communication
 * 2. [Required] Implement loggerService.ts with logging functionality
 * 3. [Optional] Consider adding additional shared services as needed for the application
 */