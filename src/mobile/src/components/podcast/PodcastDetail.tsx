import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Assuming a basic Podcast type
interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PodcastDetailProps {
  podcast: Podcast;
}

const PodcastDetail: React.FC<PodcastDetailProps> = ({ podcast }) => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: podcast.coverImageUrl }}
        style={styles.coverImage}
        accessibilityLabel={`Cover image for ${podcast.title}`}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title} accessibilityRole="header">
          {podcast.title}
        </Text>
        <Text style={styles.description}>{podcast.description}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Created: {new Date(podcast.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.dateText}>
            Last updated: {new Date(podcast.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  dateContainer: {
    marginTop: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});

export default PodcastDetail;

// TODO: Implement error handling for missing podcast data
// TODO: Add accessibility labels to improve app usability
// TODO: Consider adding a loading state while fetching podcast details