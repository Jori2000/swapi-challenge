/**
 * Router configuration with React Router v7
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomePage,
  PeoplePage,
  PersonDetailPage,
  FilmsPage,
  FilmDetailPage,
  NotFoundPage,
} from '../pages';

// Create router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/people',
    element: <PeoplePage />,
  },
  {
    path: '/people/:id',
    element: <PersonDetailPage />,
  },
  {
    path: '/films',
    element: <FilmsPage />,
  },
  {
    path: '/films/:id',
    element: <FilmDetailPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

/**
 * Router Provider Component
 * Wrap your app with this component to enable routing
 */
export const Router = () => <RouterProvider router={router} />;
