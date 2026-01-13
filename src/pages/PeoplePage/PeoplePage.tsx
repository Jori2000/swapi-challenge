/**
 * People Page - List of all people/characters with infinite scroll
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Person, ApiResponse } from '../../types/swapi';
import { Navigation } from '../../components/common/Navigation/Navigation';
import { PersonCard } from '../../components/features/people';
import { Loading, ErrorMessage } from '../../components/common';
import { useInfinitePeople, usePeopleSearch } from '../../hooks';
import { handleApiError } from '../../api/client';
import styles from './PeoplePage.module.css';

export const PeoplePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  // Use infinite query for browsing all people
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    error: infiniteError,
    refetch: refetchInfinite,
  } = useInfinitePeople();

  // Use search for filtered results
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
  } = usePeopleSearch(searchQuery);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerTarget.current || searchQuery) return; // Skip when searching

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

  // Determine which data to display
  const isSearching = searchQuery.trim().length > 0;
  let displayPeople: Person[] = [];

  if (isSearching) {
    displayPeople = searchData?.results || [];
  } else if (infiniteData && 'pages' in infiniteData) {
    const pages = infiniteData.pages as ApiResponse<Person>[];
    displayPeople = pages.flatMap((page) => page.results);
  }

  const isLoading = isSearching ? isLoadingSearch : isLoadingInfinite;
  const error = isSearching ? searchError : infiniteError;

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>People</h1>
        <p>Browse all Star Wars characters</p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search characters by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {isLoading && !displayPeople.length && (
          <Loading text={isSearching ? 'Searching characters...' : 'Loading characters...'} />
        )}

        {error && (
          <ErrorMessage
            message={handleApiError(error)}
            retry={() => {
              if (isSearching) {
                setSearchQuery('');
              } else {
                refetchInfinite();
              }
            }}
          />
        )}

        {displayPeople.length > 0 && (
          <div className={styles.grid}>
            {displayPeople.map((person: Person) => (
              <PersonCard key={person.url} person={person} />
            ))}
          </div>
        )}

        {!isLoading && displayPeople.length === 0 && (
          <ErrorMessage message={isSearching ? 'No characters found' : 'No characters available'} />
        )}

        {/* Infinite scroll trigger */}
        {!isSearching && <div ref={observerTarget} className={styles.observerTarget} />}

        {/* Loading indicator for next page */}
        {isFetchingNextPage && !isSearching && (
          <div className={styles.loadingMore}>
            <div className={styles.spinner} />
            <p>Loading more characters...</p>
          </div>
        )}
      </div>
    </>
  );
};
