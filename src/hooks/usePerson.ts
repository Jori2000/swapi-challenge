/**
 * Custom hooks for fetching person/character data
 * Uses React Query for caching and state management
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Person, ApiResponse } from '../types/swapi';
import { getPerson, getPeople, searchPeople } from '../api/swapi';

// React Query cache configuration
/**
 * SWAPI contains static Star Wars data that never changes. It is only the first 7 movies, so:
 * We use aggressive caching to minimize API calls and improve performance.
 */
const INFINITE = Infinity;
const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;

/**
 * Fetch all people (paginated or searched)
 * @param page - Page number (optional, default: 1)
 * @param search - Search query (optional)
 * @returns Query result with paginated/searched people
 * @example
 *   const { data: people, isLoading } = usePeople(1);
 *   const { data: results } = usePeople(undefined, 'luke');
 */
export const usePeople = (
  page?: number,
  search?: string
): UseQueryResult<ApiResponse<Person>, Error> => {
  return useQuery({
    queryKey: ['people', page, search],
    queryFn: () => {
      if (search && search.trim()) {
        return searchPeople(search);
      }
      return getPeople(page);
    },
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};

/**
 * Fetch a single person by ID
 * @param id - Person ID (string). Query disabled if null/empty
 * @returns Query result with person data
 * @example
 *   const { data: person, isLoading, error } = usePerson('1');
 */
export const usePerson = (id: string | null): UseQueryResult<Person, Error> => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id!),
    enabled: Boolean(id),
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};

/**
 * Search for people by name
 * @param name - Search query string. Query disabled if empty
 * @returns Query result with paginated search results
 * @example
 *   const { data: results, isLoading } = usePeopleSearch('luke');
 */
export const usePeopleSearch = (name: string): UseQueryResult<ApiResponse<Person>, Error> => {
  return useQuery({
    queryKey: ['people', 'search', name],
    queryFn: () => searchPeople(name),
    enabled: name.length > 0,
    staleTime: INFINITE,
    gcTime: TWENTY_FOUR_HOURS,
    retry: 1,
  });
};
