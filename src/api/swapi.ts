/**
 * SWAPI API Functions
 * High-level API functions for accessing Star Wars data
 */

import { request, requestPaginated } from './client';
import type { Person, Film, Planet, ApiResponse } from '../types/swapi';

/**
 * Extract numeric ID from SWAPI URL
 * @param url - Full SWAPI resource URL (e.g., "https://swapi.dev/api/people/1/")
 * @returns Numeric ID as string (e.g., "1")
 * @example
 *   extractIdFromUrl("https://swapi.dev/api/people/5/") // "5"
 */
export const extractIdFromUrl = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  if (!match || !match[1]) {
    throw new Error(`Invalid SWAPI URL format: ${url}`);
  }
  return match[1];
};

/**
 * Get all people with optional pagination
 * @param page - Page number (optional, default: 1)
 * @returns Paginated list of people
 * @example
 *   const people = await getPeople();
 *   const page2 = await getPeople(2);
 */
export const getPeople = async (page?: number): Promise<ApiResponse<Person>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Person>(`/people/${params}`);
};

/**
 * Get a single person by ID
 * @param id - Person ID
 * @returns Person object
 * @throws Error if person not found
 * @example
 *   const luke = await getPerson("1");
 */
export const getPerson = async (id: string): Promise<Person> => {
  return request<Person>(`/people/${id}/`);
};

/**
 * Get all films
 * @returns List of all films (SWAPI returns paginated, but usually fits in one page)
 * @example
 *   const films = await getFilms();
 */
export const getFilms = async (): Promise<ApiResponse<Film>> => {
  return requestPaginated<Film>('/films/');
};

/**
 * Get a single film by ID
 * @param id - Film ID
 * @returns Film object
 * @throws Error if film not found
 * @example
 *   const newHope = await getFilm("1");
 */
export const getFilm = async (id: string): Promise<Film> => {
  return request<Film>(`/films/${id}/`);
};

/**
 * Get all planets
 * @param page - Page number (optional, default: 1)
 * @returns Paginated list of planets
 * @example
 *   const planets = await getPlanets();
 */
export const getPlanets = async (page?: number): Promise<ApiResponse<Planet>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Planet>(`/planets/${params}`);
};

/**
 * Get a single planet by ID
 * @param id - Planet ID
 * @returns Planet object
 * @throws Error if planet not found
 * @example
 *   const tatooine = await getPlanet("1");
 */
export const getPlanet = async (id: string): Promise<Planet> => {
  return request<Planet>(`/planets/${id}/`);
};

/**
 * Search people by name
 * @param query - Search query string
 * @returns Paginated search results
 * @example
 *   const results = await searchPeople("luke");
 */
export const searchPeople = async (query: string): Promise<ApiResponse<Person>> => {
  return requestPaginated<Person>(`/people/?search=${encodeURIComponent(query)}`);
};

/**
 * Search films by title
 * @param query - Search query string
 * @returns Paginated search results
 * @example
 *   const results = await searchFilms("empire");
 */
export const searchFilms = async (query: string): Promise<ApiResponse<Film>> => {
  return requestPaginated<Film>(`/films/?search=${encodeURIComponent(query)}`);
};

/**
 * Search planets by name
 * @param query - Search query string
 * @returns Paginated search results
 * @example
 *   const results = await searchPlanets("tatooine");
 */
export const searchPlanets = async (query: string): Promise<ApiResponse<Planet>> => {
  return requestPaginated<Planet>(`/planets/?search=${encodeURIComponent(query)}`);
};
