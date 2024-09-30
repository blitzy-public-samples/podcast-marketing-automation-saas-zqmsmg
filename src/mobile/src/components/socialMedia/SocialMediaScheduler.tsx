import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../common/Button';
import Input from '../common/Input';
import { SocialMediaPost } from '../../types';
import { scheduleSocialMediaPost } from '../../services/socialMedia';

interface SocialMediaSchedulerProps {
  episodeId: number;
  onScheduleComplete: () => void;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SocialMediaScheduler: React.FC<SocialMediaSchedulerProps> = ({ episodeId, onScheduleComplete }) => {
  const [content, setContent] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [platform, setPlatform] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || scheduledDate;
    setShowDatePicker(Platform.OS === 'ios');
    setScheduledDate(currentDate);
  };

  const handleSchedule = async () => {
    setIsLoading(true);
    setError('');

    try {
      const post: SocialMediaPost = {
        episodeId,
        content,
        scheduledDate: scheduledDate.toISOString(),
        platform,
      };

      await scheduleSocialMediaPost(post);
      onScheduleComplete();
      // Reset form
      setContent('');
      setScheduledDate(new Date());
      setPlatform('');
    } catch (err) {
      setError('Failed to schedule post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Input
        value={content}
        onChangeText={setContent}
        placeholder="Enter your post content"
        multiline
        style={styles.input}
      />
      <Input
        value={platform}
        onChangeText={setPlatform}
        placeholder="Enter social media platform"
        style={styles.input}
      />
      <View>
        <Button onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>
            {formatDate(scheduledDate)}
          </Text>
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={scheduledDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      <Button
        onPress={handleSchedule}
        disabled={isLoading || content === '' || platform === ''}
      >
        {isLoading ? 'Scheduling...' : 'Schedule Post'}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#1E40AF',
    textAlign: 'center',
  },
  errorText: {
    color: '#F43F5E',
    marginBottom: 16,
  },
});

export default SocialMediaScheduler;
```

This implementation of the SocialMediaScheduler component follows the specifications provided in the JSON representation. Here's a breakdown of the key features:

1. The component uses React hooks for state management.
2. It imports the necessary dependencies, including the custom Button and Input components.
3. The `formatDate` function is implemented as specified.
4. The component handles input changes for content and platform.
5. It uses the `DateTimePicker` component for date selection, with platform-specific behavior.
6. The `handleSchedule` function calls the `scheduleSocialMediaPost` service with the appropriate data.
7. Error handling and loading states are implemented.
8. The component renders form inputs for content, platform, and scheduled date.
9. Styling is applied as specified in the JSON.

Note that since we couldn't access the actual implementations or specifications of the imported components and functions, we've made some assumptions about their interfaces. You may need to adjust these if the actual implementations differ.

Human Tasks:
```
// TODO: Review and approve the design and functionality of the SocialMediaScheduler component
// TODO: Ensure proper error handling and user feedback mechanisms are in place
// TODO: Implement and test integration with various social media platforms
// TODO: Optimize component performance for large numbers of scheduled posts