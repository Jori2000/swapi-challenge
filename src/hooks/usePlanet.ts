/**
 * Custom hooks for fetching planet data
 * Uses React Query for caching and state management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Planet, ApiResponse } from '../types/swapi';
import { getPlanet, getPlanets, searchPlanets } from '../api/swapi';

// React Query cache configuration
/**
 * SWAPI contains static Star Wars data that never changes. It is only the first 7 movies, so:
 * We use aggressive caching to minimize API calls and improve performance.
 */
const INFINITE = Infinity;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

/**
 * Fetch a single planet by ID
 * @param id - Planet ID (string). Query disabled if null/empty
 * @returns Query result with planet data
 * @example
 *   const { data: planet, isLoading, error } = usePlanet('1');
 */
export const usePlanet = (id: string | null): UseQueryResult<Planet, unknown> => {
  return useQuery({
    queryKey: ['planet', id],
    queryFn: () => getPlanet(id!),
    enabled: Boolean(id),
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
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
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
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
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};
