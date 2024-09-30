import React from 'react';
import { FlatList, TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Assuming PodcastListItem type, we'll define it here
interface PodcastListItem {
  id: string;
  title: string;
  coverImageUrl: string;
}

interface PodcastListProps {
  podcasts: PodcastListItem[];
  onRefresh: () => void;
}

const PodcastList: React.FC<PodcastListProps> = ({ podcasts, onRefresh }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: PodcastListItem }) => (
    <TouchableOpacity
      style={styles.podcastItem}
      onPress={() => navigation.navigate('PodcastDetail', { podcastId: item.id })}
      accessibilityLabel={`View podcast: ${item.title}`}
    >
      <Image
        source={{ uri: item.coverImageUrl }}
        style={styles.coverImage}
        accessibilityLabel={`Cover image for ${item.title}`}
        onError={(e) => console.error('Image load failed:', e.nativeEvent.error)}
      />
      <Text style={styles.podcastTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={podcasts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onRefresh={onRefresh}
      refreshing={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  podcastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  podcastTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PodcastList;

// TODO: Implement error handling for failed image loads
// TODO: Consider implementing infinite scrolling or pagination for large podcast lists