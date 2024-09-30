import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store';
import theme from './src/styles/theme';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

// Human tasks:
// TODO: Ensure that the Redux store is properly configured in the store file
// TODO: Verify that the theme object is correctly defined in the theme file
// TODO: Implement error boundary for the entire application
// TODO: Set up any necessary global error tracking or analytics services