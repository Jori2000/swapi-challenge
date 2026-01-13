/**
 * Custom hook for fetching planets
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Planet, ApiResponse } from '../types/swapi';
import { fetchPlanet, fetchPlanets, searchPlanets } from '../api/fetchPlanets';

/**
 * Fetch a planet by ID
 * @param id - Planet ID
 * @returns Query result with planet data
 */
export const usePlanet = (id: number | null): UseQueryResult<Planet, unknown> => {
  return useQuery({
    queryKey: ['planet', id],
    queryFn: () => fetchPlanet(id!),
    enabled: id !== null,
  });
};

/**
 * Fetch all planets
 * @param page - Page number
 * @returns Query result with paginated planets
 */
export const usePlanets = (page?: number): UseQueryResult<ApiResponse<Planet>, unknown> => {
  return useQuery({
    queryKey: ['planets', page],
    queryFn: () => fetchPlanets(page),
  });
};

/**
 * Search for planets by name
 * @param name - Search query
 * @returns Query result with search results
 */
export const usePlanetsSearch = (name: string) => {
  return useQuery({
    queryKey: ['planets', 'search', name],
    queryFn: () => searchPlanets(name),
    enabled: name.length > 0,
  });
};
