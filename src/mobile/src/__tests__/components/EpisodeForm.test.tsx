import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { EpisodeForm } from '../../components/episode/EpisodeForm';
import { Episode, EpisodeCreateInput, EpisodeUpdateInput, EpisodeStatus } from '../../types/episode';
import { useEpisode } from '../../hooks/useEpisode';

// Mock the useEpisode hook
jest.mock('../../hooks/useEpisode');

describe('EpisodeForm', () => {
  const mockEpisode: Episode = {
    id: '1',
    title: 'Test Episode',
    description: 'This is a test episode',
    audioFileUrl: 'https://example.com/audio.mp3',
    status: EpisodeStatus.DRAFT,
    publishDate: new Date('2023-05-01').toISOString(),
    createdAt: new Date('2023-04-30').toISOString(),
    updatedAt: new Date('2023-04-30').toISOString(),
  };

  const mockCreateEpisode = jest.fn();
  const mockUpdateEpisode = jest.fn();

  beforeEach(() => {
    (useEpisode as jest.Mock).mockReturnValue({
      createEpisode: mockCreateEpisode,
      updateEpisode: mockUpdateEpisode,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty form for new episode', () => {
    const { getByPlaceholderText, getByText } = render(<EpisodeForm />);

    expect(getByPlaceholderText('Episode Title')).toBeTruthy();
    expect(getByPlaceholderText('Episode Description')).toBeTruthy();
    expect(getByText('Upload Audio')).toBeTruthy();
    expect(getByText('Create Episode')).toBeTruthy();
  });

  it('renders correctly with pre-filled form for existing episode', () => {
    const { getByDisplayValue, getByText } = render(<EpisodeForm episode={mockEpisode} />);

    expect(getByDisplayValue('Test Episode')).toBeTruthy();
    expect(getByDisplayValue('This is a test episode')).toBeTruthy();
    expect(getByText('Update Episode')).toBeTruthy();
  });

  it('calls createEpisode when submitting new episode', async () => {
    const { getByPlaceholderText, getByText } = render(<EpisodeForm />);

    fireEvent.changeText(getByPlaceholderText('Episode Title'), 'New Test Episode');
    fireEvent.changeText(getByPlaceholderText('Episode Description'), 'This is a new test episode');
    fireEvent.press(getByText('Create Episode'));

    await waitFor(() => {
      expect(mockCreateEpisode).toHaveBeenCalledWith({
        title: 'New Test Episode',
        description: 'This is a new test episode',
        status: EpisodeStatus.DRAFT,
      });
    });
  });

  it('calls updateEpisode when submitting existing episode', async () => {
    const { getByDisplayValue, getByText } = render(<EpisodeForm episode={mockEpisode} />);

    fireEvent.changeText(getByDisplayValue('Test Episode'), 'Updated Test Episode');
    fireEvent.press(getByText('Update Episode'));

    await waitFor(() => {
      expect(mockUpdateEpisode).toHaveBeenCalledWith('1', {
        title: 'Updated Test Episode',
        description: 'This is a test episode',
        status: EpisodeStatus.DRAFT,
      });
    });
  });

  it('displays error message when form submission fails', async () => {
    mockCreateEpisode.mockRejectedValue(new Error('Failed to create episode'));

    const { getByPlaceholderText, getByText } = render(<EpisodeForm />);

    fireEvent.changeText(getByPlaceholderText('Episode Title'), 'New Test Episode');
    fireEvent.changeText(getByPlaceholderText('Episode Description'), 'This is a new test episode');
    fireEvent.press(getByText('Create Episode'));

    await waitFor(() => {
      expect(getByText('Error: Failed to create episode')).toBeTruthy();
    });
  });
});

// TODO: Implement tests for audio file upload functionality once it's developed
// TODO: Add tests for error handling and user feedback mechanisms
// TODO: Create tests for different screen sizes and orientations
// TODO: Develop tests for accessibility features