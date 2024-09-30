import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

// TODO: Import the actual Episode type once it's implemented
interface Episode {
  id: string;
  title: string;
  transcript?: string;
}

// TODO: Import the actual useEpisode hook once it's implemented
const useEpisode = (episodeId: string): { episode: Episode | null, isLoading: boolean, error: Error | null } => {
  // This is a mock implementation
  return {
    episode: null,
    isLoading: false,
    error: null
  };
};

interface TranscriptViewProps {
  episodeId: string;
}

const TranscriptView: React.FC<TranscriptViewProps> = ({ episodeId }) => {
  const { episode, isLoading, error } = useEpisode(episodeId);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!episode || !episode.transcript) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No transcript available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{episode.title}</Text>
      <Text style={styles.transcript}>{episode.transcript}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transcript: {
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default TranscriptView;

// TODO: Implement the following human tasks:
// 1. Implement the actual transcript fetching logic in the useEpisode hook
// 2. Design and implement the UI for transcript interaction (e.g., highlighting, searching)
// 3. Add accessibility features to the transcript view
// 4. Implement error handling and retry mechanisms for transcript loading