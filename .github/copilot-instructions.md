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
npm run lint         # Run TypeScript checks
```

### Key Commands
- Dev server watches for changes - no restart needed
- TypeScript errors appear in both terminal and IDE
- Build optimizes with Rollup

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
- Create typed client functions in `src/api/` (e.g., `fetchPeople.ts`)
- Always type API responses using interfaces from `src/types/`
- Handle errors explicitly (no silent failures)
- Example structure: `src/api/swapi.ts` for base SWAPI client

### Custom Hooks Pattern
- Extract reusable logic into hooks in `src/hooks/`
- Naming: `useFetch*`, `use*State`, `use*Data`
- Always return typed data
- Example: `useCharacter(id: string)` returns `{ data, loading, error }`

### Type Definitions
- All API responses must have interfaces in `src/types/`
- Use explicit return types for functions
- Avoid `any` type - TypeScript strict mode will catch this
- Export types for reuse: `export interface Character { ... }`

## Critical Patterns

### Error Handling
- API calls should catch and handle errors explicitly
- No unhandled promise rejections
- Return error state in hooks: `{ error: string | null }`

### State Management
- Use React hooks (useState, useContext) for local state
- Custom hooks for complex data fetching logic
- Pass props down, lift state up when needed

### Routing
- Configure routes in `src/router/` (React Router)
- Page components in `src/pages/` should be lazy-loaded when possible
- Type route params in TypeScript

## Dependencies
- **react** & **react-dom** - UI framework
- **vite** - Build tool and dev server
- **typescript** - Type safety
- Add routing with: `npm install react-router-dom`
- Add HTTP client: `npm install axios` or use `fetch`

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
- **Dev**: Instant HMR reload on save
- **Production**: `npm run build` creates optimized dist/ folder
- Environment variables: Use `.env` file (add to `.gitignore`)
- TypeScript checks run during build

## Debugging
- Browser DevTools with React DevTools extension
- TypeScript errors in IDE and terminal before runtime
- Vite dev server shows clear error overlays
- No console errors should be ignored (strict mode)
