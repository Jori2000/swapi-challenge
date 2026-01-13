/**
 * Custom hook for fetching a single person
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Person } from '../types/swapi';
import { fetchPerson, searchPeople } from '../api/fetchPeople';

/**
 * Fetch a person by ID
 * @param id - Person ID
 * @returns Query result with person data
 */
export const usePerson = (id: number | null): UseQueryResult<Person, unknown> => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => fetchPerson(id!),
    enabled: id !== null,
  });
};

/**
 * Search for people by name
 * @param name - Search query
 * @returns Query result with search results
 */
export const usePeopleSearch = (name: string) => {
  return useQuery({
    queryKey: ['people', 'search', name],
    queryFn: () => searchPeople(name),
    enabled: name.length > 0,
  });
};
