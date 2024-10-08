import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PersonDetails from './PersonDetails';
import { FetchPersonDetails } from '../data/FetchPersonDetails';
import { FetchLocationDetails } from '../data/FetchLocationDetails';
import '@testing-library/jest-dom/extend-expect';

// Mocking the dependencies
jest.mock('../data/FetchPersonDetails');
jest.mock('../data/FetchLocationDetails');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: () => ({ id: '1' }) // Mock the URL parameter
}));

// Mocking the PersonDetailsCard and LocationDetailsCard components
jest.mock('../components/PersonDetailsCard', () => () => <div>PersonDetailsCard Component</div>);
jest.mock('../components/LocationDetailsCard', () => () => <div>LocationDetailsCard Component</div>);

describe('PersonDetails Component', () => {
  const mockedNavigate = jest.fn(); // Creating a Jest mock function

  beforeEach(() => {
    // Assigning the mock function to useNavigate
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('shows loading spinner while fetching data', () => {
    FetchPersonDetails.mockResolvedValueOnce({ result: { properties: { homeworld: '123' } } });
    FetchLocationDetails.mockResolvedValueOnce({ result: { properties: {} } });

    render(
      <MemoryRouter>
        <PersonDetails />
      </MemoryRouter>
    );

    // Expect the spinner to show before the data is loaded
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders person and location details after fetching data', async () => {
    // Mock API responses
    FetchPersonDetails.mockResolvedValueOnce({
      result: { properties: { name: 'Luke Skywalker', homeworld: '123' } }
    });
    FetchLocationDetails.mockResolvedValueOnce({
      result: { properties: { name: 'Tatooine' } }
    });

    render(
      <MemoryRouter>
        <PersonDetails />
      </MemoryRouter>
    );

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('PersonDetailsCard Component')).toBeInTheDocument();
      expect(screen.getByText('LocationDetailsCard Component')).toBeInTheDocument();
    });
  });

  test('handles navigation when back button is clicked', async () => {
    FetchPersonDetails.mockResolvedValueOnce({
      result: { properties: { name: 'Luke Skywalker', homeworld: '123' } }
    });
    FetchLocationDetails.mockResolvedValueOnce({
      result: { properties: { name: 'Tatooine' } }
    });

    render(
      <MemoryRouter>
        <PersonDetails />
      </MemoryRouter>
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Click the back button
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);

    // Check that the navigate function was called with the correct argument
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
