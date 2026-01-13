/**
 * PersonCard Component - Display individual person/character card
 */

import { Link } from 'react-router-dom';
import type { Person } from '../../../types/swapi';
import { extractIdFromUrl } from '../../../api/swapi';
import styles from './PersonCard.module.css';

interface PersonCardProps {
  person: Person;
}

export const PersonCard = ({ person }: PersonCardProps) => {
  const personId = extractIdFromUrl(person.url);

  return (
    <Link to={`/people/${personId}`} className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{person.name}</h3>
      </div>
      <div className={styles.body}>
        <div className={styles.field}>
          <span className={styles.label}>Birth Year:</span>
          <span className={styles.value}>{person.birth_year}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Gender:</span>
          <span className={styles.value}>{person.gender}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Height:</span>
          <span className={styles.value}>{person.height} cm</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Mass:</span>
          <span className={styles.value}>{person.mass} kg</span>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.link}>View Details →</span>
      </div>
    </Link>
  );
};
