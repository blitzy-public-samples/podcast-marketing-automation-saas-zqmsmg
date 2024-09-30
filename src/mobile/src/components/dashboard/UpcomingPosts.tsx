import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MarketingContentListItem, MarketingContentStatus } from '../../types';
import { useMarketing } from '../../hooks/useMarketing';
import { Button, Loader } from '../common';

// TODO: Implement icons for different marketing content types
const getContentTypeIcon = (type: string) => {
  // Placeholder implementation
  return '📝';
};

const renderItem = ({ item }: { item: MarketingContentListItem }) => (
  <View style={styles.listItem}>
    <Text style={styles.icon}>{getContentTypeIcon(item.type)}</Text>
    <View style={styles.itemContent}>
      <Text style={styles.title}>{item.episodeTitle}</Text>
      <Text style={styles.date}>{new Date(item.scheduledDate).toLocaleDateString()}</Text>
      <Text style={styles.status}>{MarketingContentStatus[item.status]}</Text>
    </View>
  </View>
);

const UpcomingPosts: React.FC = () => {
  const { upcomingPosts, loading, error, fetchUpcomingPosts } = useMarketing();

  React.useEffect(() => {
    fetchUpcomingPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Posts</Text>
      <FlatList
        data={upcomingPosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <Button
        title="View All"
        onPress={() => {
          // TODO: Implement navigation to the full marketing content list
          console.log('Navigate to full marketing content list');
        }}
        style={styles.viewAllButton}
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
  list: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  icon: {
    fontSize: 24,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#007AFF',
  },
  viewAllButton: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default UpcomingPosts;