/**
 * Not Found Page - 404 error page
 */

import { Link } from 'react-router-dom';
import { Navigation } from '../components/common/Navigation/Navigation';

export const NotFoundPage = () => {
  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    </>
  );
};
