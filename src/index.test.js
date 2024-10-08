// index.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import HomeSearch from './pages/HomeSearch';
import PersonDetails from './pages/PersonDetails';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers

// Mock the components
jest.mock('./pages/HomeSearch', () => () => <div>HomeSearch Component</div>);
jest.mock('./pages/PersonDetails', () => () => <div>PersonDetails Component</div>);

describe('App routing tests', () => {
  test('renders HomeSearch at the root path "/"', () => {
    const router = createMemoryRouter([
      {
        path: "/",
        element: <HomeSearch />,
      }
    ], {
      initialEntries: ["/"], // Simulate starting at root "/"
    });

    render(<RouterProvider router={router} />);

    // Check if the HomeSearch component is rendered
    expect(screen.getByText('HomeSearch Component')).toBeInTheDocument();
  });

  test('renders HomeSearch at the path "/search/:searchName"', () => {
    const router = createMemoryRouter([
      {
        path: "/search/:searchName",
        element: <HomeSearch />,
      }
    ], {
      initialEntries: ["/search/test"], // Simulate visiting "/search/test"
    });

    render(<RouterProvider router={router} />);

    // Check if the HomeSearch component is rendered
    expect(screen.getByText('HomeSearch Component')).toBeInTheDocument();
  });

  test('renders PersonDetails at the path "/person/:id"', () => {
    const router = createMemoryRouter([
      {
        path: "/person/:id",
        element: <PersonDetails />,
      }
    ], {
      initialEntries: ["/person/123"], // Simulate visiting "/person/123"
    });

    render(<RouterProvider router={router} />);

    // Check if the PersonDetails component is rendered
    expect(screen.getByText('PersonDetails Component')).toBeInTheDocument();
  });
});
