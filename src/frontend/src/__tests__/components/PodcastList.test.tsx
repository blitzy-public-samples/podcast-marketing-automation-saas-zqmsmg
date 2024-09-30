import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import PodcastList from '../../components/Podcast/PodcastList';
import { Podcast } from '../../types/podcast';

// Mock the fetchPodcasts function
const mockFetchPodcasts = jest.fn();

// Mock podcast data
const mockPodcasts: Podcast[] = [
  { id: '1', title: 'Podcast 1', description: 'Description 1' },
  { id: '2', title: 'Podcast 2', description: 'Description 2' },
];

// Mock the usePodcast hook
jest.mock('../../hooks/usePodcast', () => ({
  usePodcast: () => ({
    fetchPodcasts: mockFetchPodcasts,
  }),
}));

describe('PodcastList', () => {
  beforeEach(() => {
    mockFetchPodcasts.mockReset();
  });

  it('renders loading state initially', () => {
    render(<PodcastList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders the list of podcasts', async () => {
    mockFetchPodcasts.mockResolvedValue(mockPodcasts);

    await act(async () => {
      render(<PodcastList />);
    });

    await waitFor(() => {
      expect(screen.getByText('Podcast 1')).toBeInTheDocument();
      expect(screen.getByText('Podcast 2')).toBeInTheDocument();
    });
  });

  it('renders an error message when fetching fails', async () => {
    mockFetchPodcasts.mockRejectedValue(new Error('Failed to fetch podcasts'));

    await act(async () => {
      render(<PodcastList />);
    });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('calls fetchPodcasts on component mount', async () => {
    await act(async () => {
      render(<PodcastList />);
    });

    expect(mockFetchPodcasts).toHaveBeenCalledTimes(1);
  });
});

// Human tasks:
// TODO: Implement additional test cases for error handling scenarios
// TODO: Add test cases for pagination or infinite scroll functionality once implemented