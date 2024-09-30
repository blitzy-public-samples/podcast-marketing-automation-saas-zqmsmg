import React, { useState, useEffect } from 'react';
import { SocialMediaPost, SocialMediaPlatform } from '../../types';

// Assuming the structure of SocialMediaPost and SocialMediaPlatform
// interface SocialMediaPost {
//   id: string;
//   platform: SocialMediaPlatform;
//   content: string;
//   scheduledTime: Date;
// }
// 
// enum SocialMediaPlatform {
//   Facebook = 'Facebook',
//   Twitter = 'Twitter',
//   Instagram = 'Instagram',
//   LinkedIn = 'LinkedIn',
// }

const UpcomingPosts: React.FC = () => {
  const [upcomingPosts, setUpcomingPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpcomingPosts();
  }, []);

  const fetchUpcomingPosts = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement the actual API call to fetch upcoming posts data
      const response = await fetch('/api/upcoming-posts');
      if (!response.ok) {
        throw new Error('Failed to fetch upcoming posts');
      }
      const data = await response.json();
      setUpcomingPosts(data);
      setError(null);
    } catch (err) {
      setError('Error fetching upcoming posts. Please try again later.');
      console.error('Error fetching upcoming posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPlatformIcon = (platform: SocialMediaPlatform): JSX.Element => {
    switch (platform) {
      case 'Facebook':
        return <i className="fab fa-facebook"></i>;
      case 'Twitter':
        return <i className="fab fa-twitter"></i>;
      case 'Instagram':
        return <i className="fab fa-instagram"></i>;
      case 'LinkedIn':
        return <i className="fab fa-linkedin"></i>;
      default:
        return <i className="fas fa-globe"></i>;
    }
  };

  if (isLoading) {
    return <div>Loading upcoming posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="upcoming-posts">
      <h2>Upcoming Scheduled Posts</h2>
      {upcomingPosts.length === 0 ? (
        <p>No upcoming posts scheduled.</p>
      ) : (
        <ul className="post-list">
          {upcomingPosts.map((post) => (
            <li key={post.id} className="post-item">
              <div className="post-platform">
                {getPlatformIcon(post.platform)}
                <span>{post.platform}</span>
              </div>
              <div className="post-schedule">
                Scheduled for: {formatDate(post.scheduledTime)}
              </div>
              <div className="post-content">
                {post.content.length > 100
                  ? `${post.content.substring(0, 100)}...`
                  : post.content}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingPosts;

// TODO: Implement the actual API call to fetch upcoming posts data
// TODO: Design and implement the UI for each post item in the list
// TODO: Add pagination or infinite scrolling if the list of upcoming posts can be long
// TODO: Implement click-through functionality to view full post details or edit the post