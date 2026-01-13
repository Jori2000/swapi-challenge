/**
 * Film Detail Page - Individual film details
 */

import { useParams } from 'react-router-dom';
import { Navigation } from '../../components/common/Navigation/Navigation';

export const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>Film Detail</h1>
        <p>Film ID: {id}</p>
      </div>
    </>
  );
};
