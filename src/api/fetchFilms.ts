/**
 * SWAPI Films API
 */

import type { Film, ApiResponse } from '../types/swapi';
import { request, requestPaginated } from './client';

/**
 * Fetch a single film by ID
 * @param id - Film ID
 * @returns Film data
 */
export const fetchFilm = async (id: number): Promise<Film> => {
  return request<Film>(`/films/${id}/`);
};

/**
 * Fetch all films (paginated)
 * @param page - Page number (optional)
 * @returns Paginated film list
 */
export const fetchFilms = async (page?: number): Promise<ApiResponse<Film>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Film>(`/films/${params}`);
};

/**
 * Search films by title
 * @param title - Film title to search
 * @returns Paginated search results
 */
export const searchFilms = async (title: string): Promise<ApiResponse<Film>> => {
  return requestPaginated<Film>(`/films/?search=${encodeURIComponent(title)}`);
};
