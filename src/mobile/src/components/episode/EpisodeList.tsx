import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Assuming these types are defined elsewhere in the project
interface EpisodeListItem {
  id: string;
  title: string;
  publishDate: Date;
  duration: number;
  status: EpisodeStatus;
}

enum EpisodeStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

interface EpisodeListProps {
  episodes: EpisodeListItem[];
  onEpisodePress: (episode: EpisodeListItem) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes, onEpisodePress }) => {
  const renderItem = ({ item }: { item: EpisodeListItem }) => {
    const { id, title, publishDate, duration, status } = item;
    const formattedDate = formatDate(publishDate);
    const formattedDuration = formatDuration(duration);

    return (
      <TouchableOpacity
        style={styles.episodeItem}
        onPress={() => onEpisodePress(item)}
        accessibilityLabel={`Episode: ${title}`}
        accessibilityHint="Double tap to view episode details"
      >
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.metadata}>
            {formattedDate} • {formattedDuration}
          </Text>
          <Text style={[styles.status, styles[status.toLowerCase()]]}>
            {status}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    return `${minutes} min`;
  };

  return (
    <FlatList
      data={episodes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No episodes found</Text>
      }
      refreshing={false} // TODO: Implement pull-to-refresh functionality
      onRefresh={() => {}} // TODO: Implement refresh logic
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  episodeItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metadata: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  draft: {
    backgroundColor: '#FFF9C4',
    color: '#FBC02D',
  },
  published: {
    backgroundColor: '#C8E6C9',
    color: '#43A047',
  },
  archived: {
    backgroundColor: '#FFCDD2',
    color: '#E53935',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 32,
  },
});

export default EpisodeList;