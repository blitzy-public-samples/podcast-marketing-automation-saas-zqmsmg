import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RecentEpisodes } from '../Dashboard/RecentEpisodes';
import { UpcomingPosts } from '../Dashboard/UpcomingPosts';
import { Loader } from '../Common/Loader';

// Define the DashboardData interface
interface DashboardData {
  totalEpisodes: number;
  totalListens: number;
  averageRating: number;
  recentEpisodes: Episode[];
  upcomingPosts: SocialMediaPost[];
}

// Define placeholder interfaces for Episode and SocialMediaPost
interface Episode {
  id: string;
  title: string;
  publishDate: string;
}

interface SocialMediaPost {
  id: string;
  content: string;
  scheduledDate: string;
  platform: string;
}

// Styled components
const DashboardWrapper = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
`;

const DashboardHeader = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`;

const KeyMetrics = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  margin: 0 0.5rem;

  h2 {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
`;

// Dashboard component
export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulating API call
      const data = await new Promise<DashboardData>((resolve) => {
        setTimeout(() => {
          resolve({
            totalEpisodes: 50,
            totalListens: 10000,
            averageRating: 4.5,
            recentEpisodes: [],
            upcomingPosts: [],
          });
        }, 1000);
      });
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
      // TODO: Implement error handling and display error messages to the user
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!dashboardData) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <DashboardWrapper>
      <DashboardHeader>Podcast Dashboard</DashboardHeader>
      <KeyMetrics>
        <MetricCard>
          <h2>Total Episodes</h2>
          <p>{dashboardData.totalEpisodes}</p>
        </MetricCard>
        <MetricCard>
          <h2>Total Listens</h2>
          <p>{dashboardData.totalListens.toLocaleString()}</p>
        </MetricCard>
        <MetricCard>
          <h2>Average Rating</h2>
          <p>{dashboardData.averageRating.toFixed(1)}</p>
        </MetricCard>
      </KeyMetrics>
      <RecentEpisodes episodes={dashboardData.recentEpisodes} />
      <UpcomingPosts posts={dashboardData.upcomingPosts} />
    </DashboardWrapper>
  );
};

export default Dashboard;

// TODO: Implement error handling and display error messages to the user
// TODO: Add unit tests for the Dashboard component and fetchDashboardData function
// TODO: Implement caching mechanism for dashboard data to improve performance
// TODO: Add customization options for users to choose which metrics to display