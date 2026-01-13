/**
 * SWAPI API Usage Examples
 * Demonstrates how to use the API functions
 */

// ==============================================================================
// IMPORTING API FUNCTIONS
// ==============================================================================

import {
  getPeople,
  getPerson,
  getFilms,
  getFilm,
  getPlanets,
  getPlanet,
  searchPeople,
  searchFilms,
  searchPlanets,
  extractIdFromUrl,
  handleApiError,
} from '../src/api';
import type { Person, Film, Planet, ApiResponse } from '../src/types/swapi';

// ==============================================================================
// PEOPLE/CHARACTERS EXAMPLES
// ==============================================================================

/**
 * Get all people (first page)
 */
export async function getAllPeople(): Promise<ApiResponse<Person>> {
  try {
    const people = await getPeople();
    console.log(`Found ${people.count} total people`);
    console.log(`Page 1 has ${people.results.length} results`);
    console.log(`Next page URL: ${people.next}`);
    return people;
  } catch (error) {
    const message = handleApiError(error);
    console.error('Failed to fetch people:', message);
    throw error;
  }
}

/**
 * Get people with pagination
 */
export async function getPeoplePage(pageNumber: number): Promise<ApiResponse<Person>> {
  try {
    const people = await getPeople(pageNumber);
    return people;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to fetch people page ${pageNumber}:`, message);
    throw error;
  }
}

/**
 * Get a single person by ID
 */
export async function getCharacterById(personId: string): Promise<Person | null> {
  try {
    const person = await getPerson(personId);
    console.log(`Found person: ${person.name}`);
    return person;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to fetch person ${personId}:`, message);
    return null;
  }
}

/**
 * Search for people
 */
export async function findPeople(searchTerm: string): Promise<Person[] | null> {
  try {
    const results = await searchPeople(searchTerm);
    console.log(`Found ${results.results.length} people matching "${searchTerm}"`);
    return results.results;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to search people for "${searchTerm}":`, message);
    return null;
  }
}

// ==============================================================================
// FILMS EXAMPLES
// ==============================================================================

/**
 * Get all films
 */
export async function getAllFilms(): Promise<ApiResponse<Film>> {
  try {
    const films = await getFilms();
    console.log(`Found ${films.count} films`);
    return films;
  } catch (error) {
    const message = handleApiError(error);
    console.error('Failed to fetch films:', message);
    throw error;
  }
}

/**
 * Get a single film by ID
 */
export async function getFilmById(filmId: string): Promise<Film | null> {
  try {
    const film = await getFilm(filmId);
    console.log(`Found film: ${film.title}`);
    return film;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to fetch film ${filmId}:`, message);
    return null;
  }
}

/**
 * Search for films
 */
export async function findFilms(searchTerm: string): Promise<Film[] | null> {
  try {
    const results = await searchFilms(searchTerm);
    console.log(`Found ${results.results.length} films matching "${searchTerm}"`);
    return results.results;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to search films for "${searchTerm}":`, message);
    return null;
  }
}

// ==============================================================================
// PLANETS EXAMPLES
// ==============================================================================

/**
 * Get all planets
 */
export async function getAllPlanets(): Promise<ApiResponse<Planet>> {
  try {
    const planets = await getPlanets();
    console.log(`Found ${planets.count} total planets`);
    return planets;
  } catch (error) {
    const message = handleApiError(error);
    console.error('Failed to fetch planets:', message);
    throw error;
  }
}

/**
 * Get a single planet by ID
 */
export async function getPlanetById(planetId: string): Promise<Planet | null> {
  try {
    const planet = await getPlanet(planetId);
    console.log(`Found planet: ${planet.name}`);
    return planet;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to fetch planet ${planetId}:`, message);
    return null;
  }
}

/**
 * Search for planets
 */
export async function findPlanets(searchTerm: string): Promise<Planet[] | null> {
  try {
    const results = await searchPlanets(searchTerm);
    console.log(`Found ${results.results.length} planets matching "${searchTerm}"`);
    return results.results;
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to search planets for "${searchTerm}":`, message);
    return null;
  }
}

// ==============================================================================
// HELPER FUNCTION EXAMPLES
// ==============================================================================

/**
 * Extract ID from SWAPI URL
 */
export function demonstrateUrlExtraction(): void {
  const exampleUrls = [
    'https://swapi.dev/api/people/1/',
    'https://swapi.dev/api/films/5/',
    'https://swapi.dev/api/planets/42/',
  ];

  exampleUrls.forEach((url) => {
    try {
      const id = extractIdFromUrl(url);
      console.log(`URL: ${url} -> ID: ${id}`);
    } catch (error) {
      const message = handleApiError(error);
      console.error(`Failed to extract ID from ${url}:`, message);
    }
  });
}

// ==============================================================================
// COMPLEX EXAMPLE: Get Person + Their Films
// ==============================================================================

/**
 * Get a person and their films
 * Demonstrates combining multiple API calls
 */
export async function getPersonWithFilms(
  personId: string
): Promise<{ person: Person; films: Film[] } | null> {
  try {
    // Get the person
    const person = await getPerson(personId);

    // Get all films to match
    const allFilms = await getFilms();

    // Find films this person appeared in
    const personFilmUrls = new Set(person.films);
    const personFilms = allFilms.results.filter((film) => personFilmUrls.has(film.url));

    console.log(`${person.name} appeared in ${personFilms.length} films`);

    return { person, films: personFilms };
  } catch (error) {
    const message = handleApiError(error);
    console.error(`Failed to get person ${personId} with films:`, message);
    return null;
  }
}
