import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeSearch from './pages/HomeSearch';
import PersonDetails from './pages/PersonDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeSearch />,
  },
  {
    path: "/search/:searchName",
    element: <HomeSearch />
  },
  {
    path: "/person/:id",
    element: <PersonDetails />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


