import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MarketingContentListItem, MarketingContentFilter } from '../../types';
import { Button, Input, Modal, Loader } from '../common';

const SocialMediaPostList: React.FC = () => {
  const [posts, setPosts] = useState<MarketingContentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<MarketingContentFilter>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (page: number, filter: MarketingContentFilter) => {
    setLoading(true);
    try {
      // TODO: Implement actual API call to fetch social media posts
      const response = await fetch(`/api/social-media-posts?page=${page}&filter=${JSON.stringify(filter)}`);
      const data = await response.json();
      if (page === 1) {
        setPosts(data.posts);
      } else {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
      }
      setHasMore(data.hasMore);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(1, filter);
  }, [fetchPosts, filter]);

  const handleRefresh = () => {
    setPage(1);
    fetchPosts(1, filter);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
      fetchPosts(page + 1, filter);
    }
  };

  const handleFilterChange = (newFilter: MarketingContentFilter) => {
    setFilter(newFilter);
    setPage(1);
    setModalVisible(false);
  };

  const renderPostItem = ({ item }: { item: MarketingContentListItem }) => (
    <TouchableOpacity
      style={styles.postItem}
      onPress={() => {
        // TODO: Implement navigation to post details
        console.log('Navigate to post details', item.id);
      }}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postStatus}>{item.status}</Text>
      <Text style={styles.postDate}>{item.scheduledDate}</Text>
      <Text style={styles.postEpisode}>{item.episodeTitle}</Text>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Filter Posts</Text>
        <Input
          placeholder="Content Type"
          onChangeText={(text) => setFilter(prev => ({ ...prev, contentType: text }))}
          value={filter.contentType}
        />
        <Input
          placeholder="Status"
          onChangeText={(text) => setFilter(prev => ({ ...prev, status: text }))}
          value={filter.status}
        />
        <Input
          placeholder="Date Range"
          onChangeText={(text) => setFilter(prev => ({ ...prev, dateRange: text }))}
          value={filter.dateRange}
        />
        <Button title="Apply" onPress={() => handleFilterChange(filter)} />
        <Button title="Reset" onPress={() => handleFilterChange({})} />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={() => setModalVisible(true)} />
      {loading && posts.length === 0 ? (
        <Loader />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={loading && page === 1}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => loading && page !== 1 ? <Loader /> : null}
        />
      )}
      {renderFilterModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  postItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  postEpisode: {
    fontSize: 14,
    color: '#666',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default SocialMediaPostList;
```

This implementation creates a SocialMediaPostList component that displays a list of social media posts with the following features:

1. Fetches posts from an API (to be implemented) with pagination support.
2. Implements a pull-to-refresh functionality.
3. Supports infinite scrolling to load more posts.
4. Includes a filter modal to filter posts based on content type, status, and date range.
5. Renders individual post items with title, status, scheduled date, and episode title.
6. Uses React Native's FlatList for efficient list rendering.
7. Implements loading states and error handling.

Note that this implementation assumes the existence of certain types (MarketingContentListItem, MarketingContentFilter) and components (Button, Input, Modal, Loader) which are not yet implemented. These will need to be created in their respective files.

Here's a list of human tasks that need to be addressed:

```
Human tasks:
1. Implement actual API call to fetch social media posts (Required)
2. Design and implement the UI for the filter modal (Required)
3. Implement navigation to post details screen (Required)
4. Add error handling for API calls and data fetching (Required)
5. Optimize performance for large lists of posts (Optional)