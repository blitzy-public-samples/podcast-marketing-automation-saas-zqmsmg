import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import Dashboard from '../components/dashboard/Dashboard';
import Header from '../components/layout/Header';
import { RootState } from '../store'; // Assuming this is where the root state type is defined

const HomeScreen: React.FC = () => {
  // Fetch user data from Redux store
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Render the Header component with user information */}
        <Header user={user} />
        
        {/* Render the Dashboard component */}
        <Dashboard />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// TODO: Implement user authentication check and redirect to login if not authenticated
// TODO: Add pull-to-refresh functionality for updating dashboard data
// TODO: Implement deep linking to specific sections of the app from push notifications