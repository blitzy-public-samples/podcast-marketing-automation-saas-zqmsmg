import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import RecentEpisodes from '../dashboard/RecentEpisodes';
import UpcomingPosts from '../dashboard/UpcomingPosts';
import Button from '../common/Button';
import Loader from '../common/Loader';

// TODO: Import necessary action creators and selectors from Redux store

const Dashboard: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // TODO: Replace with actual selectors
  const user = useSelector((state: any) => state.auth.user);
  const recentEpisodes = useSelector((state: any) => state.episodes.recentEpisodes);
  const upcomingPosts = useSelector((state: any) => state.marketing.upcomingPosts);
  const isLoading = useSelector((state: any) => state.dashboard.isLoading);

  React.useEffect(() => {
    // TODO: Dispatch actions to fetch recent episodes and upcoming posts
    // dispatch(fetchRecentEpisodes());
    // dispatch(fetchUpcomingPosts());
  }, [dispatch]);

  const handleUploadPress = () => {
    navigation.navigate('EpisodeUpload' as never);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
      </View>

      <RecentEpisodes episodes={recentEpisodes} />
      <UpcomingPosts posts={upcomingPosts} />

      <View style={styles.uploadButtonContainer}>
        <Button title="Upload New Episode" onPress={handleUploadPress} />
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  uploadButtonContainer: {
    padding: 20,
    alignItems: 'center',
  },
};

export default Dashboard;