import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { PodcastList } from '../../components/podcast/PodcastList';
import { PodcastListItem } from '../../types/podcast';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('PodcastList', () => {
  const mockPodcasts: PodcastListItem[] = [
    { id: '1', title: 'Podcast 1', description: 'Description 1', coverImageUrl: 'https://example.com/image1.jpg' },
    { id: '2', title: 'Podcast 2', description: 'Description 2', coverImageUrl: 'https://example.com/image2.jpg' },
  ];

  it('renders correctly with podcasts', () => {
    const { getByText, getAllByTestId } = render(<PodcastList podcasts={mockPodcasts} />);

    expect(getByText('Podcast 1')).toBeTruthy();
    expect(getByText('Podcast 2')).toBeTruthy();
    expect(getAllByTestId('podcast-item')).toHaveLength(2);
  });

  it('renders empty state when no podcasts are provided', () => {
    const { getByText } = render(<PodcastList podcasts={[]} />);

    expect(getByText('No podcasts available')).toBeTruthy();
  });

  it('navigates to podcast detail when a podcast is pressed', async () => {
    const { getAllByTestId } = render(<PodcastList podcasts={mockPodcasts} />);
    const firstPodcast = getAllByTestId('podcast-item')[0];

    fireEvent.press(firstPodcast);

    await waitFor(() => {
      expect(require('@react-navigation/native').useNavigation().navigate).toHaveBeenCalledWith('PodcastDetail', { podcastId: '1' });
    });
  });

  // Add more tests here as needed
});

// TODO: Implement mock for useNavigation hook
// TODO: Add more edge case tests (e.g., empty list, error states)
// TODO: Consider adding snapshot tests for consistent UI