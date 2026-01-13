/**
 * Films Page - List of all films
 */

import { Navigation } from '../../components/common/Navigation/Navigation';
import styles from './FIlmsPage.module.css';

export const FilmsPage = () => {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>Films</h1>
        <p>Browse all Star Wars films</p>
      </div>
    </>
  );
};
