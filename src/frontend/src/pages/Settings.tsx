import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import Input from '../components/Common/Input';
import useAuth from '../hooks/useAuth';
import api from '../services/api';

interface UserSettings {
  email: string;
  name: string;
  password: string;
  emailNotifications: boolean;
  socialMediaIntegrations: {
    [key: string]: boolean;
  };
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userSettings, setUserSettings] = useState<UserSettings>({
    email: '',
    name: '',
    password: '',
    emailNotifications: false,
    socialMediaIntegrations: {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/user/settings');
      setUserSettings(response.data);
    } catch (err) {
      setError('Failed to fetch user settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSocialMediaToggle = (platform: string) => {
    setUserSettings((prevSettings) => ({
      ...prevSettings,
      socialMediaIntegrations: {
        ...prevSettings.socialMediaIntegrations,
        [platform]: !prevSettings.socialMediaIntegrations[platform],
      },
    }));
  };

  const validateForm = (): boolean => {
    if (!userSettings.email || !userSettings.name) {
      setError('Email and name are required fields.');
      return false;
    }
    if (userSettings.password && userSettings.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await api.put('/user/settings', userSettings);
      setSuccessMessage('Settings updated successfully!');
    } catch (err) {
      setError('Failed to update settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <Input
          label="Email"
          type="email"
          name="email"
          value={userSettings.email}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Name"
          type="text"
          name="name"
          value={userSettings.name}
          onChange={handleInputChange}
          required
        />
        <Input
          label="New Password (leave blank to keep current)"
          type="password"
          name="password"
          value={userSettings.password}
          onChange={handleInputChange}
        />
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={userSettings.emailNotifications}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Receive email notifications</span>
          </label>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Social Media Integrations</h2>
          {['facebook', 'twitter', 'linkedin', 'instagram'].map((platform) => (
            <label key={platform} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={userSettings.socialMediaIntegrations[platform] || false}
                onChange={() => handleSocialMediaToggle(platform)}
                className="mr-2"
              />
              <span className="capitalize">{platform}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  );
};

export default Settings;

// TODO: Implement form validation logic
// TODO: Add error handling and display error messages to the user
// TODO: Implement social media integration settings UI and logic
// TODO: Add confirmation modal for sensitive actions (e.g., changing email or password)
// TODO: Implement unit and integration tests for the Settings component
// TODO: Review and ensure all text is ready for internationalization