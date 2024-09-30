import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../types';

// Define the props for the SettingsScreen component
type SettingsScreenProps = StackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();

  // Define state variables for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [dataUsageOptimized, setDataUsageOptimized] = useState(true);

  // Function to handle logout
  const handleLogout = async () => {
    await logout();
    // Navigate to login screen or handle logout as needed
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Email</Text>
          <Text>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Usage</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Optimize Data Usage</Text>
          <Switch
            value={dataUsageOptimized}
            onValueChange={setDataUsageOptimized}
          />
        </View>
      </View>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E40AF',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  settingLabel: {
    fontSize: 16,
    color: '#374151',
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 16,
  },
});

export default SettingsScreen;

// Human tasks:
// TODO: Review and approve the settings options included in the screen
// TODO: Confirm the styling and layout of the settings screen
// TODO: Implement actual functionality for each setting option
// TODO: Add more advanced settings options specific to podcast management if needed
// TODO: Consider adding a confirmation dialog for logout action