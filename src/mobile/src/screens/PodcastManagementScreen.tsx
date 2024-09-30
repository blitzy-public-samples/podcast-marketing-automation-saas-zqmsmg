import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PodcastList from '../components/podcast/PodcastList';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { usePodcast } from '../hooks/usePodcast';
import { Podcast } from '../types/podcast';

const PodcastManagementScreen: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const navigation = useNavigation();
  const { fetchPodcasts } = usePodcast();

  useEffect(() => {
    loadPodcasts();
  }, []);

  const loadPodcasts = async () => {
    try {
      const fetchedPodcasts = await fetchPodcasts();
      setPodcasts(fetchedPodcasts);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      // TODO: Implement error handling
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPodcasts();
    setRefreshing(false);
  };

  const handleAddPodcast = () => {
    navigation.navigate('AddPodcast' as never);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Podcast Management</Text>
      <Button title="Add Podcast" onPress={handleAddPodcast} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.scrollView}
      >
        <PodcastList podcasts={podcasts} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
});

export default PodcastManagementScreen;

// TODO: Implement error handling for failed podcast fetches
// TODO: Implement search functionality for podcasts (Optional)
// TODO: Add sorting options for the podcast list (Optional)