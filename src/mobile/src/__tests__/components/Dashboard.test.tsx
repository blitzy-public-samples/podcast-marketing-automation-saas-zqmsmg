import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../../components/dashboard/Dashboard';
import RecentEpisodes from '../../components/dashboard/RecentEpisodes';
import UpcomingPosts from '../../components/dashboard/UpcomingPosts';

// Mock the RecentEpisodes and UpcomingPosts components
jest.mock('../../components/dashboard/RecentEpisodes', () => {
  return jest.fn(() => null);
});

jest.mock('../../components/dashboard/UpcomingPosts', () => {
  return jest.fn(() => null);
});

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      // Add your reducers here
      auth: (state = {}) => state,
      podcasts: (state = {}) => state,
      episodes: (state = {}) => state,
      marketing: (state = {}) => state,
    },
    preloadedState: initialState,
  });
};

// Setup function to create a wrapped component with necessary providers
const setupTest = (initialState = {}) => {
  const store = createMockStore(initialState);
  const mockNavigation = {
    navigate: jest.fn(),
  };

  return {
    ...render(
      <Provider store={store}>
        <NavigationContainer>
          <Dashboard navigation={mockNavigation} />
        </NavigationContainer>
      </Provider>
    ),
    store,
    mockNavigation,
  };
};

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = setupTest();
    expect(getByTestId('dashboard-container')).toBeTruthy();
  });

  it('renders RecentEpisodes component', () => {
    setupTest();
    expect(RecentEpisodes).toHaveBeenCalled();
  });

  it('renders UpcomingPosts component', () => {
    setupTest();
    expect(UpcomingPosts).toHaveBeenCalled();
  });

  it('navigates to podcast management when "Manage Podcasts" button is pressed', () => {
    const { getByText, mockNavigation } = setupTest();
    const managePodcastsButton = getByText('Manage Podcasts');
    fireEvent.press(managePodcastsButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('PodcastManagement');
  });

  it('navigates to episode management when "Manage Episodes" button is pressed', () => {
    const { getByText, mockNavigation } = setupTest();
    const manageEpisodesButton = getByText('Manage Episodes');
    fireEvent.press(manageEpisodesButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('EpisodeManagement');
  });

  it('navigates to marketing hub when "Marketing Hub" button is pressed', () => {
    const { getByText, mockNavigation } = setupTest();
    const marketingHubButton = getByText('Marketing Hub');
    fireEvent.press(marketingHubButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('MarketingHub');
  });

  // Add more test cases as needed
});

// TODO: Implement more comprehensive test cases for different scenarios
// TODO: Add performance tests for the Dashboard component (Optional)