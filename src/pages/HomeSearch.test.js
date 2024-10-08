import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import HomeSearch from './HomeSearch';
import { FetchPeople } from '../data/FetchPeople';
import '@testing-library/jest-dom/extend-expect';

// Mocking the dependencies
jest.mock('../data/FetchPeople');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: () => ({ searchName: '' }) // Mock the URL parameter
}));

// Mocking the PersonInList component
jest.mock('../components/PersonInList', () => ({ person }) => <li>{person.name}</li>);

describe('HomeSearch Component', () => {
  const mockedNavigate = jest.fn();

  beforeEach(() => {
    // Resetting the mock for each test
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('renders initial elements correctly', () => {
    render(
      <MemoryRouter>
        <HomeSearch />
      </MemoryRouter>
    );

    // Check that the header, input, and button are rendered
    expect(screen.getByText('Star Wars Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a name')).toBeInTheDocument();
    expect(screen.getByText('SCAN')).toBeInTheDocument();
  });

  test('shows loading spinner while searching', async () => {
    // Mock FetchPeople to resolve after some delay
    FetchPeople.mockResolvedValueOnce({ result: [] });

    render(
      <MemoryRouter>
        <HomeSearch />
      </MemoryRouter>
    );

    // Simulate user typing a name and clicking the search button
    fireEvent.change(screen.getByPlaceholderText('Enter a name'), { target: { value: 'Luke' } });
    fireEvent.click(screen.getByText('SCAN'));

    // Expect the spinner to be visible while loading
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders people list after search', async () => {
    // Mock FetchPeople to return a list of people
    FetchPeople.mockResolvedValueOnce({
      result: [{ uid: '1', name: 'Luke Skywalker' }, { uid: '2', name: 'Leia Organa' }]
    });

    render(
      <MemoryRouter>
        <HomeSearch />
      </MemoryRouter>
    );

    // Simulate user typing a name and clicking the search button
    fireEvent.change(screen.getByPlaceholderText('Enter a name'), { target: { value: 'Luke' } });
    fireEvent.click(screen.getByText('SCAN'));

    // Wait for the people list to be rendered
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('Leia Organa')).toBeInTheDocument();
    });
  });

  test('shows "NO RESULTS" when no people are found', async () => {
    // Mock FetchPeople to return an empty result
    FetchPeople.mockResolvedValueOnce({ result: [] });

    render(
      <MemoryRouter>
        <HomeSearch />
      </MemoryRouter>
    );

    // Simulate user typing a name and clicking the search button
    fireEvent.change(screen.getByPlaceholderText('Enter a name'), { target: { value: 'Unknown' } });
    fireEvent.click(screen.getByText('SCAN'));

    // Wait for the "NO RESULTS" message to be rendered
    await waitFor(() => {
      expect(screen.getByText('NO RESULTS')).toBeInTheDocument();
    });
  });

  test('navigates to /search/:name when search button is clicked', () => {
    render(
      <MemoryRouter>
        <HomeSearch />
      </MemoryRouter>
    );

    // Simulate user typing a name
    fireEvent.change(screen.getByPlaceholderText('Enter a name'), { target: { value: 'Luke' } });

    // Simulate clicking the search button
    fireEvent.click(screen.getByText('SCAN'));

    // Expect the navigate function to have been called with the correct path
    expect(mockedNavigate).toHaveBeenCalledWith('/search/Luke');
  });
});
