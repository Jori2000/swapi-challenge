/**
 * Custom hooks for fetching film data
 * Uses React Query for caching and state management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Film, ApiResponse } from '../types/swapi';
import { getFilm, getFilms, searchFilms } from '../api/swapi';

// React Query cache configuration
/**
 * SWAPI contains static Star Wars data that never changes. It is only the first 7 movies, so:
 * We use aggressive caching to minimize API calls and improve performance.
 */
const INFINITE = Infinity;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

/**
 * Fetch a single film by ID
 * @param id - Film ID (string). Query disabled if null/empty
 * @returns Query result with film data
 * @example
 *   const { data: film, isLoading, error } = useFilm('1');
 */
export const useFilm = (id: string | null): UseQueryResult<Film, unknown> => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => getFilm(id!),
    enabled: Boolean(id),
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};

/**
 * Fetch all films
 * SWAPI returns all films in one page, pagination not typically used
 * @returns Query result with all films
 * @example
 *   const { data: films, isLoading } = useFilms();
 */
export const useFilms = (): UseQueryResult<ApiResponse<Film>, unknown> => {
  return useQuery({
    queryKey: ['films'],
    queryFn: () => getFilms(),
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
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
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};
