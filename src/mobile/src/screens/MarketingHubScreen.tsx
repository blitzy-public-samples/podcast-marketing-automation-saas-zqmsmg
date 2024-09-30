import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MarketingContentGenerator from '../components/marketing/MarketingContentGenerator';
import MarketingContentList from '../components/marketing/MarketingContentList';
import SocialMediaScheduler from '../components/socialMedia/SocialMediaScheduler';
import Header from '../components/layout/Header';
import Button from '../components/common/Button';
import useMarketing from '../hooks/useMarketing';

const MarketingHubScreen: React.FC = () => {
  const navigation = useNavigation();
  const { marketingData, isLoading, error } = useMarketing();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleContentGeneration = () => {
    setActiveSection('contentGeneration');
  };

  const handleContentManagement = () => {
    setActiveSection('contentManagement');
  };

  const handleSocialMediaScheduling = () => {
    setActiveSection('socialMediaScheduling');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Marketing Hub" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttonContainer}>
          <Button title="Generate Content" onPress={handleContentGeneration} />
          <Button title="Manage Content" onPress={handleContentManagement} />
          <Button title="Schedule Posts" onPress={handleSocialMediaScheduling} />
        </View>

        {activeSection === 'contentGeneration' && (
          <MarketingContentGenerator />
        )}

        {activeSection === 'contentManagement' && (
          <MarketingContentList marketingContent={marketingData?.content} />
        )}

        {activeSection === 'socialMediaScheduling' && (
          <SocialMediaScheduler scheduledPosts={marketingData?.scheduledPosts} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default MarketingHubScreen;

// Human tasks:
// 1. Implement responsive design for various mobile screen sizes
// 2. Add analytics tracking for user interactions within the Marketing Hub
// 3. Implement deep linking for direct access to specific marketing features
// 4. Add A/B testing capability for marketing content effectiveness