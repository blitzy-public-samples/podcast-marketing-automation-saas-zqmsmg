import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Define the AuthStackParamList to type-check the navigation prop
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hide the header for all screens in this navigator
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

// TODO: Implement proper navigation options (header styles, titles, etc.) for each screen
// TODO: Add any additional authentication-related screens (e.g., ForgotPassword) to the navigator
// TODO: Ensure smooth transitions between authentication screens
// TODO: Implement deep linking for authentication screens if required
// TODO: Set up analytics tracking for navigation between auth screens