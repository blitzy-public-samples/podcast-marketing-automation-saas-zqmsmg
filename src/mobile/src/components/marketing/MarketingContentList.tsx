import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MarketingContentListItem, MarketingContentFilter, MarketingContentStatus, MarketingContentType } from '../../types/marketing';
import { useMarketingContent } from '../../hooks/useMarketing';
import { Button, Input, Modal, Loader } from '../common';

const MarketingContentList: React.FC = () => {
  const [filter, setFilter] = useState<MarketingContentFilter>({});
  const [modalVisible, setModalVisible] = useState(false);
  const { marketingContent, loading, error, fetchMarketingContent } = useMarketingContent();

  useEffect(() => {
    fetchMarketingContent(filter);
  }, [filter, fetchMarketingContent]);

  const handleFilter = useCallback((newFilter: MarketingContentFilter) => {
    setFilter(newFilter);
    setModalVisible(false);
  }, []);

  const renderItem = ({ item }: { item: MarketingContentListItem }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => {/* TODO: Navigate to detail view */}}>
      <Text>{item.type}</Text>
      <Text>{item.status}</Text>
      <Text>{new Date(item.scheduledDate).toLocaleDateString()}</Text>
      <Text>{item.episodeTitle}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Button title="Filter" onPress={() => setModalVisible(true)} style={styles.filterButton} />
      <FlatList
        data={marketingContent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => fetchMarketingContent(filter)}
      />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Input
            placeholder="Type"
            value={filter.type}
            onChangeText={(text) => setFilter({ ...filter, type: text as MarketingContentType })}
          />
          <Input
            placeholder="Status"
            value={filter.status}
            onChangeText={(text) => setFilter({ ...filter, status: text as MarketingContentStatus })}
          />
          <Button title="Apply Filter" onPress={() => handleFilter(filter)} />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterButton: {
    marginBottom: 16,
  },
  modalContainer: {
    padding: 16,
  },
});

export default MarketingContentList;

// TODO: Implement navigation to marketing content detail view
// TODO: Add error handling and empty state for the content list
// TODO: Optimize performance for large lists using React Native's performance best practices