/**
 * Application Constants
 * Centralized configuration for magic numbers, timeouts, caching, and other constants
 */

// =============================================================================
// REACT QUERY CACHING CONFIGURATION
// =============================================================================

/**
 * SWAPI contains static Star Wars data that never changes.
 * We use aggressive caching to minimize API calls and improve performance.
 */
export const QUERY_CACHE_CONFIG = {
  /** Never refetch stale data - SWAPI data never changes */
  STALE_TIME: Infinity,
  /** Keep cached data for 24 hours before garbage collection */
  GC_TIME: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  /** Retry failed requests once on network errors */
  RETRY_ATTEMPTS: 1,
} as const;

// =============================================================================
// API CONFIGURATION
// =============================================================================

/**
 * Axios client configuration
 */
export const API_CONFIG = {
  /** 10 second timeout for API requests */
  REQUEST_TIMEOUT: 10000,
} as const;

// =============================================================================
// THEME COLORS
// =============================================================================

/**
 * Application color palette
 */
export const COLORS = {
  /** Star Wars gold accent color */
  ACCENT: '#ffd700',
  /** Lighter gold for hover states */
  ACCENT_LIGHT: '#ffed4e',
  /** Primary text color */
  TEXT_PRIMARY: '#333',
  /** Secondary text color */
  TEXT_SECONDARY: '#666',
  /** Light gray background */
  BG_LIGHT: '#fafafa',
  /** Light gray card background */
  BG_CARD: '#f9f9f9',
  /** Border color */
  BORDER: '#ddd',
  /** Error/danger color */
  ERROR: '#d32f2f',
  /** Link/primary button color */
  LINK: '#0066cc',
  /** Dark background for navigation */
  NAV_BG: '#1a1a1a',
  /** Dark gray border for navigation */
  NAV_BORDER: '#333',
} as const;

// =============================================================================
// LAYOUT & SPACING
// =============================================================================

/**
 * Layout dimensions
 */
export const LAYOUT = {
  /** Navigation bar height in pixels */
  NAV_HEIGHT: 70,
  /** Max content width for containers */
  MAX_WIDTH: 1200,
} as const;

// =============================================================================
// GRID CONFIGURATIONS
// =============================================================================

/**
 * Card grid minimum widths for responsive layouts
 */
export const GRID_MIN_WIDTH = {
  /** PersonCard minimum width */
  PERSON_CARD: 280,
  /** FilmCard minimum width */
  FILM_CARD: 300,
} as const;

// =============================================================================
// ANIMATION CONFIGURATIONS
// =============================================================================

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATION = {
  /** Quick transitions (e.g., hover effects) */
  FAST: 200,
  /** Standard transitions (e.g., color changes) */
  STANDARD: 300,
  /** Slower transitions (e.g., page load animations) */
  SLOW: 600,
} as const;
