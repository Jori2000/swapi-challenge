import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Router } from './router';

// Create QueryClient with optimized defaults for SWAPI (static data)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // SWAPI data is static, never stale
      gcTime: 24 * 60 * 60 * 1000, // Keep cache for 24 hours
      retry: 1, // Retry failed requests once
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
