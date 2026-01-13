import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from './router';
import { QUERY_CACHE_CONFIG } from './constants';

/**
 * Create QueryClient with optimized defaults for SWAPI (static data)
 * SWAPI data never changes, so we use aggressive caching:
 * - staleTime: Infinity - data is always fresh
 * - gcTime: 24 hours - keep cached data for a full day
 * - retry: 1 - retry once on network failures
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CACHE_CONFIG.STALE_TIME,
      gcTime: QUERY_CACHE_CONFIG.GC_TIME,
      retry: QUERY_CACHE_CONFIG.RETRY_ATTEMPTS,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />

      {/* React Query DevTools for debugging (only in development) */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
