import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

// Get the app name from app.json (this is a placeholder, actual implementation may vary)
import { name as appName } from './app.json';

// Function to register the main App component with React Native
const registerApp = () => {
  AppRegistry.registerComponent(appName, () => App);
};

// Register the App
registerApp();

// Export the registerApp function for testing purposes
export { registerApp };

// Human tasks (commented as requested):
// TODO: Ensure that the app name in app.json matches the one used in AppRegistry.registerComponent
// TODO: Verify that any necessary global error handlers or analytics are set up before registering the app
// TODO: Consider adding performance monitoring tools or crash reporting services