# SWAPI Challenge

Ein Senior-Level React + TypeScript + Vite Projekt mit der Star Wars API.

## Quick Start

```bash
# Setup
npm install
cp .env.example .env

# Development
npm run dev          # http://localhost:5173/

# Code Quality
npm run lint         # Check quality issues
npm run lint:fix     # Auto-fix issues
npm run format       # Auto-format code
npm run format:check # Check formatting without changing

# Build
npm run build        # Production build
npm run preview      # Preview production build
```

## Project Structure

```
src/
├── api/          # SWAPI API client functions
├── components/   # Reusable React components
├── hooks/        # Custom React hooks
├── pages/        # Page-level components
├── types/        # TypeScript interfaces
├── router/       # Routing configuration
├── assets/       # Images, fonts
├── App.tsx       # Root component
└── main.tsx      # Entry point
```

## Key Technologies

- **React 19** - UI framework with hooks
- **TypeScript** - Strict type checking
- **Vite** - Fast build tool & dev server
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client
- **ESLint + Prettier** - Code quality & formatting

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

