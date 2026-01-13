/**
 * Custom hooks for fetching planet data
 * Uses React Query for caching and state management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Planet, ApiResponse } from '../types/swapi';
import { getPlanet, getPlanets, searchPlanets } from '../api/swapi';
import { QUERY_CACHE_CONFIG } from '../constants';

/**
 * Fetch a single planet by ID
 *
 * Query automatically disabled when id is null/empty due to enabled flag.
 * This prevents unnecessary API calls for invalid IDs.
 *
 * @param id - Planet ID (string). Query disabled if null/empty
 * @returns Query result with planet data
 * @example
 *   const { data: planet, isLoading, error } = usePlanet('1');
 *   const { data: noData } = usePlanet(null);  // Query disabled
 */
export const usePlanet = (id: string | null): UseQueryResult<Planet, unknown> => {
  return useQuery({
    queryKey: ['planet', id],
    queryFn: () => getPlanet(id as string), // Safe: queryFn only called when enabled=true
    enabled: !!id, // Only enable query when id is truthy
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Fetch all planets (paginated)
 * @param page - Page number (optional, default: 1)
 * @returns Query result with paginated planets
 * @example
 *   const { data: planets, isLoading } = usePlanets();
 *   const { data: page2 } = usePlanets(2);
 */
export const usePlanets = (page?: number): UseQueryResult<ApiResponse<Planet>, unknown> => {
  return useQuery({
    queryKey: ['planets', page],
    queryFn: () => getPlanets(page),
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Search for planets by name
 * @param name - Search query string. Query disabled if empty
 * @returns Query result with paginated search results
 * @example
 *   const { data: results, isLoading } = usePlanetsSearch('tatooine');
 */
export const usePlanetsSearch = (name: string): UseQueryResult<ApiResponse<Planet>, unknown> => {
  return useQuery({
    queryKey: ['planets', 'search', name],
    queryFn: () => searchPlanets(name),
    enabled: name.length > 0,
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};
