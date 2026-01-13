# SWAPI API Integration - Usage Examples

## Überblick der Struktur

```
src/
├── types/swapi.ts          # TypeScript Interfaces (Person, Film, Planet, ApiResponse, ApiError)
├── api/
│   ├── client.ts           # Base Axios client + error handling
│   ├── fetchPeople.ts      # Character/People endpoints
│   ├── fetchFilms.ts       # Films endpoints
│   ├── fetchPlanets.ts     # Planets endpoints
│   └── index.ts            # Barrel export
└── hooks/
    ├── usePerson.ts        # usePerson, usePeopleSearch
    ├── useFilm.ts          # useFilm, useFilms, useFilmsSearch
    ├── usePlanet.ts        # usePlanet, usePlanets, usePlanetsSearch
    └── index.ts            # Barrel export
```

## Type-Sichere API-Calls

Alle SWAPI-Ressourcen sind in `src/types/swapi.ts` definiert:

```typescript
// Person
export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  // ... mehr Felder
  films: string[];        // URLs
  url: string;
}

// Film
export interface Film {
  title: string;
  episode_id: number;     // Einziges Zahlenfeld!
  opening_crawl: string;
  characters: string[];   // URLs
  // ...
}

// Planet
export interface Planet {
  name: string;
  rotation_period: string;
  residents: string[];    // URLs
  // ...
}

// Generischer Wrapper für Paginated Responses
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

## API Client Grundlagen

### Base Client (`src/api/client.ts`)

```typescript
import { swapiClient, request, requestPaginated, handleApiError } from '../api';

// 1. Einzelne Resource abrufen (type-safe)
const person = await request<Person>('/people/1/');

// 2. Paginated Results abrufen
const response = await requestPaginated<Person>('/people/');
console.log(response.results);  // Person[]
console.log(response.count);     // total count
console.log(response.next);      // next page URL or null

// 3. Fehlerbehandlung
try {
  await request<Person>('/people/999/');
} catch (error) {
  const message = handleApiError(error);
  console.error(message); // Benutzerfreundliche Meldung
}
```

## Fetch-Funktionen verwenden

### People API (`src/api/fetchPeople.ts`)

```typescript
import { fetchPerson, fetchPeople, searchPeople } from '../api';

// Einzelne Person abrufen
const luke = await fetchPerson(1);
console.log(luke.name);  // "Luke Skywalker"

// Alle Personen (mit Pagination)
const page1 = await fetchPeople();
const page2 = await fetchPeople(2);

// Suche nach Name
const results = await searchPeople('luke');
console.log(results.results);  // Person[]
```

### Films API (`src/api/fetchFilms.ts`)

```typescript
import { fetchFilm, fetchFilms, searchFilms } from '../api';

// Einzelner Film
const film = await fetchFilm(1);  // "A New Hope"

// Alle Filme
const allFilms = await fetchFilms();

// Suche
const searched = await searchFilms('empire');
```

### Planets API (`src/api/fetchPlanets.ts`)

```typescript
import { fetchPlanet, fetchPlanets, searchPlanets } from '../api';

// Einzelner Planet
const tatooine = await fetchPlanet(1);

// Alle Planeten
const allPlanets = await fetchPlanets();

// Suche
const searched = await searchPlanets('tatooine');
```

## React Query Custom Hooks (empfohlen)

Custom Hooks handhaben `loading`, `error`, `caching` automatisch:

### usePerson Hook

```typescript
import { usePerson, usePeopleSearch } from '../hooks';

export const CharacterPage: React.FC<{ id: number }> = ({ id }) => {
  // Einzelne Person abrufen (nur wenn id vorhanden)
  const { data: person, isLoading, error } = usePerson(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!person) return <div>Not found</div>;

  return <div>{person.name}</div>;
};

// Suche
export const SearchPeople: React.FC<{ query: string }> = ({ query }) => {
  const { data: results, isLoading } = usePeopleSearch(query);

  return (
    <div>
      {results?.results.map((person) => (
        <div key={person.url}>{person.name}</div>
      ))}
    </div>
  );
};
```

### useFilm Hook

```typescript
import { useFilm, useFilms, useFilmsSearch } from '../hooks';

// Einzelner Film
const { data: film } = useFilm(1);

// Alle Filme
const { data: filmPage } = useFilms();

// Suche
const { data: searchResults } = useFilmsSearch('skywalker');
```

### usePlanet Hook

```typescript
import { usePlanet, usePlanets, usePlanetsSearch } from '../hooks';

// Einzelner Planet
const { data: planet } = usePlanet(1);

// Alle Planeten (Pagination)
const { data: planetPage } = usePlanets(1);

// Suche
const { data: results } = usePlanetsSearch('dagobah');
```

## Vollständiges Beispiel: Character-Detail Component

```typescript
import React from 'react';
import { usePerson, useFilmsSearch } from '../hooks';
import { Person, Film } from '../types/swapi';

interface CharacterDetailProps {
  personId: number;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  personId,
}) => {
  const {
    data: person,
    isLoading: isLoadingPerson,
    error: personError,
  } = usePerson(personId);

  // Films dieser Person abrufen (würde URL-Parsing brauchen in echter App)
  const {
    data: filmResults,
    isLoading: isLoadingFilms,
  } = useFilmsSearch(person?.name || '');

  if (isLoadingPerson) return <div>Loading character...</div>;
  if (personError) return <div>Error loading character</div>;
  if (!person) return <div>Character not found</div>;

  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}cm</p>
      <p>Mass: {person.mass}kg</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>

      <h2>Films</h2>
      {isLoadingFilms ? (
        <p>Loading films...</p>
      ) : (
        <ul>
          {filmResults?.results.map((film: Film) => (
            <li key={film.url}>{film.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## Fehlerbehandlung Best Practices

```typescript
import { handleApiError } from '../api';

async function myFunction() {
  try {
    const data = await fetchPerson(123);
    // ...
  } catch (error) {
    // handleApiError gibt benutzerfreundliche Meldung zurück
    const message = handleApiError(error);
    console.error(message);

    // In Components mit React Query:
    // Der error wird automatisch im Hook zurückgegeben
  }
}
```

## Wichtige Hinweise

1. **Type Safety**: Alle SWAPI-Fields sind `string` außer `episode_id` (Film)
2. **Array-Felder**: `films`, `characters`, `residents`, etc. sind **URLs** als `string[]`, nicht IDs
3. **Pagination**: `ApiResponse<T>` hat `next`/`previous` URLs zum Navigieren
4. **React Query Caching**: Automatische Deduplication & Caching (konfigurierbar)
5. **Error Messages**: `handleApiError()` gibt immer Strings zurück (keine Exceptions werfen)

## Weitere Ressourcen

- [SWAPI API Dokumentation](https://swapi.dev/)
- [React Query Dokumentation](https://tanstack.com/query/latest)
- [Axios Dokumentation](https://axios-http.com/)
