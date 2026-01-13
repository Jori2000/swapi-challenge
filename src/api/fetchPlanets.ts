/**
 * SWAPI Planets API
 */

import { Planet, ApiResponse } from '../types/swapi';
import { request, requestPaginated } from './client';

/**
 * Fetch a single planet by ID
 * @param id - Planet ID
 * @returns Planet data
 */
export const fetchPlanet = async (id: number): Promise<Planet> => {
  return request<Planet>(`/planets/${id}/`);
};

/**
 * Fetch all planets (paginated)
 * @param page - Page number (optional)
 * @returns Paginated planet list
 */
export const fetchPlanets = async (page?: number): Promise<ApiResponse<Planet>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Planet>(`/planets/${params}`);
};

/**
 * Search planets by name
 * @param name - Planet name to search
 * @returns Paginated search results
 */
export const searchPlanets = async (name: string): Promise<ApiResponse<Planet>> => {
  return requestPaginated<Planet>(`/planets/?search=${encodeURIComponent(name)}`);
};
