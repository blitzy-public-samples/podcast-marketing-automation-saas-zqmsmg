import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import PodcastManagementScreen from '../screens/PodcastManagementScreen';
import EpisodeManagementScreen from '../screens/EpisodeManagementScreen';
import MarketingHubScreen from '../screens/MarketingHubScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

// Define icon names for each tab
const tabIcons = {
  Home: 'home',
  Podcasts: 'mic',
  Episodes: 'list',
  Marketing: 'megaphone',
  Analytics: 'stats-chart',
};

// MainTabNavigator component
const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = tabIcons[route.name as keyof typeof tabIcons] || 'help-circle';
          return <Ionicons name={focused ? `${iconName}` : `${iconName}-outline`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1E40AF', // Deep Blue from the theme
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Podcasts" component={PodcastManagementScreen} />
      <Tab.Screen name="Episodes" component={EpisodeManagementScreen} />
      <Tab.Screen name="Marketing" component={MarketingHubScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

// TODO: Implement conditional rendering of tabs based on user role
// TODO: Add badge notifications for new content or updates in specific tabs
// TODO: Implement deep linking configuration for each tab