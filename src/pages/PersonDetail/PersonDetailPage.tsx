/**
 * Person Detail Page - Individual character details
 */

import { useParams } from 'react-router-dom';
import { Navigation } from '../../components/common/Navigation/Navigation';

export const PersonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>Character Detail</h1>
        <p>Character ID: {id}</p>
      </div>
    </>
  );
};
