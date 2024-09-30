import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// TODO: Import AuthNavigator and MainTabNavigator once they are implemented
// import AuthNavigator from './AuthNavigator';
// import MainTabNavigator from './MainTabNavigator';

// Temporary placeholder components
const AuthNavigator = () => <></>;
const MainTabNavigator = () => <></>;

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  // TODO: Replace this with actual authentication state management
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// TODO: Implement authentication state management (e.g., using Redux or Context API)
// TODO: Create and implement AuthNavigator.tsx for handling authentication flows
// TODO: Create and implement MainTabNavigator.tsx for main app navigation