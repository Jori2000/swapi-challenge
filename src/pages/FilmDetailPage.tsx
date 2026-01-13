/**
 * Film Detail Page - Individual film details
 */

import { useParams } from 'react-router-dom';

export const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Film Detail</h1>
      <p>Film ID: {id}</p>
    </div>
  );
};
