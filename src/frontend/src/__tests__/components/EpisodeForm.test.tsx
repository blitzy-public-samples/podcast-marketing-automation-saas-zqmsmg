import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { jest } from '@jest/globals';
import EpisodeForm from '../../components/Episode/EpisodeForm';
import { Episode, EpisodeStatus } from '../../types/episode';

describe('EpisodeForm', () => {
  const mockOnSubmit = jest.fn();
  const mockInitialData: Episode = {
    id: '1',
    title: 'Test Episode',
    description: 'This is a test episode',
    audioFileUrl: 'https://example.com/audio.mp3',
    status: EpisodeStatus.DRAFT,
    publishDate: new Date('2023-05-01').toISOString(),
    createdAt: new Date('2023-04-15').toISOString(),
    updatedAt: new Date('2023-04-15').toISOString(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with empty fields when no initial data is provided', () => {
    const { getByLabelText, getByText } = render(<EpisodeForm onSubmit={mockOnSubmit} />);

    expect(getByLabelText('Title')).toHaveValue('');
    expect(getByLabelText('Description')).toHaveValue('');
    expect(getByLabelText('Audio File')).toHaveValue('');
    expect(getByLabelText('Status')).toHaveValue(EpisodeStatus.DRAFT);
    expect(getByLabelText('Publish Date')).toHaveValue('');
    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('populates form fields with initial data when provided', () => {
    const { getByLabelText } = render(<EpisodeForm onSubmit={mockOnSubmit} initialData={mockInitialData} />);

    expect(getByLabelText('Title')).toHaveValue(mockInitialData.title);
    expect(getByLabelText('Description')).toHaveValue(mockInitialData.description);
    expect(getByLabelText('Audio File')).toHaveValue(mockInitialData.audioFileUrl);
    expect(getByLabelText('Status')).toHaveValue(mockInitialData.status);
    expect(getByLabelText('Publish Date')).toHaveValue('2023-05-01');
  });

  it('validates required fields and displays error messages', async () => {
    const { getByText, getByLabelText, queryByText } = render(<EpisodeForm onSubmit={mockOnSubmit} />);

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByText('Title is required')).toBeInTheDocument();
      expect(getByText('Description is required')).toBeInTheDocument();
      expect(getByText('Audio file is required')).toBeInTheDocument();
    });

    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Title' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(getByLabelText('Audio File'), { target: { value: 'https://example.com/audio.mp3' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(queryByText('Title is required')).not.toBeInTheDocument();
      expect(queryByText('Description is required')).not.toBeInTheDocument();
      expect(queryByText('Audio file is required')).not.toBeInTheDocument();
    });
  });

  it('calls onSubmit with form data when submitted successfully', async () => {
    const { getByLabelText, getByText } = render(<EpisodeForm onSubmit={mockOnSubmit} />);

    fireEvent.change(getByLabelText('Title'), { target: { value: 'New Episode' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'This is a new episode' } });
    fireEvent.change(getByLabelText('Audio File'), { target: { value: 'https://example.com/new-audio.mp3' } });
    fireEvent.change(getByLabelText('Status'), { target: { value: EpisodeStatus.PUBLISHED } });
    fireEvent.change(getByLabelText('Publish Date'), { target: { value: '2023-06-01' } });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Episode',
        description: 'This is a new episode',
        audioFileUrl: 'https://example.com/new-audio.mp3',
        status: EpisodeStatus.PUBLISHED,
        publishDate: '2023-06-01',
      });
    });
  });

  it('disables submit button while form is submitting', async () => {
    const { getByText, getByLabelText } = render(<EpisodeForm onSubmit={mockOnSubmit} />);

    fireEvent.change(getByLabelText('Title'), { target: { value: 'Test Episode' } });
    fireEvent.change(getByLabelText('Description'), { target: { value: 'This is a test episode' } });
    fireEvent.change(getByLabelText('Audio File'), { target: { value: 'https://example.com/audio.mp3' } });

    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
      expect(submitButton).not.toBeDisabled();
    });
  });
});

// TODO: Implement tests for file upload functionality once it's added to the EpisodeForm component
// TODO: Add tests for episode publication scheduling once implemented
// TODO: Create tests for rich text editor integration when added
// TODO: Develop tests for auto-save functionality once implemented