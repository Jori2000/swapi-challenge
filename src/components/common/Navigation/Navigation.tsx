/**
 * Navigation component - Displayed on all pages
 */

import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.perspective}>
          <Link to="/" className={styles.logo}>
            SWAPI
          </Link>
        </div>
        <ul className={styles.links}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/people">People</Link>
          </li>
          <li>
            <Link to="/films">Films</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
