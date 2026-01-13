/**
 * Person Detail Page - Individual character details
 */

import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../../components/common/Navigation/Navigation';
import { Loading, ErrorMessage } from '../../components/common';
import { usePerson } from '../../hooks';
import { handleApiError } from '../../api/client';
import { extractIdFromUrl } from '../../api/swapi';
import styles from './PersonDetailPage.module.css';

export const PersonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: person, isLoading, error, refetch } = usePerson(id || null);

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <Loading text="Loading character details..." />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <ErrorMessage message={handleApiError(error)} retry={() => refetch()} />
          <button className={styles.backButton} onClick={() => navigate('/people')}>
            ← Back to People
          </button>
        </div>
      </>
    );
  }

  if (!person) {
    return (
      <>
        <Navigation />
        <div className={styles.container}>
          <ErrorMessage message="Character not found" />
          <button className={styles.backButton} onClick={() => navigate('/people')}>
            ← Back to People
          </button>
        </div>
      </>
    );
  }

  // Extract film IDs from URLs
  const filmIds = person.films.map((filmUrl) => extractIdFromUrl(filmUrl));

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate('/people')}>
          ← Back to People
        </button>

        <div className={styles.card}>
          <h1>{person.name}</h1>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Birth Year</span>
              <span className={styles.value}>{person.birth_year}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{person.gender}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Height</span>
              <span className={styles.value}>{person.height} cm</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Mass</span>
              <span className={styles.value}>{person.mass} kg</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Hair Color</span>
              <span className={styles.value}>{person.hair_color}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Eye Color</span>
              <span className={styles.value}>{person.eye_color}</span>
            </div>
          </div>

          <div className={styles.filmsSection}>
            <h2>Films</h2>
            {filmIds.length > 0 ? (
              <ul className={styles.filmsList}>
                {filmIds.map((filmId, index) => (
                  <li key={filmId}>
                    <a href={`/films/${filmId}`} className={styles.filmLink}>
                      Film {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No films available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
