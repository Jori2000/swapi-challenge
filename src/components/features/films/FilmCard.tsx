/**
 * FilmCard Component - Display individual film card
 */

import { Link } from 'react-router-dom';
import type { Film } from '../../../types/swapi';
import { extractIdFromUrl } from '../../../api/swapi';
import styles from './FilmCard.module.css';

interface FilmCardProps {
  film: Film;
}

export const FilmCard = ({ film }: FilmCardProps) => {
  const filmId = extractIdFromUrl(film.url);

  return (
    <Link to={`/films/${filmId}`} className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{film.title}</h3>
        <span className={styles.episode}>Episode {film.episode_id}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.label}>Director:</span>
          <span className={styles.value}>{film.director}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Release:</span>
          <span className={styles.value}>{film.release_date}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Characters:</span>
          <span className={styles.value}>{film.characters.length}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.link}>View Details →</span>
      </div>
    </Link>
  );
};
