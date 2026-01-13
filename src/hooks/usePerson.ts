/**
 * Custom hooks for fetching person/character data
 * Uses React Query for caching and state management
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import type { UseQueryResult, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { Person, ApiResponse } from '../types/swapi';
import { getPerson, getPeople, searchPeople } from '../api/swapi';
import { QUERY_CACHE_CONFIG } from '../constants';

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
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Fetch a single person by ID
 *
 * Query automatically disabled when id is null/empty due to enabled flag.
 * This prevents unnecessary API calls for invalid IDs.
 *
 * @param id - Person ID (string). Query disabled if null/empty
 * @returns Query result with person data
 * @example
 *   const { data: person, isLoading, error } = usePerson('1');
 *   const { data: noData } = usePerson(null);  // Query disabled
 */
export const usePerson = (id: string | null): UseQueryResult<Person, Error> => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => getPerson(id as string), // Safe: queryFn only called when enabled=true
    enabled: !!id, // Only enable query when id is truthy
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
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
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};

/**
 * Fetch people with infinite pagination (endless loading / infinite scroll)
 *
 * Uses useInfiniteQuery for seamless pagination. Automatically manages
 * page numbers and appends new pages to existing data.
 *
 * @returns Infinite query result with paginated people data and hasNextPage flag
 * @example
 *   const {
 *     data,
 *     hasNextPage,
 *     fetchNextPage,
 *     isFetchingNextPage,
 *     isLoading,
 *     error
 *   } = useInfinitePeople();
 *
 *   if (data?.pages) {
 *     data.pages.flatMap(page => page.results).map(person => ...)
 *   }
 *
 *   <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
 *     {isFetchingNextPage ? 'Loading...' : 'Load More'}
 *   </button>
 */
export const useInfinitePeople = (): UseInfiniteQueryResult<ApiResponse<Person>, Error> => {
  return useInfiniteQuery({
    queryKey: ['people', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getPeople(pageParam as number),
    getNextPageParam: (lastPage) => {
      // Extract page number from SWAPI's next URL (e.g., ?page=2)
      if (!lastPage.next) return undefined;
      const match = lastPage.next.match(/page=(\d+)/);
      return match ? parseInt(match[1], 10) : undefined;
    },
    initialPageParam: 1,
    staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
    gcTime: QUERY_CACHE_CONFIG.GC_TIME,
    retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
  });
};
