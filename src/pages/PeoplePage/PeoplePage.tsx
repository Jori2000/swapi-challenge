/**
 * People Page - List of all people/characters
 */

import { Navigation } from '../../components/common/Navigation/Navigation';
import { PersonCard } from '../../components/features/people';
import { Loading, ErrorMessage } from '../../components/common';
import { usePeople } from '../../hooks';
import { handleApiError } from '../../api/client';
import styles from './PeoplePage.module.css';

export const PeoplePage = () => {
  const { data, isLoading, error, refetch } = usePeople(1);

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>People</h1>
        <p>Browse all Star Wars characters</p>

        {isLoading && <Loading text="Loading characters..." />}

        {error && <ErrorMessage message={handleApiError(error)} retry={() => { refetch(); }} />}

        {data && data.results && data.results.length > 0 && (
          <div className={styles.grid}>
            {data.results.map((person) => (
              <PersonCard key={person.url} person={person} />
            ))}
          </div>
        )}

        {data && (!data.results || data.results.length === 0) && (
          <ErrorMessage message="No characters found" />
        )}
      </div>
    </>
  );
};
