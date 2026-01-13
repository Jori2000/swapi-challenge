# ⭐ SWAPI Challenge - Star Wars React App

Ein modernes React + TypeScript + Vite Projekt zur Erkundung der Star Wars API (SWAPI). Die Anwendung demonstriert Best Practices in modernem React-Development mit strikter Typensicherheit, professionellem State Management und hochwertigem Code Quality.

---

## 🚀 Tech Stack

| Technologie | Version | Zweck |
|---|---|---|
| **React** | 19.2.0 | UI-Framework mit Hooks |
| **TypeScript** | 5.9.3 | Strikte Typensicherheit (strict mode) |
| **Vite** | 7.2.4 | Lightning-fast dev server & build tool |
| **React Router** | 7.12.0 | Client-side routing (SPA) |
| **React Query** | 5.90.16 | Server state management & caching |
| **Axios** | 1.13.2 | HTTP client mit Custom Interceptors |
| **ESLint** | 9.39.2 | Code quality & best practices |
| **Prettier** | 3.7.4 | Automatic code formatting (100 char width) |

---

## ✨ Features

### 🎯 Implementierte Funktionalität

#### **📋 Charaktere (People)**
- ✅ **Paginierte Liste** - Alle 82+ Charaktere mit Pagination
- ✅ **Suchfunktion** - Echtzeit-Suche nach Charakternamen
- ✅ **Detailansicht** - Vollständige Charakterinformationen:
  - Name, Geburtsyear, Geschlecht
  - Größe, Gewicht, Haarfarbe, Augenfarbe
  - Zugehörige Filme als Links

#### **🎬 Filme (Films)**
- ✅ **Komplette Liste** - Alle 7 Star Wars Filme
- ✅ **Detailansicht** mit:
  - Opening Crawl (stilisiert mit Borders)
  - Episode Badge (Gold #ffd700)
  - Regisseur & Produzent
  - Statistiken (Charaktere, Planeten, Starships, Fahrzeuge)

#### **🔍 Suchfunktion**
- ✅ **People Search** - Echtzeit-Suche in der Charakterliste
- ✅ **Film Search** - Suche nach Filmtiteln
- ✅ **Planet Search** - (Infrastruktur vorbereitet)
- ✅ **Debounce-ready** - Optimiert für Bandbreite

#### **⚡ Fehlerbehandlung & UX**
- ✅ **Loading States** - Hourglass Emoji mit Custom Text
- ✅ **Error Messages** - Benutzerfreundliche Fehlermeldungen mit Retry-Button
- ✅ **Network Error Handling** - Timeouts, Connection Errors, Server Errors
- ✅ **Empty States** - "Keine Ergebnisse" Meldungen
- ✅ **Fallback Navigation** - Back-Buttons auf allen Detail-Seiten

#### **🎨 Design & UX**
- ✅ **Responsive Grid Layout** - Mobile-friendly mit CSS Grid
- ✅ **Dark Theme Navigation** - Sticky Header mit Star Wars Styling
- ✅ **Gold Accents** - #ffd700 für Hover/Active States
- ✅ **Smooth Animations** - Transitions & Hover Effects (200-600ms)
- ✅ **Accessibility** - aria-labels, semantic HTML

### 🏗️ Technische Highlights

#### **Caching & Performance**
- ✅ **Aggressive Caching** - `staleTime: Infinity` (SWAPI data is immutable)
- ✅ **24h Garbage Collection** - Cached data kept for full day
- ✅ **Query Deduplication** - React Query auto-handles duplicate requests
- ✅ **Network Timeout** - 10 second timeout für API requests

#### **Code Quality**
- ✅ **TypeScript Strict Mode** - Alle Typen explizit, keine `any`
- ✅ **JSDoc Documentation** - Comprehensive JSDoc für alle API-Funktionen
- ✅ **Constants Management** - Magic Numbers extrahiert zu `src/constants/`
- ✅ **No Console Logs** - Nur dev-only Error Interceptor
- ✅ **Zero Antipatterns** - Type-safe Casts statt Non-null Assertions

#### **Modulare Architektur**
```
src/
├── api/              # SWAPI API Integration
│   ├── client.ts     # Axios configuration + error handling
│   ├── swapi.ts      # High-level API functions
│   └── fetch*.ts     # Alternative fetch implementations
├── types/            # TypeScript Interfaces
│   └── swapi.ts      # Person, Film, Planet, ApiResponse
├── hooks/            # Custom React Query Hooks
│   ├── usePerson.ts  # usePeople, usePerson, usePeopleSearch
│   ├── useFilm.ts    # useFilm, useFilms, useFilmsSearch
│   └── usePlanet.ts  # usePlanet, usePlanets, usePlanetsSearch
├── components/       # Reusable React Components
│   ├── common/       # Loading, ErrorMessage, Navigation
│   └── features/     # Feature-specific (PersonCard, FilmCard)
├── pages/            # Page Components (Routes)
│   ├── HomePage/
│   ├── PeoplePage/
│   ├── PersonDetail/
│   ├── FilmsPage/
│   ├── FilmDetail/
│   └── NotFoundPage
├── router/           # React Router Configuration
├── constants/        # Centralized Magic Numbers
├── App.tsx           # Root Component + QueryClient
├── main.tsx          # Entry Point
└── index.css         # Global Styles
```

---

## 📦 Installation & Setup

### Voraussetzungen
- **Node.js** >= 18.0
- **npm** >= 9.0

### Installation

```bash
# 1. Repository klonen
git clone <repository-url>
cd swapi-challenge

# 2. Dependencies installieren
npm install

# 3. Environment variablen konfigurieren
cp .env.example .env
# .env enthält: VITE_SWAPI_BASE_URL=https://swapi.py4e.com/api/
```

---

## 🚀 Entwicklung

### Dev Server starten
```bash
npm run dev
```
➜ Öffnet automatisch **http://localhost:5173**
- HMR (Hot Module Replacement) aktiviert
- Instant reload bei Dateiänderungen

### ESLint & Prettier
```bash
# ESLint Issues überprüfen
npm run lint

# Auto-fix ESLint Issues
npm run lint:fix

# Code mit Prettier formatieren
npm run format

# Format-Überprüfung (ohne Änderungen)
npm run format:check
```

### Empfohlene IDE Setup (VS Code)

**Extensions installieren:**
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)

**settings.json konfigurieren:**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

---

## 🔨 Production Build

### Build erstellen
```bash
npm run build
```

**Output:**
```
✓ 177 modules transformed
dist/index.html           0.46 kB
dist/assets/index.css     9.54 kB (gzipped: 2.33 kB)
dist/assets/index.js    365.27 kB (gzipped: 117.96 kB)
```

### Production Preview
```bash
npm run preview
```
Testet den optimierten Production Build lokal.

---

## 📖 API Integration

### High-Level API Functions

```typescript
// People
import { getPeople, getPerson, searchPeople } from '@/api/swapi';

const allPeople = await getPeople(1);        // Page 1
const luke = await getPerson('1');           // Single person
const results = await searchPeople('luke');  // Search

// Films
import { getFilms, getFilm, searchFilms } from '@/api/swapi';

const allFilms = await getFilms();           // All films
const aNewHope = await getFilm('1');         // Single film
const searched = await searchFilms('empire'); // Search

// Planets
import { getPlanets, getPlanet, searchPlanets } from '@/api/swapi';

const allPlanets = await getPlanets(1);       // Page 1
const tatooine = await getPlanet('1');        // Single planet
```

### Custom React Query Hooks (Empfohlen)

```typescript
import { usePeople, usePerson, usePeopleSearch } from '@/hooks';

// Paginierte Liste
const { data, isLoading, error } = usePeople(1);

// Einzelnes Element
const { data: person } = usePerson('1');

// Suche
const { data: results } = usePeopleSearch('luke');
```

### Error Handling

```typescript
import { handleApiError } from '@/api/client';

try {
  const person = await getPerson('999');
} catch (error) {
  const message = handleApiError(error);
  // "Character not found"
  // "No response from server. Check your internet connection."
  // "Request timeout. The server is taking too long to respond."
}
```

---

## 🎨 Routing & Navigation

### Verfügbare Routes

| Route | Seite | Beschreibung |
|---|---|---|
| `/` | Home | Landing Page mit Navigation |
| `/people` | People List | Alle Charaktere mit Pagination + Search |
| `/people/:id` | Person Detail | Charakterdetails mit Filmlinks |
| `/films` | Films List | Alle Filme sortiert nach Episode |
| `/films/:id` | Film Detail | Filmdetails mit Opening Crawl |
| `*` | 404 | Not Found Page |

### Navigation Component
- Sticky Header mit Star Wars Logo
- Links zu Home, People, Films
- Dark Theme (#1a1a1a) mit Gold Accents (#ffd700)
- Mobile-responsive

---

## 📊 State Management

### Server State (React Query)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,           // SWAPI data never changes
      gcTime: 24 * 60 * 60 * 1000,   // Keep cache 24 hours
      retry: 1,                       // Retry once on failure
    },
  },
});
```

**Features:**
- Automatic caching & deduplication
- Background refetching (disabled für SWAPI)
- Error boundaries integration ready
- DevTools available (React Query DevTools)

### UI State (React Hooks)

```typescript
// Search functionality
const [searchQuery, setSearchQuery] = useState('');

// Form state
const [formData, setFormData] = useState({ name: '' });
```

---

## 🧪 Code Quality Standards

### TypeScript
- ✅ Strict mode enabled
- ✅ No implicit `any`
- ✅ All function return types explicit
- ✅ Generic types for API responses

### ESLint Rules
- ✅ React best practices enforced
- ✅ React Hooks rules (exhaustive-deps)
- ✅ TypeScript recommended rules
- ✅ No unused variables/parameters

### Prettier Formatting
- ✅ 100 character line width
- ✅ 2-space indents
- ✅ Single quotes
- ✅ Trailing commas (ES5)

### Documentation
- ✅ JSDoc for all API functions
- ✅ Parameter descriptions
- ✅ Return type documentation
- ✅ Usage examples in comments

---

## 📁 Project Structure Explained

### `src/api/`
**Verantwortung:** SWAPI API Integration

- `client.ts` - Axios instance mit Error Handling
- `swapi.ts` - High-level API functions (getPeople, getFilms, etc.)
- `fetchPeople.ts`, `fetchFilms.ts`, `fetchPlanets.ts` - Alternative implementations

### `src/types/`
**Verantwortung:** TypeScript Interfaces

- `swapi.ts` - Person, Film, Planet, ApiResponse<T>, ApiError interfaces

### `src/hooks/`
**Verantwortung:** Custom React Query Hooks

- `usePerson.ts` - usePeople(), usePerson(), usePeopleSearch()
- `useFilm.ts` - useFilm(), useFilms(), useFilmsSearch()
- `usePlanet.ts` - usePlanet(), usePlanets(), usePlanetsSearch()

### `src/components/`
**Verantwortung:** Reusable React Components

**common/**
- `Loading.tsx` - Loading indicator
- `ErrorMessage.tsx` - Error display with retry
- `Navigation.tsx` - Sticky header

**features/people/**
- `PersonCard.tsx` - Character card component

**features/films/**
- `FilmCard.tsx` - Film card component

### `src/pages/`
**Verantwortung:** Page-level Components (Routes)

- `HomePage.tsx` - Landing page
- `PeoplePage.tsx` - Character list with search
- `PersonDetailPage.tsx` - Single character details
- `FilmsPage.tsx` - Film list
- `FilmDetailPage.tsx` - Single film details
- `NotFoundPage.tsx` - 404 page

### `src/router/`
**Verantwortung:** React Router Configuration

- `index.tsx` - createBrowserRouter setup mit allen routes

### `src/constants/`
**Verantwortung:** Centralized Magic Numbers

- `index.ts` - QUERY_CACHE_CONFIG, API_CONFIG, COLORS, LAYOUT, etc.

---

## 🔌 Environment Variables

**Datei:** `.env`

```
VITE_SWAPI_BASE_URL=https://swapi.py4e.com/api/
```

**Type-safe Zugriff:**
```typescript
const baseURL = import.meta.env.VITE_SWAPI_BASE_URL;
```

**Type-Hints:** `src/vite-env.d.ts` enthält Interface für alle Env-Variablen

---

## 📚 Learning Resources

### SWAPI Dokumentation
- [SWAPI Official](https://swapi.dev/)
- [SWAPI API Docs](https://swapi.py4e.com/)

### React Query
- [React Query Docs](https://tanstack.com/query/latest)
- [Caching Strategy Guide](https://tanstack.com/query/latest/docs/react/guides/caching)

### React Router
- [React Router v7 Docs](https://reactrouter.com/)
- [Route Parameters](https://reactrouter.com/en/main/route/route#params)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

---

## 🐛 Häufige Probleme & Lösungen

### Port 5173 ist bereits in Benutzung
```bash
# Vite versucht automatisch nächsten Port (5174, 5175, ...)
# Oder explizit Port setzen:
npm run dev -- --port 3000
```

### ESLint Errors nach Fresh Install
```bash
npm run lint:fix  # Auto-fixes most issues
npm run format    # Format mit Prettier
npm run build     # Full type check
```

### React Query Devtools nicht sichtbar
```typescript
// In development wird automatisch gerendert:
{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
```

### TypeScript Errors bei Strict Mode
```typescript
// ❌ Antipattern:
const id = userId!;  // Non-null assertion

// ✅ Besserer Ansatz:
if (userId) {
  const id = userId;  // Type guard
}

// ✅ Oder mit type cast (wenn sicher):
const id = userId as string;  // Explicit cast mit Kommentar
```

---

## 📋 Checkliste für Neue Features

Beim Hinzufügen neuer Features diese Schritte befolgen:

- [ ] Type Definition in `src/types/swapi.ts` erstellen
- [ ] API Function in `src/api/swapi.ts` implementieren
- [ ] Custom Hook in `src/hooks/` erstellen
- [ ] Component in `src/components/` erstellen
- [ ] Page-Component in `src/pages/` erstellen
- [ ] Route in `src/router/index.tsx` hinzufügen
- [ ] JSDoc für alle Funktionen hinzufügen
- [ ] `npm run lint:fix && npm run format`
- [ ] `npm run build` verifyieren
- [ ] Component-Tests durchführen (optional)

---

## 📈 Performance Metrics

### Production Build
- **JavaScript:** 365.27 kB (gzipped: 117.96 kB)
- **CSS:** 9.54 kB (gzipped: 2.33 kB)
- **Modules:** 177 transformed
- **Build Time:** ~600ms

### Caching Strategy
- **Initial Load:** Alle Daten werden gecacht
- **Subsequent Loads:** Instant (no API calls)
- **Cache Duration:** 24 Stunden
- **Network Timeout:** 10 Sekunden

---

## 🤝 Beitragen

Contributions sind willkommen! Bitte:

1. Branch erstellen (`git checkout -b feature/AmazingFeature`)
2. Code formatieren (`npm run format && npm run lint:fix`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Pull Request öffnen

**Code Style:**
- TypeScript strict mode
- ESLint + Prettier konfiguriert
- JSDoc für public APIs
- Keine Magic Numbers

---

## 📄 Lizenz

Dieses Projekt ist lizenziert unter der MIT License - siehe `LICENSE` Datei für Details.

---

## ✅ Version History

### v1.0.0 (2026-01-13) - Initial Release
- ✅ People List mit Pagination & Search
- ✅ Person Details mit Film-Referenzen
- ✅ Films List sortiert nach Episode
- ✅ Film Details mit Opening Crawl & Stats
- ✅ Error Handling & Loading States
- ✅ Navigation & Routing
- ✅ TypeScript Strict Mode
- ✅ ESLint & Prettier Integration
- ✅ React Query Caching (Infinity/24h)
- ✅ Comprehensive Documentation

---

## 👨‍💻 Autor

Erstellt als Teil des SWAPI Challenge Projekts.

**Skills demonstriert:**
- Modern React (19) mit Hooks
- TypeScript Strict Mode
- React Router (SPA)
- React Query (Server State)
- Axios (API Integration)
- ESLint & Prettier
- Responsive Design (CSS Grid)
- Error Handling & UX
- Code Quality & Documentation

---

## 📞 Support

Für Fragen oder Issues:
1. GitHub Issues durchsuchen
2. README & Documentation lesen
3. Code Comments & JSDoc überprüfen
4. React Query Devtools nutzen (`F12` → React Query Tab)

---

**Happy Star Wars browsing! ⭐🚀**

## Code Quality

This project uses:
- **ESLint**: Catches bugs, enforces best practices
- **Prettier**: Automatic code formatting (100-char line width)
- **TypeScript Strict Mode**: All type checking enabled

Both are configured to work together without conflicts. See `docs/ESLINT_PRETTIER_SETUP.md` for details.

## IDE Setup (Recommended)

VS Code extensions:
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Settings are pre-configured in `.vscode/settings.json`:
- Format on save enabled
- ESLint auto-fix on save
- Prettier as default formatter

## Development Workflow

1. Create/modify code
2. ESLint catches issues in real-time (IDE shows squiggles)
3. Prettier auto-formats on save
4. Before committing: `npm run lint:fix && npm run format`

## Contributing

- Follow ESLint rules (enforced on commit)
- Code is auto-formatted on save
- Keep components small and focused
- Use TypeScript strict mode (no `any` unless absolutely necessary)

## Architecture Notes

See `.github/copilot-instructions.md` for:
- Component patterns
- API integration approach
- Custom hooks conventions
- Type definition strategy
- Error handling patterns

---

**Ready for production** - strict configuration suitable for senior-level code reviews.

