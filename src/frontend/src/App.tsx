import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layout components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

// Page components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PodcastManagement from './pages/PodcastManagement';
import EpisodeManagement from './pages/EpisodeManagement';
import MarketingHub from './pages/MarketingHub';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Custom hook for authentication
import { useAuth } from './hooks/useAuth';

// PrivateRoute component for protected routes
const PrivateRoute: React.FC<{
  component: React.ComponentType;
  path: string;
  exact?: boolean;
}> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <PrivateRoute path="/podcasts" component={PodcastManagement} />
              <PrivateRoute path="/episodes" component={EpisodeManagement} />
              <PrivateRoute path="/marketing" component={MarketingHub} />
              <PrivateRoute path="/analytics" component={Analytics} />
              <PrivateRoute path="/settings" component={Settings} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;

// TODO: Implement error boundary for the entire application
// TODO: Set up global state management with Redux
// TODO: Implement lazy loading for route components to improve initial load time
// TODO: Set up a theme provider for consistent styling across the application
// TODO: Implement unit and integration tests for the App component