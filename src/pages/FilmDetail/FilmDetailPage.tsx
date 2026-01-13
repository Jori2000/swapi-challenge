/**
 * Film Detail Page - Individual film details
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/common/Navigation/Navigation';
import { Loading, ErrorMessage } from '../../components/common';
import { useFilm } from '../../hooks';
import { handleApiError } from '../../api/client';
import styles from './FilmDetailPage.module.css';

export const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: film, isLoading, error, refetch } = useFilm(id || null);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <Loading text="Loading film details..." />
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
          <button className={styles.backButton} onClick={() => navigate('/films')}>
            ← Back to Films
          </button>
        </div>
      </>
    );
  }

  if (!film) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <ErrorMessage message="Film not found" />
          <button className={styles.backButton} onClick={() => navigate('/films')}>
            ← Back to Films
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate('/films')}>
          ← Back to Films
        </button>

        <div className={styles.card}>
          <div className={styles.header}>
            <h1>{film.title}</h1>
            <span className={styles.episodeBadge}>Episode {film.episode_id}</span>
          </div>

          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={styles.label}>Director</span>
              <span className={styles.value}>{film.director}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Producer</span>
              <span className={styles.value}>{film.producer}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Release Date</span>
              <span className={styles.value}>{film.release_date}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.label}>Characters</span>
              <span className={styles.value}>{film.characters.length}</span>
            </div>
          </div>

          <div className={styles.crawlSection}>
            <h2>Opening Crawl</h2>
            <p className={styles.crawl}>{film.opening_crawl}</p>
          </div>

          <div className={styles.statsSection}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{film.characters.length}</span>
              <span className={styles.statLabel}>Characters</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{film.planets.length}</span>
              <span className={styles.statLabel}>Planets</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{film.starships.length}</span>
              <span className={styles.statLabel}>Starships</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{film.vehicles.length}</span>
              <span className={styles.statLabel}>Vehicles</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
