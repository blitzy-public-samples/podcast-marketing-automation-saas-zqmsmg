import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';
import Dashboard from '../../components/Dashboard/Dashboard';
import RecentEpisodes from '../../components/Dashboard/RecentEpisodes';
import UpcomingPosts from '../../components/Dashboard/UpcomingPosts';

// Mock the API service
jest.mock('../../services/api', () => ({
  fetchDashboardData: jest.fn(),
}));

// Mock child components
jest.mock('../../components/Dashboard/RecentEpisodes', () => jest.fn(() => <div>RecentEpisodes</div>));
jest.mock('../../components/Dashboard/UpcomingPosts', () => jest.fn(() => <div>UpcomingPosts</div>));

const mockDashboardData = {
  totalEpisodes: 10,
  totalListeners: 1000,
  averageRating: 4.5,
  recentEpisodes: [],
  upcomingPosts: [],
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
  });

  it('renders dashboard data after loading', async () => {
    const { fetchDashboardData } = require('../../services/api');
    fetchDashboardData.mockResolvedValueOnce(mockDashboardData);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    expect(screen.getByText('Total Episodes: 10')).toBeInTheDocument();
    expect(screen.getByText('Total Listeners: 1,000')).toBeInTheDocument();
    expect(screen.getByText('Average Rating: 4.5')).toBeInTheDocument();
    expect(screen.getByText('RecentEpisodes')).toBeInTheDocument();
    expect(screen.getByText('UpcomingPosts')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    const { fetchDashboardData } = require('../../services/api');
    fetchDashboardData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
      expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });
  });

  it('updates data on refresh', async () => {
    const { fetchDashboardData } = require('../../services/api');
    fetchDashboardData.mockResolvedValueOnce(mockDashboardData);

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    const updatedMockData = { ...mockDashboardData, totalEpisodes: 11 };
    fetchDashboardData.mockResolvedValueOnce(updatedMockData);

    const refreshButton = screen.getByText('Refresh');
    userEvent.click(refreshButton);

    await waitFor(() => {
      expect(screen.getByText('Total Episodes: 11')).toBeInTheDocument();
    });

    expect(fetchDashboardData).toHaveBeenCalledTimes(2);
  });
});

// Commented list of human tasks
/*
Human tasks:
1. Implement additional test cases for edge scenarios (Optional)
2. Add integration tests with RecentEpisodes and UpcomingPosts components (Required)
3. Implement snapshot testing for the Dashboard component (Optional)
*/