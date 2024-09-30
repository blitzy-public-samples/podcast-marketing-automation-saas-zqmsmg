import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Define the stack navigator
const Stack = createStackNavigator();

// Define the bottom tab navigator
const Tab = createBottomTabNavigator();

// Define the routes
export const ROUTES = {
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register'
  },
  MAIN: {
    HOME: 'Home',
    PODCAST_MANAGEMENT: 'PodcastManagement',
    EPISODE_MANAGEMENT: 'EpisodeManagement',
    MARKETING_HUB: 'MarketingHub',
    ANALYTICS: 'Analytics',
    SETTINGS: 'Settings'
  }
};

// Define the types for the navigation params
export interface RootStackParamList {
  Auth: undefined;
  Main: undefined;
}

export interface AuthStackParamList {
  Login: undefined;
  Register: undefined;
}

export interface MainTabParamList {
  Home: undefined;
  PodcastManagement: undefined;
  EpisodeManagement: undefined;
  MarketingHub: undefined;
  Analytics: undefined;
  Settings: undefined;
}

// Root Navigator
export const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Auth Navigator
export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
    <Stack.Screen name={ROUTES.AUTH.REGISTER} component={RegisterScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
export const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name={ROUTES.MAIN.HOME} component={HomeScreen} />
    <Tab.Screen name={ROUTES.MAIN.PODCAST_MANAGEMENT} component={PodcastManagementScreen} />
    <Tab.Screen name={ROUTES.MAIN.EPISODE_MANAGEMENT} component={EpisodeManagementScreen} />
    <Tab.Screen name={ROUTES.MAIN.MARKETING_HUB} component={MarketingHubScreen} />
    <Tab.Screen name={ROUTES.MAIN.ANALYTICS} component={AnalyticsScreen} />
    <Tab.Screen name={ROUTES.MAIN.SETTINGS} component={SettingsScreen} />
  </Tab.Navigator>
);

// Note: The actual screen components (LoginScreen, RegisterScreen, etc.) need to be imported
// from their respective files once they are created.

/**
 * TODO: Human Tasks
 * 1. Review and approve the defined routes and navigation structure
 * 2. Implement screen components for each defined route
 * 3. Design and implement icons for tab navigation
 */