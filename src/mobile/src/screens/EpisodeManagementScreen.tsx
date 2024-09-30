import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EpisodeList from '../components/episode/EpisodeList';
import { Episode } from '../types/episode';
import { useEpisode } from '../hooks/useEpisode';
import Button from '../components/common/Button';

const EpisodeManagementScreen: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const navigation = useNavigation();
  const { fetchEpisodes } = useEpisode();

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const fetchedEpisodes = await fetchEpisodes();
        setEpisodes(fetchedEpisodes);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
        // TODO: Implement error handling for failed episode fetching
      }
    };

    loadEpisodes();
  }, [fetchEpisodes]);

  const handleEpisodePress = (episode: Episode) => {
    navigation.navigate('EpisodeDetailScreen', { episodeId: episode.id });
  };

  const handleAddEpisode = () => {
    navigation.navigate('EpisodeCreationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Episode Management</Text>
      <Button title="Add Episode" onPress={handleAddEpisode} />
      <EpisodeList episodes={episodes} onEpisodePress={handleEpisodePress} />
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
});

export default EpisodeManagementScreen;

// TODO: Implement error handling for failed episode fetching
// TODO: Add a loading indicator while fetching episodes
// TODO: Implement a search or filter functionality for episodes
// TODO: Add pull-to-refresh functionality to update the episode list
// TODO: Implement pagination or infinite scrolling for large lists of episodes
// TODO: Add accessibility features to improve the screen's usability for all users