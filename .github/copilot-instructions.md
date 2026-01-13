# SWAPI Challenge - AI Coding Agent Instructions

## Project Overview
A React + TypeScript + Vite application for interacting with the Star Wars API (SWAPI). The project uses strict TypeScript configuration, modular architecture, and follows modern React patterns.

## Architecture

### Directory Structure
- **`src/api/`** - API client layer for SWAPI integration (fetch, error handling)
- **`src/types/`** - TypeScript interfaces and type definitions (extend as needed)
- **`src/components/`** - Reusable React components (functional components with hooks)
- **`src/pages/`** - Page-level components (main views/routes)
- **`src/hooks/`** - Custom React hooks (data fetching, state management)
- **`src/router/`** - Routing configuration (React Router setup)
- **`src/assets/`** - Static images and media files
- **`src/main.tsx`** - Application entry point
- **`src/App.tsx`** - Root component (clean, minimal)

### TypeScript Configuration
- **Strict Mode**: Enabled (`"strict": true`) - all type checking enabled
- **Unused Variables/Parameters**: Errors on unused code
- **No Fallthroughs in Switch**: Required
- **Target**: ES2022 with ESNext modules
- **JSX**: react-jsx (automatic runtime)

## Development Workflow

### Setup & Dependencies
```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (http://localhost:5173/)
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run lint         # Run ESLint checks
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Code Quality & Formatting
- **ESLint** (`.eslintrc.json`): Catches bugs, enforces best practices, React/TypeScript rules
- **Prettier** (`.prettierrc.json`): Auto-formats code (100-char line width, 2-space indents)
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- Run `npm run lint:fix` and `npm run format` before committing
- IDE Extensions recommended: ESLint + Prettier (auto-format on save)

## Coding Conventions

### Component Structure
- Functional components with hooks only
- Use `React.FC` or arrow functions for typing
- Example:
  ```tsx
  export const UserCard: React.FC<{ id: string }> = ({ id }) => {
    const [user, setUser] = useState(null);
    return <div>{user?.name}</div>;
  };
  ```

### API Integration Pattern
- Use high-level API functions from `src/api/swapi.ts` in components
- Always type API responses using interfaces from `src/types/`
- Handle errors explicitly with `handleApiError()` utility
- Base client in `src/api/client.ts` provides:
  - Axios instance with 10-second timeout
  - Error interceptor for logging (dev mode)
  - Generic `request<T>()` and `requestPaginated<T>()` helpers
  - `handleApiError()` for user-friendly error messages

**High-level API functions** (`src/api/swapi.ts`):
- `getPeople(page?)` - Get paginated people
- `getPerson(id)` - Get single person
- `getFilms()` - Get all films
- `getFilm(id)` - Get single film
- `getPlanets(page?)` - Get paginated planets
- `getPlanet(id)` - Get single planet
- `searchPeople(query)`, `searchFilms(query)`, `searchPlanets(query)` - Search functions
- `extractIdFromUrl(url)` - Helper to extract numeric ID from SWAPI URLs

**Example usage**:
```typescript
import { getPerson, searchFilms, handleApiError } from '../api';

try {
  const luke = await getPerson('1');
  const films = await searchFilms('empire');
} catch (error) {
  const msg = handleApiError(error); // User-friendly message
}
```

### Custom Hooks Pattern
- Extract data fetching into hooks in `src/hooks/`
- Use React Query for server state: `useQuery({ queryKey, queryFn })`
- Naming: `usePerson()`, `useFilms()`, `usePlanetsSearch()`
- Always return `UseQueryResult<T, unknown>` for consistency
- Example: `usePerson(id)` enables/disables query based on id validity

**Existing hooks**:
- `src/hooks/usePerson.ts` - Single person & search
- `src/hooks/useFilm.ts` - Single film, all films, search
- `src/hooks/usePlanet.ts` - Single planet, all planets, search

### Type Definitions
- All API responses typed in `src/types/swapi.ts`
- Interfaces: `Person`, `Film`, `Planet`, `ApiResponse<T>`, `ApiError`
- Generic `ApiResponse<T>` for paginated results with `count`, `next`, `previous`, `results`
- Use explicit return types in all functions (no `any`)
- All SWAPI fields are `string` except: `episode_id` (number), arrays for relations

## Critical Patterns

### Error Handling
- Use `handleApiError()` from `src/api/client.ts` for Axios errors
- Returns user-friendly error messages (never throws)
- Handles: server errors (status), network errors, timeouts
- Example: `catch (error) { const msg = handleApiError(error); console.error(msg); }`
- Interceptor logs all errors to console in dev mode

### State Management
- **Server state** (API data): React Query (`useQuery`)
- **UI state** (form, modals): React hooks (`useState`)
- Query caching & deduplication handled by React Query automatically
- Disable queries with `enabled: false` when dependencies not ready

### Routing
- Configure routes in `src/router/` (React Router)
- Page components in `src/pages/` should be lazy-loaded when possible
- Type route params in TypeScript

## Dependencies
- **react** & **react-dom** - UI framework
- **react-router-dom** - Client-side routing
- **@tanstack/react-query** - Server state management and caching
- **axios** - HTTP client for API requests
- **vite** - Build tool and dev server
- **typescript** - Type safety

### Using React Router
```tsx
// src/router/routes.tsx
import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/character/:id', element: <CharacterPage /> },
])
```

### Using React Query
```tsx
import { useQuery } from '@tanstack/react-query'
import { fetchCharacter } from '../api/swapi'

export const useCharacter = (id: string) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
  })
}
```

### Using Axios
```tsx
// src/api/swapi.ts
import axios from 'axios'

const baseURL = import.meta.env.VITE_SWAPI_BASE_URL

const swapiClient = axios.create({ baseURL })

export const fetchCharacter = async (id: string) => {
  const { data } = await swapiClient.get(`/people/${id}/`)
  return data
}
```

## Environment Variables
- **Configuration**: `.env` file at project root (add to `.gitignore`)
- **Example file**: `.env.example` with template values
- **Access in code**: `import.meta.env.VITE_SWAPI_BASE_URL`
- **Prefix requirement**: All Vite env vars must start with `VITE_`
- **Type safety**: See `src/vite-env.d.ts` for env var types


## Common Tasks

### Adding a New Page
1. Create component in `src/pages/PageName.tsx`
2. Define route in `src/router/`
3. Ensure TypeScript strict checks pass
4. Test in dev server

### Fetching SWAPI Data
1. Create typed interface in `src/types/swapi.ts`
2. Create fetch function in `src/api/swapi.ts`
3. Use custom hook in `src/hooks/useSwapi*.ts`
4. Consume in component with proper error/loading states

### Adding a Component
1. Create in `src/components/ComponentName.tsx`
2. Define clear prop types with `React.FC<Props>`
3. Export as named export
4. Keep components small and focused

## Environment & Build
- **Dev**: Instant HMR reload on save (http://localhost:5173/)
- **Production**: `npm run build` creates optimized dist/ folder
- **Environment variables**: Define in `.env` (copy from `.env.example`)
- **Type-safe env access**: `import.meta.env.VITE_*` with type hints in `vite-env.d.ts`
- **TypeScript checks**: Run during build and in IDE

## Debugging
- Browser DevTools with React DevTools extension
- TypeScript errors in IDE and terminal before runtime
- Vite dev server shows clear error overlays
- No console errors should be ignored (strict mode)
