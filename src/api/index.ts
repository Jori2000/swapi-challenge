/**
 * SWAPI API Exports
 * Barrel export for all API functions
 */

export { swapiClient, handleApiError, request, requestPaginated } from './client';
export {
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
} from './swapi';
export { fetchPerson, fetchPeople } from './fetchPeople';
export { fetchFilm } from './fetchFilms';
export { fetchPlanet } from './fetchPlanets';
