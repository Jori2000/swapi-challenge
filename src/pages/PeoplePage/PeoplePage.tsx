/**
 * People Page - List of all people/characters
 */

import { Navigation } from '../../components/common/Navigation/Navigation';
import styles from './PeoplePage.module.css';

export const PeoplePage = () => {
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1>People</h1>
        <p>Browse all Star Wars characters</p>
      </div>
    </>
  );
};
