import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import useAuth from '../hooks/useAuth';

// Styled components
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const QuickActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #1E40AF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1E3A8A;
  }
`;

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleQuickAction = (action: string) => {
    // Implement quick action functionality
    console.log(`Quick action: ${action}`);
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <HomeWrapper>
      <Header />
      <MainContent>
        <Dashboard />
        <QuickActions>
          <ActionButton onClick={() => handleQuickAction('new-episode')}>
            New Episode
          </ActionButton>
          <ActionButton onClick={() => handleQuickAction('generate-content')}>
            Generate Content
          </ActionButton>
          <ActionButton onClick={() => handleQuickAction('view-analytics')}>
            View Analytics
          </ActionButton>
        </QuickActions>
      </MainContent>
      <Footer />
    </HomeWrapper>
  );
};

export default Home;

// Human tasks:
// TODO: Implement responsive design for various screen sizes
// TODO: Add unit tests for the Home component
// TODO: Implement skeleton loading state while dashboard data is being fetched
// TODO: Add user onboarding tour for first-time users