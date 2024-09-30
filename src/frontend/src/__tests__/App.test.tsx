import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '@reduxjs/toolkit';
import App from '../App';

// Mock the store
const mockStore = configureStore.configureStore({
  reducer: {
    // Add your reducer slices here
    // For example:
    // auth: authReducer,
    // podcast: podcastReducer,
    // etc.
  },
});

// Helper function to render components with Router and Redux provider
const renderWithRouter = (ui: React.ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <Provider store={mockStore}>
      <MemoryRouter initialEntries={[route]}>
        {ui}
      </MemoryRouter>
    </Provider>
  );
};

describe('App Component', () => {
  test('renders the App component without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Assuming Header is rendered as <header>
  });

  test('navigates to the Login page when clicking the login link', async () => {
    renderWithRouter(<App />);
    const loginLink = screen.getByText(/login/i);
    fireEvent.click(loginLink);
    await waitFor(() => {
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
  });

  test('navigates to the Register page when clicking the register link', async () => {
    renderWithRouter(<App />);
    const registerLink = screen.getByText(/register/i);
    fireEvent.click(registerLink);
    await waitFor(() => {
      expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });
  });

  test('renders the Home page by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Welcome to Podcast Marketing Automation/i)).toBeInTheDocument();
  });

  test('redirects to Login page when accessing a protected route while not authenticated', () => {
    renderWithRouter(<App />, { route: '/dashboard' });
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.queryByText(/Dashboard/i)).not.toBeInTheDocument();
  });

  test('allows access to protected routes when authenticated', () => {
    const authenticatedStore = configureStore.configureStore({
      reducer: {
        auth: () => ({ isAuthenticated: true }),
        // Add other reducers as needed
      },
    });

    render(
      <Provider store={authenticatedStore}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test('renders the Footer component on all pages', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Assuming Footer is rendered as <footer>

    fireEvent.click(screen.getByText(/login/i));
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/register/i));
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement comprehensive test cases for all routes and components (Required)
2. Add test cases for error handling and edge cases (Required)
3. Implement integration tests for Redux state management (Required)
*/