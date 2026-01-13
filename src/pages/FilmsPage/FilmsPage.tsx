/**
 * Films Page - List of all films
 */

import { Navigation } from '../../components/common/Navigation/Navigation';
import { FilmCard } from '../../components/features/films';
import { Loading, ErrorMessage } from '../../components/common';
import { useFilms } from '../../hooks';
import { handleApiError } from '../../api/client';
import styles from './FIlmsPage.module.css';

export const FilmsPage = () => {
  const { data, isLoading, error, refetch } = useFilms();

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <Loading text="Loading films..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <ErrorMessage
            message={handleApiError(error as Error)}
            retry={() => refetch()}
          />
        </div>
      </>
    );
  }

  if (!data || !data.results || data.results.length === 0) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <h1>Films</h1>
          <ErrorMessage message="No films found" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>Films</h1>
        <p>Browse all Star Wars films</p>

        <div className={styles.grid}>
          {data.results
            .sort((a, b) => a.episode_id - b.episode_id)
            .map((film) => (
              <FilmCard key={film.url} film={film} />
            ))}
        </div>
      </div>
    </>
  );
};
