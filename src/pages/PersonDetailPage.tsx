/**
 * Person Detail Page - Individual character details
 */

import { useParams } from 'react-router-dom';

export const PersonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Character Detail</h1>
      <p>Character ID: {id}</p>
    </div>
  );
};
