/**
 * Custom hook for fetching films
 */

import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Film, ApiResponse } from '../types/swapi';
import { fetchFilm, fetchFilms, searchFilms } from '../api/fetchFilms';

/**
 * Fetch a film by ID
 * @param id - Film ID
 * @returns Query result with film data
 */
export const useFilm = (id: number | null): UseQueryResult<Film, unknown> => {
  return useQuery({
    queryKey: ['film', id],
    queryFn: () => fetchFilm(id!),
    enabled: id !== null,
  });
};

/**
 * Fetch all films
 * @param page - Page number
 * @returns Query result with paginated films
 */
export const useFilms = (page?: number): UseQueryResult<ApiResponse<Film>, unknown> => {
  return useQuery({
    queryKey: ['films', page],
    queryFn: () => fetchFilms(page),
  });
};

/**
 * Search for films by title
 * @param title - Search query
 * @returns Query result with search results
 */
export const useFilmsSearch = (title: string) => {
  return useQuery({
    queryKey: ['films', 'search', title],
    queryFn: () => searchFilms(title),
    enabled: title.length > 0,
  });
};
