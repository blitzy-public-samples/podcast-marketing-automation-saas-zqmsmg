import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Assuming these types and hooks will be implemented later
import { EpisodeListItem } from '../../types/episode';
import { useEpisode } from '../../hooks/useEpisode';
import { formatDate } from '../../utils/formatters';

const RecentEpisodes: React.FC = () => {
  const [recentEpisodes, setRecentEpisodes] = useState<EpisodeListItem[]>([]);
  const { fetchRecentEpisodes } = useEpisode();

  useEffect(() => {
    const loadRecentEpisodes = async () => {
      try {
        const episodes = await fetchRecentEpisodes();
        setRecentEpisodes(episodes);
      } catch (error) {
        console.error('Failed to fetch recent episodes:', error);
        // TODO: Implement error handling
      }
    };

    loadRecentEpisodes();
  }, []);

  const renderEpisodeItem = ({ item }: { item: EpisodeListItem }) => (
    <TouchableOpacity style={styles.episodeItem} onPress={() => {/* TODO: Implement onPress handler */}}>
      <Text style={styles.episodeTitle}>{item.title}</Text>
      <Text style={styles.episodeInfo}>
        {formatDate(item.publishDate)} • {item.duration} min
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Episodes</Text>
      <FlatList
        data={recentEpisodes}
        renderItem={renderEpisodeItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyList}>No recent episodes</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  episodeItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  episodeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  episodeInfo: {
    fontSize: 14,
    color: '#666',
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: '#666',
  },
});

export default RecentEpisodes;

// TODO: Implement error handling for failed episode fetching
// TODO: Add pull-to-refresh functionality for updating the episode list
// TODO: Optimize performance for large lists of episodes