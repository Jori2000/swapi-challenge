/**
 * SWAPI API Functions
 * High-level API functions for accessing Star Wars data
 * All functions handle errors and return typed data from SWAPI
 */

import { request, requestPaginated } from './client';
import type { Person, Film, Planet, ApiResponse } from '../types/swapi';

/**
 * Extract numeric ID from SWAPI URL
 *
 * SWAPI returns resource URLs instead of just IDs. This helper extracts
 * the numeric ID from a full URL using regex matching the trailing ID pattern.
 *
 * @param url - Full SWAPI resource URL (e.g., "https://swapi.py4e.com/api/people/1/")
 * @returns Numeric ID as string (e.g., "1")
 * @throws Error if URL format is invalid or doesn't contain a numeric ID
 *
 * @example
 *   extractIdFromUrl("https://swapi.py4e.com/api/people/5/")  // returns "5"
 *   extractIdFromUrl("https://swapi.py4e.com/api/films/1/")   // returns "1"
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
 *
 * Fetches paginated list of Star Wars characters from SWAPI.
 * SWAPI limits results to 10 per page by default.
 *
 * @param page - Page number for pagination (optional, default: 1)
 * @returns Promise resolving to paginated response with Person objects
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const page1 = await getPeople();        // First page
 *   const page2 = await getPeople(2);       // Second page
 */
export const getPeople = async (page?: number): Promise<ApiResponse<Person>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Person>(`/people/${params}`);
};

/**
 * Get a single person by ID
 *
 * Fetches detailed information about a single character.
 * Includes related data like films, species, vehicles, and starships.
 *
 * @param id - Person ID as string
 * @returns Promise resolving to Person object
 * @throws Error if person not found (404) or request fails
 *
 * @example
 *   const luke = await getPerson("1");      // Fetch Luke Skywalker
 *   console.log(luke.name);                 // "Luke Skywalker"
 */
export const getPerson = async (id: string): Promise<Person> => {
  return request<Person>(`/people/${id}/`);
};

/**
 * Get all films
 *
 * Fetches list of all Star Wars films in the SWAPI database.
 * Usually returns all 7 films in a single page (no pagination needed).
 *
 * @returns Promise resolving to paginated response with Film objects
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const allFilms = await getFilms();
 *   console.log(allFilms.results.length);   // 7 (or current count)
 */
export const getFilms = async (): Promise<ApiResponse<Film>> => {
  return requestPaginated<Film>('/films/');
};

/**
 * Get a single film by ID
 *
 * Fetches detailed information about a single Star Wars film.
 * Includes opening crawl, director, producer, and related resources.
 *
 * @param id - Film ID as string
 * @returns Promise resolving to Film object
 * @throws Error if film not found (404) or request fails
 *
 * @example
 *   const newHope = await getFilm("1");     // Fetch "A New Hope"
 *   console.log(newHope.opening_crawl);     // Film opening text
 */
export const getFilm = async (id: string): Promise<Film> => {
  return request<Film>(`/films/${id}/`);
};

/**
 * Get all planets with optional pagination
 *
 * Fetches paginated list of planets in the Star Wars universe.
 * SWAPI limits results to 10 per page by default.
 *
 * @param page - Page number for pagination (optional, default: 1)
 * @returns Promise resolving to paginated response with Planet objects
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const page1 = await getPlanets();       // First page
 *   const page2 = await getPlanets(2);      // Second page
 */
export const getPlanets = async (page?: number): Promise<ApiResponse<Planet>> => {
  const params = page ? `?page=${page}` : '';
  return requestPaginated<Planet>(`/planets/${params}`);
};

/**
 * Get a single planet by ID
 *
 * Fetches detailed information about a single planet.
 * Includes climate, terrain, population, and related resources.
 *
 * @param id - Planet ID as string
 * @returns Promise resolving to Planet object
 * @throws Error if planet not found (404) or request fails
 *
 * @example
 *   const tatooine = await getPlanet("1");  // Fetch Tatooine
 *   console.log(tatooine.climate);          // "arid"
 */
export const getPlanet = async (id: string): Promise<Planet> => {
  return request<Planet>(`/planets/${id}/`);
};

/**
 * Search people by name
 *
 * Searches the SWAPI database for people matching the search query.
 * Returns paginated results with all matching characters.
 *
 * @param query - Search query string (e.g., "luke", "skywalker")
 * @returns Promise resolving to paginated search results
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const results = await searchPeople("luke");
 *   console.log(results.results[0].name);   // "Luke Skywalker"
 */
export const searchPeople = async (query: string): Promise<ApiResponse<Person>> => {
  return requestPaginated<Person>(`/people/?search=${encodeURIComponent(query)}`);
};

/**
 * Search films by title
 *
 * Searches the SWAPI database for films matching the search query.
 * Returns paginated results with all matching films.
 *
 * @param query - Search query string (e.g., "empire", "jedi")
 * @returns Promise resolving to paginated search results
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const results = await searchFilms("empire");
 *   console.log(results.results[0].title); // "The Empire Strikes Back"
 */
export const searchFilms = async (query: string): Promise<ApiResponse<Film>> => {
  return requestPaginated<Film>(`/films/?search=${encodeURIComponent(query)}`);
};

/**
 * Search planets by name
 *
 * Searches the SWAPI database for planets matching the search query.
 * Returns paginated results with all matching planets.
 *
 * @param query - Search query string (e.g., "tatooine", "dagobah")
 * @returns Promise resolving to paginated search results
 * @throws Error from API request if fetch fails
 *
 * @example
 *   const results = await searchPlanets("tatooine");
 *   console.log(results.results[0].name);  // "Tatooine"
 */
export const searchPlanets = async (query: string): Promise<ApiResponse<Planet>> => {
  return requestPaginated<Planet>(`/planets/?search=${encodeURIComponent(query)}`);
};
