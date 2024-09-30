import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '../Common/Button';
import { routes } from '../../config/routes';
import { useAuth } from '../../hooks/useAuth';

// Define the interface for navigation items
interface NavItem {
  path: string;
  label: string;
  icon: string; // This will be replaced with actual icons in a future task
}

// Define the props for the Sidebar component
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the navigation items
const navItems: NavItem[] = [
  { path: routes.dashboard, label: 'Dashboard', icon: 'dashboard' },
  { path: routes.podcasts, label: 'Podcasts', icon: 'podcast' },
  { path: routes.episodes, label: 'Episodes', icon: 'episode' },
  { path: routes.marketing, label: 'Marketing', icon: 'marketing' },
  { path: routes.analytics, label: 'Analytics', icon: 'analytics' },
  { path: routes.settings, label: 'Settings', icon: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={classNames(
        'fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out transform',
        {
          '-translate-x-full': !isOpen,
          'translate-x-0': isOpen,
        }
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Podcast Marketing</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <span className="sr-only">Close sidebar</span>
            {/* Replace with an actual close icon */}
            X
          </button>
        </div>

        {user && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              {/* Replace with actual icons */}
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-full p-4">
        <Button onClick={logout} fullWidth variant="outlined">
          Logout
        </Button>
      </div>
    </div>
  );
};

// List of human tasks
/*
TODO:
- Implement proper icons for navigation items (Required)
- Review and adjust sidebar styles to match the design system (Required)
- Implement unit tests for the Sidebar component (Required)
- Consider adding animations for sidebar open/close transitions (Optional)
*/