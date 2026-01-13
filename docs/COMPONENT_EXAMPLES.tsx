/**
 * Common Components Usage Examples
 * Demonstrates how to use Loading and ErrorMessage components
 */

import React from 'react';
import { Loading, ErrorMessage } from '../src/components';
import { usePerson } from '../src/hooks';
import { handleApiError } from '../src/api';

// ==============================================================================
// LOADING COMPONENT EXAMPLES
// ==============================================================================

/**
 * Simple loading state
 */
export const SimpleLoadingExample: React.FC = () => {
  return <Loading />;
};

/**
 * Loading with custom text
 */
export const CustomLoadingExample: React.FC = () => {
  return <Loading text="Fetching characters..." />;
};

/**
 * Loading in a real component with React Query
 */
export const CharacterDetailWithLoading: React.FC<{ personId: number }> = ({ personId }) => {
  const { data: person, isLoading, error } = usePerson(personId);

  if (isLoading) {
    return <Loading text="Loading character..." />;
  }

  if (error) {
    return <ErrorMessage message={`Failed to load character: ${handleApiError(error)}`} />;
  }

  if (!person) {
    return <ErrorMessage message="Character not found" />;
  }

  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}cm</p>
      <p>Mass: {person.mass}kg</p>
    </div>
  );
};

// ==============================================================================
// ERROR MESSAGE COMPONENT EXAMPLES
// ==============================================================================

/**
 * Simple error message without retry
 */
export const SimpleErrorExample: React.FC = () => {
  return <ErrorMessage message="Something went wrong. Please try again later." />;
};

/**
 * Error message with retry button
 */
export const ErrorWithRetryExample: React.FC = () => {
  const handleRetry = () => {
    console.log('Retrying...');
    // Implement retry logic here
  };

  return <ErrorMessage message="Failed to load data" retry={handleRetry} />;
};

/**
 * Error in a real component with retry
 */
export const CharacterDetailWithRetry: React.FC<{ personId: number }> = ({ personId }) => {
  const { data: person, isLoading, error, refetch } = usePerson(personId);

  if (isLoading) {
    return <Loading text="Loading character..." />;
  }

  if (error) {
    const errorMessage = handleApiError(error);
    return (
      <ErrorMessage message={`Failed to load character: ${errorMessage}`} retry={() => refetch()} />
    );
  }

  if (!person) {
    return <ErrorMessage message="Character not found" />;
  }

  return (
    <div>
      <h1>{person.name}</h1>
      <p>Height: {person.height}cm</p>
      <p>Mass: {person.mass}kg</p>
    </div>
  );
};

// ==============================================================================
// COMBINED EXAMPLE: Loading List with Error Handling
// ==============================================================================

/**
 * Example component showing common pattern:
 * 1. Show loading while fetching
 * 2. Show error with retry if failed
 * 3. Show data if successful
 */
export const DataFetchingPattern: React.FC<{
  isLoading: boolean;
  error: unknown;
  data: unknown;
  onRetry: () => void;
  children: React.ReactNode;
}> = ({ isLoading, error, data, onRetry, children }) => {
  if (isLoading) {
    return <Loading text="Loading..." />;
  }

  if (error) {
    const errorMessage = handleApiError(error);
    return <ErrorMessage message={errorMessage} retry={onRetry} />;
  }

  if (!data) {
    return <ErrorMessage message="No data found" />;
  }

  return <>{children}</>;
};

/**
 * Using the pattern in a real component
 */
export const FilmListExample: React.FC = () => {
  const { data: films, isLoading, error, refetch } = usePerson(1); // Using wrong hook for demo

  return (
    <DataFetchingPattern isLoading={isLoading} error={error} data={films} onRetry={() => refetch()}>
      <div>
        <h2>Films</h2>
        {/* Film list would go here */}
      </div>
    </DataFetchingPattern>
  );
};
