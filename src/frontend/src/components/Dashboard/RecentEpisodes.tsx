import React, { useState, useEffect } from 'react';

// Assuming these types based on the specification
interface Episode {
  id: string;
  title: string;
  publishDate: string;
  status: EpisodeStatus;
}

enum EpisodeStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  SCHEDULED = 'SCHEDULED',
}

const fetchRecentEpisodes = async (): Promise<Episode[]> => {
  try {
    // TODO: Implement actual API call
    const response = await fetch('/api/episodes/recent');
    if (!response.ok) {
      throw new Error('Failed to fetch recent episodes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching recent episodes:', error);
    throw error;
  }
};

interface RecentEpisodesProps {
  // Add any props if needed
}

const RecentEpisodes: React.FC<RecentEpisodesProps> = () => {
  const [recentEpisodes, setRecentEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecentEpisodes = async () => {
      try {
        setIsLoading(true);
        const episodes = await fetchRecentEpisodes();
        setRecentEpisodes(episodes);
        setError(null);
      } catch (err) {
        setError('Failed to load recent episodes. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentEpisodes();
  }, []);

  const handleEdit = (episodeId: string) => {
    // TODO: Implement edit functionality
    console.log(`Edit episode with ID: ${episodeId}`);
  };

  const handleGenerateMarketing = (episodeId: string) => {
    // TODO: Implement marketing content generation
    console.log(`Generate marketing content for episode with ID: ${episodeId}`);
  };

  if (isLoading) {
    return <div>Loading recent episodes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="recent-episodes">
      <h2>Recent Episodes</h2>
      {recentEpisodes.length === 0 ? (
        <p>No recent episodes found.</p>
      ) : (
        <ul>
          {recentEpisodes.map((episode) => (
            <li key={episode.id} className="episode-item">
              <h3>{episode.title}</h3>
              <p>Publish Date: {new Date(episode.publishDate).toLocaleDateString()}</p>
              <p>Status: {episode.status}</p>
              <div className="episode-actions">
                <button onClick={() => handleEdit(episode.id)}>Edit</button>
                <button onClick={() => handleGenerateMarketing(episode.id)}>
                  Generate Marketing Content
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentEpisodes;

// TODO: Implement error handling for API calls
// TODO: Add loading state while fetching episodes
// TODO: Implement pagination or infinite scrolling for large numbers of episodes
// TODO: Add unit tests for the RecentEpisodes component