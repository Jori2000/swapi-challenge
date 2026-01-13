# ESLint & Prettier Setup - Entscheidungsprotokoll

## Übersicht
Dieses Setup trennt die Verantwortung klar:
- **ESLint**: Codequalität, Best Practices, potenzielle Bugs
- **Prettier**: Nur visuelle Formatierung (keine Stilregeln-Konflikte)

## Wichtigste Entscheidungen

### 1. ESLint-Konfiguration (`.eslintrc.json`)

#### Warum diese Extends?
```json
"extends": [
  "eslint:recommended",           // Basis Best Practices
  "plugin:react/recommended",     // React Hooks & JSX Rules
  "plugin:react-hooks/recommended", // Erzwingt Hook-Regeln (kritisch!)
  "plugin:@typescript-eslint/recommended", // TypeScript Best Practices
  "prettier"  // MUSS ZULETZT kommen - deaktiviert Prettier-Konflikte
]
```

**Reihenfolge ist entscheidend**: `prettier` muss am Ende sein, um konfliktierende ESLint-Regeln zu deaktivieren.

#### Wichtige Regeln

| Regel | Warum |
|-------|-------|
| `react/react-in-jsx-scope: off` | React 17+ JSX Transform - kein Import nötig |
| `react/prop-types: off` | TypeScript macht PropTypes überflüssig |
| `@typescript-eslint/no-unused-vars` mit `argsIgnorePattern: "^_"` | Unused params erlaubt, wenn mit `_` benannt (idiomatisch) |
| `@typescript-eslint/no-explicit-any: warn` | `any` erlaubt, aber gewarnt (nicht zu streng) |
| `react-hooks/exhaustive-deps: warn` | Hilft, aber manchmal falsch-positiv → warn statt error |
| `no-console: warn` (nur warn/error erlaubt) | Erlaubt Debug-Logs, aber warnt vor Production-Code |

#### Warum nicht zu streng?
- Senior-Level Codebase braucht Pragmatismus
- `warn` statt `error` für Dinge, die Exceptions haben können
- Regel-Overrides sind immer möglich (`// eslint-disable-next-line`)

---

### 2. Prettier-Konfiguration (`.prettierrc.json`)

```json
{
  "printWidth": 100,        // Kein 80-char Limit (modern Standard)
  "tabWidth": 2,            // JavaScript Standard
  "singleQuote": true,      // Weniger Escaping
  "trailingComma": "es5",   // Cleaner Diffs in Git
  "jsxSingleQuote": false   // React Standard (double quotes in JSX)
}
```

**Warum diese Settings?**
- **100-char Limit**: Modern, nicht zu streng (besser als 80)
- **Single Quotes**: Reduziert Escaping bei URLs/Strings
- **Trailing Commas (es5)**: Cleaner diffs, verhindert "trailing comma"-Fehler
- **JSX Double Quotes**: React-Konvention

---

### 3. Konflikt-Auflösung

#### Das Problem
ESLint hat viele Formatierungs-Regeln (z.B. `max-len`, `indent`), die mit Prettier kollidieren.

#### Die Lösung
```json
{
  "extends": [
    // ... andere rules ...
    "prettier"  // ← Deaktiviert ALLE konfligierenden ESLint-Regeln
  ]
}
```

`eslint-config-prettier` ist ein Meta-Paket, das:
- ESLint-Formatierungs-Regeln deaktiviert
- Prettier die volle Kontrolle über Formatierung gibt
- Keine Konflikte bei `npm run format` + `npm run lint`

---

## Workflow für Entwickler

### Before Commit
```bash
npm run lint:fix     # Auto-fix ESLint issues (quality)
npm run format       # Auto-format with Prettier (style)
```

### In IDE (Recommended)
- ESLint Extension: Zeigt Probleme in Echtzeit
- Prettier Extension: Format on Save
- Settings:
  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
  }
  ```

---

## Warum nicht [Biome](https://biomejs.dev) oder [Rome](https://rome.tools)?

| Tool | Vorteile | Nachteile |
|------|----------|----------|
| ESLint + Prettier (aktuelles Setup) | Stable, widely-supported, große Community | Zwei Tools zu managen |
| Biome (all-in-one) | Schneller, integriert | Relativ neu, kleinere Community |
| Rome | Ambitioniert | Projekt ruht, nicht empfohlen |

**Entscheidung**: ESLint + Prettier ist Standard in Production-Codebases und Best für ein Senior-Level Projekt.

---

## Wartung

### Dependencies aktualisieren
```bash
npm update eslint prettier @typescript-eslint/eslint-plugin
```

### Neue Rules hinzufügen
Einfach in `.eslintrc.json` hinzufügen, z.B.:
```json
"rules": {
  "react/no-unescaped-entities": "warn",
  "@typescript-eslint/explicit-function-return-types": "warn"
}
```

### Prettier-Format ändern
Adjust `.prettierrc.json` und `npm run format` → alle Dateien aktualisiert automatisch.

---

## Zusammenfassung
- ✅ Keine Konflikte durch `eslint-config-prettier`
- ✅ Pragmatisch & nicht über-konfiguriert
- ✅ Modern (React 17+ JSX, TypeScript strict)
- ✅ Production-ready für Senior-Level Projekte
- ✅ IDE-Integration vorbereitet
