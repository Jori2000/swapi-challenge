/**
 * Home Page - Main landing page with navigation
 */

import { Link } from 'react-router-dom';
import { Navigation } from '../../components/common/Navigation/Navigation';
import styles from './HomePage.module.css';

export const HomePage = () => {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={styles.title}>SWAPI Challenge</h1>
          <p className={styles.subtitle}>Explore the Star Wars Universe</p>
          <p className={styles.description}>
            Discover information about characters, films, and more from the Star Wars saga.
          </p>
        </div>

        <div className={styles.grid}>
          <Link to="/people" className={styles.card}>
            <h2>People</h2>
            <p>Browse all characters from the Star Wars universe</p>
          </Link>

          <Link to="/films" className={styles.card}>
            <h2>Films</h2>
            <p>Explore all Star Wars films and their details</p>
          </Link>
        </div>
      </div>
    </>
  );
};
