/**
 * SWAPI API Client
 * Base client for Star Wars API requests with error handling
 */

import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { ApiResponse, ApiError } from '../types/swapi';
import { API_CONFIG } from '../constants';

const baseURL = import.meta.env.VITE_SWAPI_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_SWAPI_BASE_URL environment variable is not set');
}

/**
 * Axios instance configured for SWAPI
 * - Base URL from environment variable
 * - Request timeout from API_CONFIG.REQUEST_TIMEOUT
 * - Error interceptor for better error handling
 */
export const swapiClient: AxiosInstance = axios.create({
  baseURL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
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
 *
 * Converts various Axios error types to user-friendly messages.
 * Handles server errors, network errors, and timeout errors gracefully.
 * Never throws - always returns a string message for displaying to users.
 *
 * @param error - Unknown error (typically from Axios)
 * @returns User-friendly error message as string
 *
 * @example
 *   try {
 *     await getPerson('999');
 *   } catch (error) {
 *     const msg = handleApiError(error);  // "Character not found" or similar
 *     setErrorMessage(msg);
 *   }
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      const apiError = error.response.data as ApiError;
      return apiError.detail || apiError.message || `API Error: ${error.response.status}`;
    } else if (error.request) {
      // Request made but no response received (network error)
      return 'No response from server. Check your internet connection.';
    } else if (error.code === 'ECONNABORTED') {
      // Request timeout
      return 'Request timeout. The server is taking too long to respond.';
    }
  }
  return 'An unexpected error occurred';
};

/**
 * Generic request handler for single resource endpoints
 *
 * Wraps axios GET requests with automatic type inference and error handling.
 * Used for endpoints that return a single resource (not paginated).
 *
 * @template T - TypeScript type for the response data
 * @param url - API endpoint path (e.g., "/people/1/")
 * @returns Promise resolving to typed data of type T
 * @throws AxiosError if request fails
 *
 * @example
 *   const person = await request<Person>('/people/1/');
 */
export const request = async <T>(url: string): Promise<T> => {
  const response = await swapiClient.get<T>(url);
  return response.data;
};

/**
 * Generic request handler for paginated endpoints
 *
 * Wraps axios GET requests for paginated API responses.
 * Returns ApiResponse<T> with count, next, previous, and results array.
 *
 * @template T - TypeScript type for items in results array
 * @param url - API endpoint path (e.g., "/people/?page=1")
 * @returns Promise resolving to paginated response wrapper
 * @throws AxiosError if request fails
 *
 * @example
 *   const page = await requestPaginated<Person>('/people/?page=1');
 *   console.log(page.count);      // Total count across all pages
 *   console.log(page.results);    // Array of Person objects
 *   console.log(page.next);       // URL to next page or null
 */
export const requestPaginated = async <T>(url: string): Promise<ApiResponse<T>> => {
  const response = await swapiClient.get<ApiResponse<T>>(url);
  return response.data;
};
