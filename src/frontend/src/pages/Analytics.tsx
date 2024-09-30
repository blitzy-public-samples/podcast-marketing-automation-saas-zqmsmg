import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/Analytics/AnalyticsDashboard';
import Header from '../components/Layout/Header';
import useAuth from '../hooks/useAuth';

const Analytics: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="analytics-page">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <p className="text-gray-600 mb-8">
          Gain insights into your podcast performance and marketing campaign effectiveness.
        </p>
        <AnalyticsDashboard />
      </main>
    </div>
  );
};

export default Analytics;

// Human tasks:
// TODO: Implement proper error handling for cases where the AnalyticsDashboard fails to load
// TODO: Add any additional page-level controls or filters for the analytics data
// TODO: Implement breadcrumbs or navigation controls for better user experience