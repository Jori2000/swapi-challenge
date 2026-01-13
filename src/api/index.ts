/**
 * SWAPI API Exports
 * Barrel export for all API functions
 */

export { swapiClient, handleApiError, request, requestPaginated } from './client';
export { fetchPerson, fetchPeople, searchPeople } from './fetchPeople';
export { fetchFilm, fetchFilms, searchFilms } from './fetchFilms';
export { fetchPlanet, fetchPlanets, searchPlanets } from './fetchPlanets';
