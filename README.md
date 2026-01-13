# ⭐ SWAPI Challenge - Star Wars React App

Ein modernes React + TypeScript + Vite Projekt zur Erkundung der Star Wars API (SWAPI).

## Tech Stack

- React 19, TypeScript, Vite
- React Router 7 (Routing)
- React Query 5 (Server State & Caching)
- Axios (HTTP Client)
- ESLint + Prettier (Code Quality)

## Features

- ✅ **Infinite Scroll** - Automatisches Laden beim Scrollen
- ✅ **People List** - Alle Charaktere mit Suchfunktion
- ✅ **Person Details** - Charakter-Informationen mit Film-Links
- ✅ **Films List** - Alle Star Wars Filme sortiert
- ✅ **Film Details** - Opening Crawl, Regisseur, Statistiken
- ✅ **Error Handling** - Benutzerfreundliche Fehlermeldungen mit Retry
- ✅ **Loading States** - Spinner und Custom Text
- ✅ **Responsive Design** - Mobile-friendly CSS Grid
- ✅ **TypeScript Strict Mode** - 100% Type-Safe
- ✅ **JSDoc Documentation** - Alle Funktionen dokumentiert

## Quick Start

```bash
# Setup
npm install
cp .env.example .env

# Development
npm run dev          # http://localhost:5173/

# Code Quality
npm run lint         # Check issues
npm run lint:fix     # Auto-fix
npm run format       # Format code

# Build
npm run build        # Production build
npm run preview      # Preview build
```

## Struktur

```
src/
├── api/           # SWAPI API Integration
├── hooks/         # Custom React Query Hooks
├── types/         # TypeScript Interfaces
├── components/    # Reusable Components
├── pages/         # Page Components (Routes)
├── router/        # Routing Setup
├── constants/     # Centralized Config
└── App.tsx        # Root Component
```

## Routes

- `/` - Home
- `/people` - Character List (mit infinite scroll)
- `/people/:id` - Character Details
- `/films` - Film List
- `/films/:id` - Film Details

## API Integration

```typescript
import { useInfinitePeople, usePerson, usePeopleSearch } from '@/hooks';

// Infinite Scroll
const { data, hasNextPage, fetchNextPage } = useInfinitePeople();

// Single Character
const { data: person } = usePerson('1');

// Search
const { data: results } = usePeopleSearch('luke');
```

## Code Quality

- **TypeScript Strict Mode** - Keine `any` Types
- **ESLint** - React/Hooks Best Practices
- **Prettier** - Auto-formatting (100 char width)
- **No Console Logs** - Nur dev-only Error Interceptor
- **JSDoc** - Alle Functions dokumentiert

## Caching & Performance

- **Aggressive Caching** - `staleTime: Infinity`
- **24h Garbage Collection** - Cached data held for 24 hours
- **Query Deduplication** - React Query dedupliziert Requests
- **10s Timeout** - Network request timeout

## Entwicklung mit GitHub Copilot

Dieses Projekt wurde mit GitHub Copilot entwickelt für:
- Code Generation & Scaffolding
- Code Quality Improvements
- Feature Implementation
- Debugging & Problem Solving

## Performance

- **Build Time**: ~600ms
- **JavaScript**: 367KB (gzipped: 119KB)
- **CSS**: 10KB (gzipped: 2.45KB)
- **Modules**: 177 transformed
