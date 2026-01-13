/**
 * Custom hooks for fetching film data
 * Uses React Query for caching and state management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Film, ApiResponse } from '../types/swapi';
import { getFilm, getFilms, searchFilms } from '../api/swapi';
import { QUERY_CACHE_CONFIG } from '../constants';

/**
 * Fetch a single film by ID
 *
 * Query automatically disabled when id is null/empty due to enabled flag.
 * This prevents unnecessary API calls for invalid IDs.
 *
 * @param id - Film ID (string). Query disabled if null/empty
 * @returns Query result with film data
 * @example
 *   const { data: film, isLoading, error } = useFilm('1');
 *   const { data: noData } = useFilm(null);  // Query disabled
 */
export const useFilm = (id: string | null): UseQueryResult<Film, Error> => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilm(id as string), // Safe: queryFn only called when enabled=true
    enabled: !!id, // Only enable query when id is truthy
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Fetch all films
 * SWAPI returns all films in one page, pagination not typically used
 * @returns Query result with all films
 * @example
 *   const { data: films, isLoading } = useFilms();
 */
export const useFilms = (): UseQueryResult<ApiResponse<Film>, Error> => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => getFilms(),
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Search for films by title
 * @param title - Search query string. Query disabled if empty
 * @returns Query result with paginated search results
 * @example
 *   const { data: results, isLoading } = useFilmsSearch('empire');
 */
export const useFilmsSearch = (title: string): UseQueryResult<ApiResponse<Film>, Error> => {
  return useQuery({
    queryKey: ['films', 'search', title],
    queryFn: () => searchFilms(title),
    enabled: title.length > 0,
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};
