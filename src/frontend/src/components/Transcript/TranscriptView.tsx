import React, { useState, useEffect } from 'react';
import { Episode } from '../../types';
import { useEpisode } from '../../hooks/useEpisode';

interface TranscriptViewProps {
  episodeId: string;
}

const TranscriptView: React.FC<TranscriptViewProps> = ({ episodeId }) => {
  const [transcript, setTranscript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const { getEpisode } = useEpisode();

  useEffect(() => {
    const loadTranscript = async () => {
      setIsLoading(true);
      try {
        const episode = await getEpisode(episodeId);
        const transcriptContent = await fetchTranscript(episodeId);
        setTranscript(transcriptContent);
      } catch (error) {
        console.error('Error loading transcript:', error);
        // TODO: Implement error handling and display appropriate error messages to the user
      } finally {
        setIsLoading(false);
      }
    };

    loadTranscript();
  }, [episodeId, getEpisode]);

  const fetchTranscript = async (episodeId: string): Promise<string> => {
    // TODO: Implement the actual API call to fetch the transcript using the episodeId
    // This is a placeholder implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('This is a placeholder transcript for the episode.');
      }, 1000);
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleTranscriptEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscript(event.target.value);
  };

  if (isLoading) {
    return <div>Loading transcript...</div>;
  }

  return (
    <div className="transcript-view">
      <h2>Episode Transcript</h2>
      <div className="transcript-controls">
        <input
          type="text"
          placeholder="Search transcript..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={toggleEditMode}>
          {isEditMode ? 'Save Changes' : 'Edit Transcript'}
        </button>
      </div>
      {isEditMode ? (
        <textarea
          value={transcript}
          onChange={handleTranscriptEdit}
          className="transcript-editor"
        />
      ) : (
        <div
          className="transcript-content"
          dangerouslySetInnerHTML={{ __html: highlightSearchTerm(transcript) }}
        />
      )}
      {/* TODO: Implement timestamp-based navigation within the transcript */}
    </div>
  );
};

export default TranscriptView;

// TODO: Implement accessibility features for screen reader support
// TODO: Add proper error handling and display appropriate error messages to the user