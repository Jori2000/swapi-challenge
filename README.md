# ⭐ SWAPI Challenge - Star Wars React App

A modern React + TypeScript + Vite project for exploring the Star Wars API (SWAPI).

## Tech Stack

- React 19, TypeScript, Vite
- React Router 7 (Routing)
- React Query 5 (Server State & Caching)
- Axios (HTTP Client)
- ESLint + Prettier (Code Quality)

## Features

- ✅ **Infinite Scroll** - Auto-load when scrolling
- ✅ **People List** - All characters with search functionality
- ✅ **Person Details** - Character information with film links
- ✅ **Films List** - All Star Wars films sorted
- ✅ **Film Details** - Opening Crawl, director, statistics
- ✅ **Error Handling** - User-friendly error messages with retry
- ✅ **Loading States** - Spinner and custom text
- ✅ **Responsive Design** - Mobile-friendly CSS Grid
- ✅ **TypeScript Strict Mode** - 100% Type-Safe
- ✅ **JSDoc Documentation** - All functions documented

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

## Project Structure

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
- `/people` - Character List (with infinite scroll)
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

- **TypeScript Strict Mode** - No `any` types
- **ESLint** - React/Hooks Best Practices
- **Prettier** - Auto-formatting (100 char width)
- **No Console Logs** - Only dev-only error interceptor
- **JSDoc** - All functions documented

## Caching & Performance

- **Aggressive Caching** - `staleTime: Infinity`
- **24h Garbage Collection** - Cached data held for 24 hours
- **Query Deduplication** - React Query deduplicates requests
- **10s Timeout** - Network request timeout

## Development with GitHub Copilot

This project was developed with GitHub Copilot for:
- Code Generation & Scaffolding
- Code Quality Improvements
- Feature Implementation
- Debugging & Problem Solving

## Assumptions & Design Decisions

### What I would add with more time:

- [ ] Tests (Jest, React Testing Library)
- [ ] More resources (Planets, Starships)
- [ ] Favorites feature
- [ ] Fetch film titles on Person Detail page (currently only IDs)
- [ ] Further optimize responsive design
- [ ] ARIA-Labels & Keyboard Navigation (Accessibility)
- [ ] Service Worker for offline support
- [ ] Star Wars themed UI!

### Conscious decisions:

- **Minimal styling** - Focus on functionality
- **No over-engineering** - Redux would be overkill for this app
- **Pragmatic film references** - Show IDs instead of extra requests
- **Infinite Scroll instead of pagination** - Better UX for large datasets
- **React Query for server state** - Simple caching & deduplication

## Known Limitations

- Only People & Films implemented (Planets/Starships are analog)
- Film details on person page show only IDs (could fetch titles)
- No offline support (would require Service Worker)
- No unit/integration tests (would require time)
- Minimal responsive (focused on desktop)

## Time Breakdown

- Setup & Configuration: ~45min
- Core Features (People): ~2h
- Films Feature: ~1h
- Search & Polish: ~1h
- Documentation & README: ~30min
- **Total**: ~5-5.5h

## Performance

- **Build Time**: ~600ms
- **JavaScript**: 367KB (gzipped: 119KB)
- **CSS**: 10KB (gzipped: 2.45KB)
- **Modules**: 177 transformed

