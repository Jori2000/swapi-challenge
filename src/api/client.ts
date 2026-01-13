/**
 * SWAPI API Client
 * Base client for Star Wars API requests with error handling
 */

import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '../types/swapi';

const baseURL = import.meta.env.VITE_SWAPI_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_SWAPI_BASE_URL environment variable is not set');
}

/**
 * Axios instance configured for SWAPI
 * - Base URL from environment variable
 * - 10 second timeout
 * - Error interceptor for better error handling
 */
export const swapiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

/**
 * Response interceptor for handling errors
 */
swapiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Log error details in development
    if (import.meta.env.DEV) {
      console.error('API Error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Error handler for API requests
 * Converts Axios errors to user-friendly messages
 * @param error - Axios error object
 * @returns User-friendly error message
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status
      const apiError = error.response.data as ApiError;
      return apiError.detail || apiError.message || `API Error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response
      return 'No response from server. Check your internet connection.';
    } else if (error.code === 'ECONNABORTED') {
      return 'Request timeout. The server is taking too long to respond.';
    }
  }
  return 'An unexpected error occurred';
};

/**
 * Generic request handler with typing
 * @param url - API endpoint
 * @returns Typed data or error
 */
export const request = async <T>(url: string): Promise<T> => {
  const response = await swapiClient.get<T>(url);
  return response.data;
};
/**
 * Generic paginated request handler
 * @param url - API endpoint
 * @returns Typed paginated response
 */
export const requestPaginated = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await swapiClient.get<ApiResponse<T>>(url);
  return response.data;
};
