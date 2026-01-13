/**
 * SWAPI People/Characters API
 */

import type { Person, ApiResponse } from '../types/swapi';
import { request, requestPaginated } from './client';

/**
 * Fetch a single person by ID
 * @param id - Person ID
 * @returns Person data
 */
export const fetchPerson = async (id: number): Promise<Person> => {
  return request<Person>(`/people/${id}/`);
};

/**
 * Fetch all people (paginated)
 * @param page - Page number (optional)
 * @returns Paginated person list
 */
export const fetchPeople = async (page?: number): Promise<ApiResponse<Person>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Person>(`/people/${params}`);
};

/**
 * Search people by name
 * @param name - Person name to search
 * @returns Paginated search results
 */
export const searchPeople = async (name: string): Promise<ApiResponse<Person>> => {
  return requestPaginated<Person>(`/people/?search=${encodeURIComponent(name)}`);
};
